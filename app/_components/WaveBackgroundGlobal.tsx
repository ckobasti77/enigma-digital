'use client'

import { Waves } from '@/components/ui/wave-background'

export default function WaveBackgroundGlobal() {
  return (
    <div aria-hidden className="fixed inset-0 z-0 pointer-events-none select-none">
      <Waves
        className="absolute inset-0"
        strokeColor="rgba(132, 196, 255, 0.32)"
        backgroundColor="transparent"
        pointerSize={0}
      />
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--wave-overlay)' }} />
    </div>
  )
}

