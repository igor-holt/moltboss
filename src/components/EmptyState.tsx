import { motion } from 'framer-motion'
import { Heart } from '@phosphor-icons/react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[60vh] px-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
      >
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <Heart className="w-12 h-12 text-muted-foreground" />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
          No favorites yet
        </h2>
        <p className="text-muted-foreground text-[15px] max-w-sm mx-auto">
          Start exploring and tap the heart icon to save items you love
        </p>
      </motion.div>
    </div>
  )
}
