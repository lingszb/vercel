import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '二十四节气',
  description: '按季节与月份浏览二十四节气，感受一年四时的流转。',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
