'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { onAuthChange, logOut } from '@/lib/firebase'
import type { User } from 'firebase/auth'
import { Menu, X, BookOpen, LogOut, User as UserIcon, Shield } from 'lucide-react'
import toast from 'react-hot-toast'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@imoria.com'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const unsub = onAuthChange(setUser)
    return () => unsub()
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = async () => {
    await logOut()
    toast.success('Logged out successfully')
    router.push('/')
    setMenuOpen(false)
  }

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
  ]

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0D1B2A]/95 backdrop-blur-md shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#A8891F] flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#0D1B2A]" />
            </div>
            <span className="font-bold text-lg tracking-wide">
              <span className="text-[#C9A84C]">IMORIA</span>
              <span className="text-white ml-1">LEARNING</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#C9A84C] ${
                  isActive(link.href) ? 'text-[#C9A84C]' : 'text-gray-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user?.email === ADMIN_EMAIL && (
              <Link
                href="/admin"
                className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-[#C9A84C] ${
                  pathname === '/admin' ? 'text-[#C9A84C]' : 'text-gray-300'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
              </Link>
            )}
          </div>

          {/* Auth - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <div className="w-7 h-7 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 flex items-center justify-center">
                    <UserIcon className="w-3.5 h-3.5 text-[#C9A84C]" />
                  </div>
                  <span className="max-w-[150px] truncate">{user.displayName || user.email?.split('@')[0]}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                className="px-4 py-2 rounded-lg bg-[#C9A84C] text-[#0D1B2A] text-sm font-semibold hover:bg-[#D4B86A] transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-300 hover:text-[#C9A84C] transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#1A2A3A] border-t border-[#C9A84C]/20 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-sm font-medium py-2 transition-colors ${
                isActive(link.href) ? 'text-[#C9A84C]' : 'text-gray-300'
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user?.email === ADMIN_EMAIL && (
            <Link
              href="/admin"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-1.5 text-sm font-medium py-2 text-gray-300"
            >
              <Shield className="w-4 h-4" /> Admin
            </Link>
          )}
          <div className="pt-2 border-t border-[#C9A84C]/20">
            {user ? (
              <div className="space-y-2">
                <p className="text-sm text-gray-400">{user.email}</p>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-red-400"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <Link
                href="/auth"
                onClick={() => setMenuOpen(false)}
                className="block w-full text-center px-4 py-2 rounded-lg bg-[#C9A84C] text-[#0D1B2A] text-sm font-semibold"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
