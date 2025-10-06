'use client';

import { useEffect, useState } from 'react'

interface Props {
  value: number
  duration?: number
}

export default function StatsCounter({ value, duration = 1200 }: Props) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let start: number | null = null
    const from = 0
    const to = value
    const step = (ts: number) => {
      if (start === null) start = ts
      const progress = Math.min(1, (ts - start) / duration)
      setDisplay(Math.floor(from + (to - from) * progress))
      if (progress < 1) requestAnimationFrame(step)
    }
    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return <span>{display}</span>
}


