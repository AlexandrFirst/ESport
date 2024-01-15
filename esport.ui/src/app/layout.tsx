import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'

import '@/styles/globals.css'

const font = Nunito({
  subsets: ["latin", "cyrillic-ext", "cyrillic"],
  weight: ["300", "600", "700", "900"],
});


export const metadata: Metadata = {
  title: 'E-Sport',
  description: 'Forge your legacy, dominte the game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
