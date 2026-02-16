import { motion } from 'framer-motion'
import { Heart } from '@phosphor-icons/react'
import { ContentItem } from '@/types'

interface FavoriteCardProps {
  item: ContentItem
  onClick: () => void
}

export function FavoriteCard({ item, onClick }: FavoriteCardProps) {
  return (
    <motion.div
      className="relative rounded-xl overflow-hidden bg-card shadow-lg cursor-pointer group"
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        <div className="absolute top-2 right-2">
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <Heart weight="fill" className="w-4 h-4 text-accent-foreground" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="text-sm font-semibold text-white line-clamp-2" style={{ fontFamily: 'var(--font-heading)' }}>
            {item.title}
          </h3>
        </div>
      </div>
    </motion.div>
  )
}
