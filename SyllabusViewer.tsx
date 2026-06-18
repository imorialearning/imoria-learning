'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, BookOpen } from 'lucide-react'
import type { Topic } from '@/lib/types'

interface SyllabusViewerProps {
  topics: Topic[]
}

export default function SyllabusViewer({ topics }: SyllabusViewerProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="space-y-3">
      {topics.map((topic, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={index}
            className="bg-[#1A2A3A] rounded-xl border border-[#C9A84C]/20 overflow-hidden transition-all duration-200"
          >
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#C9A84C]/5 transition-colors"
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#C9A84C]/15 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-3.5 h-3.5 text-[#C9A84C]" />
                </div>
                <span className="font-medium text-white text-sm sm:text-base">{topic.title}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {topic.subtopics && (
                  <span className="text-xs text-gray-500 hidden sm:block">
                    {topic.subtopics.length} items
                  </span>
                )}
                {isOpen ? (
                  <ChevronDown className="w-4 h-4 text-[#C9A84C]" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                )}
              </div>
            </button>

            {isOpen && topic.subtopics && (
              <div className="px-5 pb-4 border-t border-[#C9A84C]/10">
                <ul className="mt-3 space-y-2">
                  {topic.subtopics.map((sub, si) => (
                    <li key={si} className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-2 flex-shrink-0" />
                      <span className="text-gray-300 text-sm leading-relaxed">{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
