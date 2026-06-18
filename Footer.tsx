import Link from 'next/link'
import { BookOpen, Mail, GraduationCap } from 'lucide-react'

export default function Footer() {
  const courses = [
    { code: 'ENG-201', id: 'eng-201' },
    { code: 'ENG-203', id: 'eng-203' },
    { code: 'ENG-205', id: 'eng-205' },
    { code: 'HRS-201', id: 'hrs-201' },
    { code: 'INCT-201', id: 'inct-201' },
    { code: 'ESCI-201', id: 'esci-201' },
  ]

  return (
    <footer className="bg-[#0A1520] border-t border-[#C9A84C]/20 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#C9A84C] to-[#A8891F] flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-[#0D1B2A]" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-[#C9A84C]">IMORIA</span>
                <span className="text-white ml-1">LEARNING</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Learn Smart. Rise Beyond. — Your complete study companion for BS English Semester III at BZ University Multan.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <GraduationCap className="w-4 h-4 text-[#C9A84C]" />
              <span>BZ University, Multan</span>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-[#C9A84C] font-semibold mb-4 text-sm uppercase tracking-wider">Courses</h3>
            <ul className="space-y-2">
              {courses.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/courses/${c.id}`}
                    className="text-gray-400 hover:text-[#C9A84C] text-sm transition-colors"
                  >
                    {c.code}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[#C9A84C] font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/courses', label: 'All Courses' },
                { href: '/auth', label: 'Sign In / Register' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#C9A84C] text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="divider-gold mt-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500 pt-2">
          <p>© {new Date().getFullYear()} Imoria Learning. All rights reserved.</p>
          <p>BS English — Semester III · BZ University Multan</p>
        </div>
      </div>
    </footer>
  )
}
