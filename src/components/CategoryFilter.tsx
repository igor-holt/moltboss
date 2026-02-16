import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { motion } from 'framer-motion'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 px-4 py-3">
        {categories.map((category) => (
          <motion.div
            key={category}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant={selectedCategory === category ? 'default' : 'secondary'}
              size="sm"
              onClick={() => onCategoryChange(category)}
              className={`rounded-full px-4 transition-all ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary/60 text-secondary-foreground hover:bg-secondary'
              }`}
            >
              {category}
            </Button>
          </motion.div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  )
}
