export interface Course {
  id: string
  code: string
  title: string
  semester: string
  description: string
  objectives: string[]
  topics: Topic[]
  setTexts?: SetText[]
  recommendedReadings?: string[]
  color: string // for card accent
}

export interface Topic {
  title: string
  subtopics?: string[]
}

export interface SetText {
  type: string // Novel, Short Story, Essay, Poem, etc.
  items: string[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: [string, string, string, string]
  correct: 0 | 1 | 2 | 3
  explanation: string
}

export interface Quiz {
  courseId: string
  questions: QuizQuestion[]
}

export interface UserProgress {
  userId: string
  courseId: string
  quizScores: QuizAttempt[]
  lastAttempt: string
  bestScore: number
}

export interface QuizAttempt {
  score: number
  total: number
  percentage: number
  date: string
}

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}
