import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'Imoria Learning — Learn Smart. Rise Beyond.',
    template: '%s | Imoria Learning',
  },
  description:
    'Imoria Learning is an educational platform for BS English students at BZ University Multan, offering course content, syllabi, and MCQ quizzes for Semester III.',
  keywords: ['Imoria Learning', 'BS English', 'BZ University', 'Semester III', 'MCQ Quiz', 'Semiotics', 'World Literature'],
  authors: [{ name: 'Imoria Learning' }],
  openGraph: {
    title: 'Imoria Learning — Learn Smart. Rise Beyond.',
    description: 'Study smarter with Imoria Learning — course notes, syllabi and quizzes for BS English Semester III.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-[#0D1B2A] text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1A2A3A',
              color: '#fff',
              border: '1px solid #C9A84C',
              borderRadius: '8px',
            },
            success: {
              iconTheme: { primary: '#C9A84C', secondary: '#1A2A3A' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />
      </body>
    </html>
  )
}
