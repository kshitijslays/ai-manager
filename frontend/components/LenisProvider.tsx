'use client'

import { useEffect, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from '@studio-freight/lenis'
import { useAnimationFrame } from 'framer-motion'

let lenis: Lenis | null = null

export default function LenisProvider({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()

  // Init Lenis ONCE
  useEffect(() => {
    if (!lenis) {
      lenis = new Lenis({
        duration: 0.55,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        smoothTouch: false,
      })
    }

    return () => {
      // DO NOT destroy on route change
    }
  }, [])

  // RAF loop
  useAnimationFrame((time) => {
    lenis?.raf(time)
  })

  // 🔥 KEY FIX: re-sync on route change
  useEffect(() => {
    lenis?.resize()
    lenis?.scrollTo(0, { immediate: true })
  }, [pathname])

  return <>{children}</>
}
