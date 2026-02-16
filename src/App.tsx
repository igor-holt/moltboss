import { useState, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Sparkle, Heart } from '@phosphor-icons/react'
import { ContentCard } from '@/components/ContentCard'
import { FavoriteCard } from '@/components/FavoriteCard'
import { EmptyState } from '@/components/EmptyState'
import { PullToRefresh } from '@/components/PullToRefresh'
import { CategoryFilter } from '@/components/CategoryFilter'
import { contentItems } from '@/data/content'
import { ContentItem } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [favorites, setFavorites] = useKV<string[]>('favorites', [])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [activeTab, setActiveTab] = useState('feed')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(contentItems.map(item => item.category)))
    return ['All', ...uniqueCategories.sort()]
  }, [])

  const filteredContent = useMemo(() => {
    if (selectedCategory === 'All') {
      return contentItems
    }
    return contentItems.filter(item => item.category === selectedCategory)
  }, [selectedCategory])

  const handleLike = (itemId: string) => {
    setFavorites((current) => {
      const currentFavorites = current || []
      if (currentFavorites.includes(itemId)) {
        toast.success('Removed from favorites')
        return currentFavorites.filter(id => id !== itemId)
      } else {
        toast.success('Added to favorites', {
          icon: '❤️'
        })
        return [...currentFavorites, itemId]
      }
    })
  }

  const handleShare = (item: ContentItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard')
    }
  }

  const handleRefresh = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    setCurrentIndex(0)
    setSelectedCategory('All')
    toast.success('Feed refreshed')
  }

  const favoriteItems = contentItems.filter(item => favorites?.includes(item.id))
  const currentItem = filteredContent[currentIndex]

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget
    const scrollPercentage = (element.scrollTop + element.clientHeight) / element.scrollHeight
    
    if (scrollPercentage > 0.8 && currentIndex < filteredContent.length - 1) {
      setCurrentIndex(current => current + 1)
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentIndex(0)
    toast.success(`Showing ${category === 'All' ? 'all content' : category}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Toaster position="top-center" />
      
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'var(--font-heading)' }}>
            <Sparkle weight="fill" className="text-accent" />
            Discover
          </h1>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />
        
        <main className="flex-1 overflow-hidden">
          <TabsContent value="feed" className="h-full m-0">
            <PullToRefresh onRefresh={handleRefresh}>
              <div 
                className="h-full overflow-y-auto pb-24"
                onScroll={handleScroll}
              >
                <div className="container max-w-2xl mx-auto px-4 py-6 space-y-6">
                  <AnimatePresence mode="wait">
                    {filteredContent.slice(0, currentIndex + 1).map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ContentCard
                          item={item}
                          isLiked={favorites?.includes(item.id) || false}
                          onLike={() => handleLike(item.id)}
                          onShare={() => handleShare(item)}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {currentIndex >= filteredContent.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-8"
                    >
                      <p className="text-muted-foreground text-sm">
                        You're all caught up! 🎉
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </PullToRefresh>
          </TabsContent>

          <TabsContent value="favorites" className="h-full m-0">
            <div className="h-full overflow-y-auto pb-24">
              <div className="container max-w-2xl mx-auto px-4 py-6">
                {favoriteItems.length === 0 ? (
                  <EmptyState />
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {favoriteItems.map((item) => (
                      <FavoriteCard
                        key={item.id}
                        item={item}
                        onClick={() => {
                          const index = contentItems.findIndex(i => i.id === item.id)
                          setCurrentIndex(index)
                          setActiveTab('feed')
                          setTimeout(() => {
                            const element = document.querySelector(`[data-item-id="${item.id}"]`)
                            element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                          }, 100)
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </main>

        <TabsList className="fixed bottom-0 left-0 right-0 h-auto rounded-none border-t border-border bg-background/95 backdrop-blur-xl grid grid-cols-2 p-2 safe-area-bottom">
          <TabsTrigger 
            value="feed"
            className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
          >
            <Sparkle weight={activeTab === 'feed' ? 'fill' : 'regular'} className="w-6 h-6" />
            <span className="text-xs font-medium">Discover</span>
          </TabsTrigger>
          <TabsTrigger 
            value="favorites"
            className="flex flex-col gap-1 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
          >
            <Heart weight={activeTab === 'favorites' ? 'fill' : 'regular'} className="w-6 h-6" />
            <span className="text-xs font-medium">Favorites</span>
            {favorites && favorites.length > 0 && (
              <span className="absolute top-2 right-1/4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  )
}

export default App
