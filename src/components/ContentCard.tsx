import { motion } from 'framer-motion'
import { Heart, ShareFat } from '@phosphor-icons/react'
import { ContentItem } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface ContentCardProps {
  item: ContentItem
  isLiked: boolean
  onLike: () => void
  onShare: () => void
}

export function ContentCard({ item, isLiked, onLike, onShare }: ContentCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <motion.div
      className="relative w-full rounded-2xl overflow-hidden bg-card shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {!imageLoaded && (
          <div 
            className="absolute inset-0 animate-pulse"
            style={{ backgroundColor: item.color }}
          />
        )}
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        <div className="absolute top-4 left-4">
          <Badge 
            variant="secondary" 
            className="bg-black/40 backdrop-blur-sm text-white border-white/20"
          >
            {item.category}
          </Badge>
        </div>

        <div className="absolute top-4 right-4 flex gap-2">
          <motion.div
            whileTap={{ scale: 0.9 }}
          >
            <Button
              size="icon"
              variant="secondary"
              className={`rounded-full w-11 h-11 backdrop-blur-sm border-white/20 transition-colors ${
                isLiked 
                  ? 'bg-accent text-accent-foreground' 
                  : 'bg-black/40 text-white hover:bg-black/60'
              }`}
              onClick={onLike}
            >
              {isLiked ? (
                <Heart weight="fill" className="w-5 h-5" />
              ) : (
                <Heart className="w-5 h-5" />
              )}
            </Button>
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.9 }}
          >
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full w-11 h-11 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 border-white/20"
              onClick={onShare}
            >
              <ShareFat className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="p-5">
        <h2 className="text-2xl font-bold mb-2 tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          {item.title}
        </h2>
        <p className="text-muted-foreground text-[15px] leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}
