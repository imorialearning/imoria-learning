'use client'

import { useState } from 'react'
import { CheckCircle, XCircle, Trophy, RotateCcw, ArrowRight, BookOpen } from 'lucide-react'
import type { QuizQuestion } from '@/lib/types'
import Link from 'next/link'

interface QuizComponentProps {
  courseId: string
  courseTitle: string
  questions: QuizQuestion[]
  onComplete?: (score: number, total: number) => void
}

export default function QuizComponent({
  courseId,
  courseTitle,
  questions,
  onComplete,
}: QuizComponentProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [finished, setFinished] = useState(false)

  const current = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const score = answers.filter((a, i) => a === questions[i].correct).length

  const handleSelect = (optionIndex: number) => {
    if (confirmed) return
    setSelected(optionIndex)
  }

  const handleConfirm = () => {
    if (selected === null) return
    const updated = [...answers]
    updated[currentIndex] = selected
    setAnswers(updated)
    setConfirmed(true)
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelected(null)
      setConfirmed(false)
    } else {
      setFinished(true)
      if (onComplete) onComplete(score, questions.length)
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelected(null)
    setConfirmed(false)
    setAnswers(Array(questions.length).fill(null))
    setFinished(false)
  }

  const percentage = Math.round((score / questions.length) * 100)
  const scoreColor =
    percentage >= 70 ? 'text-green-400' : percentage >= 50 ? 'text-yellow-400' : 'text-red-400'
  const scoreBg =
    percentage >= 70 ? 'bg-green-400/10 border-green-400/30' : percentage >= 50 ? 'bg-yellow-400/10 border-yellow-400/30' : 'bg-red-400/10 border-red-400/30'

  if (finished) {
    return (
      <div className="bg-[#1A2A3A] rounded-2xl border border-[#C9A84C]/30 p-6 sm:p-8 text-center">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full border-2 mb-6 ${scoreBg}`}>
          <Trophy className={`w-9 h-9 ${scoreColor}`} />
        </div>

        <h2 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h2>
        <p className="text-gray-400 mb-6">{courseTitle}</p>

        <div className={`inline-block px-8 py-4 rounded-xl border mb-8 ${scoreBg}`}>
          <div className={`text-5xl font-bold mb-1 ${scoreColor}`}>{percentage}%</div>
          <div className="text-sm text-gray-400">
            {score} out of {questions.length} correct
          </div>
        </div>

        <div className="space-y-3 mb-8 text-left">
          {questions.map((q, i) => {
            const userAnswer = answers[i]
            const isCorrect = userAnswer === q.correct
            return (
              <div
                key={q.id}
                className={`p-4 rounded-xl border text-sm ${
                  isCorrect
                    ? 'bg-green-400/5 border-green-400/20'
                    : 'bg-red-400/5 border-red-400/20'
                }`}
              >
                <div className="flex items-start gap-2 mb-2">
                  {isCorrect ? (
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  )}
                  <p className="text-gray-200 font-medium">{q.question}</p>
                </div>
                {!isCorrect && (
                  <p className="text-xs text-gray-400 ml-6 mb-1">
                    Your answer: <span className="text-red-300">{userAnswer !== null ? q.options[userAnswer] : 'Not answered'}</span>
                  </p>
                )}
                <p className="text-xs text-gray-400 ml-6 mb-1">
                  Correct: <span className="text-green-300">{q.options[q.correct]}</span>
                </p>
                <p className="text-xs text-[#C9A84C]/80 ml-6 italic">{q.explanation}</p>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleRestart}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-[#C9A84C]/40 text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Retake Quiz
          </button>
          <Link
            href="/courses"
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#C9A84C] text-[#0D1B2A] font-semibold hover:bg-[#D4B86A] transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            More Courses
          </Link>
        </div>
      </div>
    )
  }

  const optionLetters = ['A', 'B', 'C', 'D']

  return (
    <div className="bg-[#1A2A3A] rounded-2xl border border-[#C9A84C]/30 p-6 sm:p-8">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span className="text-[#C9A84C]">{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-[#0D1B2A] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#A8891F] to-[#C9A84C] rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-white text-lg font-medium leading-relaxed">{current.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {current.options.map((option, i) => {
          let style =
            'border-[#C9A84C]/20 bg-[#0D1B2A]/50 text-gray-300 hover:border-[#C9A84C]/50 hover:bg-[#C9A84C]/5'
          if (confirmed) {
            if (i === current.correct) {
              style = 'border-green-400/60 bg-green-400/10 text-green-300'
            } else if (i === selected && i !== current.correct) {
              style = 'border-red-400/60 bg-red-400/10 text-red-300'
            } else {
              style = 'border-[#C9A84C]/10 bg-[#0D1B2A]/30 text-gray-500'
            }
          } else if (selected === i) {
            style = 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]'
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left text-sm transition-all duration-200 ${style}`}
            >
              <span className="w-6 h-6 rounded-lg border border-current flex items-center justify-center flex-shrink-0 text-xs font-bold">
                {optionLetters[i]}
              </span>
              <span>{option}</span>
              {confirmed && i === current.correct && (
                <CheckCircle className="w-4 h-4 text-green-400 ml-auto flex-shrink-0" />
              )}
              {confirmed && i === selected && i !== current.correct && (
                <XCircle className="w-4 h-4 text-red-400 ml-auto flex-shrink-0" />
              )}
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {confirmed && (
        <div className="mb-6 p-4 rounded-xl bg-[#C9A84C]/5 border border-[#C9A84C]/20">
          <p className="text-xs text-[#C9A84C] font-semibold uppercase tracking-wider mb-1">Explanation</p>
          <p className="text-gray-300 text-sm">{current.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        {!confirmed ? (
          <button
            onClick={handleConfirm}
            disabled={selected === null}
            className="flex-1 px-4 py-3 rounded-xl bg-[#C9A84C] text-[#0D1B2A] font-semibold text-sm hover:bg-[#D4B86A] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirm Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#C9A84C] text-[#0D1B2A] font-semibold text-sm hover:bg-[#D4B86A] transition-colors"
          >
            {currentIndex < questions.length - 1 ? (
              <>Next Question <ArrowRight className="w-4 h-4" /></>
            ) : (
              <>See Results <Trophy className="w-4 h-4" /></>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
