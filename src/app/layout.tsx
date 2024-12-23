'use client';

import './globals.css'
import { Inter } from 'next/font/google'
import { Canvas } from '@react-three/fiber'
import CustomCursor from '@/components/CustomCursor'
import Background3D from '@/components/Background3D'
import Header3D from '@/components/Header3D'
import { Suspense } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen relative bg-black">
          <CustomCursor />
          
          {/* Header */}
          <Suspense fallback={null}>
            <Header3D />
          </Suspense>
          
          {/* Background Canvas */}
          <div className="fixed inset-0">
            <Canvas camera={{ position: [0, 0, 30], fov: 75 }}>
              <Suspense fallback={null}>
                <Background3D />
              </Suspense>
            </Canvas>
          </div>

          {/* Main Content */}
          <div className="relative z-20">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
