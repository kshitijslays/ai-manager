'use client'

import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'
import { useAnimationFrame } from 'framer-motion'

let lenis: Lenis | null = null

export default function LenisProvider() {
  useEffect(() => {
    lenis = new Lenis({
      duration: 0.55,
      easing: (t) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
    })

    return () => {
      lenis?.destroy()
      lenis = null
    }
  }, [])

  useAnimationFrame((time) => {
    lenis?.raf(time)
  })

  return null
}
