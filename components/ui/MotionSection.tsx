'use client';

import { motion, useAnimation, Variants } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

interface MotionSectionProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

const variants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function MotionSection({ children, className = '', delay = 0 }: MotionSectionProps) {
  const controls = useAnimation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.12 })

  useEffect(() => {
    if (inView) {
      controls.start({ ...variants.visible, transition: { ...variants.visible!.transition, delay } })
    }
  }, [controls, inView, delay])

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={variants} className={className}>
      {children}
    </motion.div>
  )
}


