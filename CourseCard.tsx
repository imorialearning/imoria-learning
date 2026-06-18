import Link from 'next/link'
import { BookOpen, Brain, ArrowRight } from 'lucide-react'
import type { Course } from '@/lib/types'

interface CourseCardProps {
  course: Course
  featured?: boolean
}

export default function CourseCard({ course, featured = false }: CourseCardProps) {
  return (
    <div
      className={`group relative bg-[#1A2A3A] rounded-xl border border-[#C9A84C]/20 hover:border-[#C9A84C]/60 transition-all duration-300 overflow-hidden card-hover ${
        featured ? 'p-6' : 'p-5'
      }`}
    >
      {/* Top color accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 opacity-80"
        style={{ backgroundColor: course.color }}
      />

      {/* Course code badge */}
      <div className="flex items-start justify-between mb-3 mt-1">
        <span
          className="inline-block px-2.5 py-1 rounded-md text-xs font-bold tracking-wider"
          style={{ backgroundColor: course.color + '22', color: course.color }}
        >
          {course.code}
        </span>
        <span className="text-xs text-gray-500 bg-[#0D1B2A] px-2 py-1 rounded-md">
          Sem-III
        </span>
      </div>

      {/* Title */}
      <h3
        className={`font-semibold text-white leading-tight mb-2 group-hover:text-[#C9A84C] transition-colors ${
          featured ? 'text-lg' : 'text-base'
        }`}
      >
        {course.title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
        {course.description}
      </p>

      {/* Topics count */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C]" />
        <span className="text-xs text-gray-500">
          {course.topics.length} topic sections
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2">
        <Link
          href={`/courses/${course.id}`}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-[#C9A84C] text-sm font-medium hover:bg-[#C9A84C]/20 transition-colors"
        >
          <BookOpen className="w-3.5 h-3.5" />
          Syllabus
        </Link>
        <Link
          href={`/courses/${course.id}/quiz`}
          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#C9A84C] text-[#0D1B2A] text-sm font-semibold hover:bg-[#D4B86A] transition-colors"
        >
          <Brain className="w-3.5 h-3.5" />
          Take Quiz
        </Link>
      </div>

      {featured && (
        <Link
          href={`/courses/${course.id}`}
          className="mt-3 flex items-center gap-1 text-xs text-gray-500 hover:text-[#C9A84C] transition-colors group/link"
        >
          View full course details
          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  )
}
