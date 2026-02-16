import { useState, useEffect, ReactNode } from 'react'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { ArrowClockwise } from '@phosphor-icons/react'

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: ReactNode
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, 80], [0, 1])
  const rotate = useTransform(y, [0, 80], [0, 180])

  const handleDragEnd = async (_: any, info: any) => {
    if (info.offset.y > 80 && !isRefreshing) {
      setIsRefreshing(true)
      await onRefresh()
      setIsRefreshing(false)
    }
    y.set(0)
  }

  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center h-20 z-10"
        style={{ opacity }}
      >
        <motion.div
          style={{ rotate }}
          className={isRefreshing ? 'animate-spin' : ''}
        >
          <ArrowClockwise className="w-6 h-6 text-accent" weight="bold" />
        </motion.div>
      </motion.div>

      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0.3, bottom: 0 }}
        onDragEnd={handleDragEnd}
        style={{ y }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}
