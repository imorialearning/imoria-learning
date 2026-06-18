import { initializeApp, getApps, getApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  type DocumentData,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Prevent duplicate initialization
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()

// ─── Auth Helpers ──────────────────────────────────────────────────────────────

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)

export const signInWithEmail = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password)

export const signUpWithEmail = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password)

export const logOut = () => signOut(auth)

export const onAuthChange = (callback: (user: User | null) => void) =>
  onAuthStateChanged(auth, callback)

// ─── Firestore Helpers ────────────────────────────────────────────────────────

// Save user profile after signup
export const saveUserProfile = async (user: User) => {
  const ref = doc(db, 'users', user.uid)
  const snap = await getDoc(ref)
  if (!snap.exists()) {
    await setDoc(ref, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      createdAt: serverTimestamp(),
    })
  }
}

// Get quiz questions for a course
export const getQuizQuestions = async (courseId: string) => {
  const q = query(collection(db, 'quizzes'), where('courseId', '==', courseId))
  const snap = await getDocs(q)
  if (snap.empty) return null
  return snap.docs[0].data()
}

// Save quiz score
export const saveQuizScore = async (
  userId: string,
  courseId: string,
  score: number,
  total: number
) => {
  const progressRef = doc(db, 'user_progress', `${userId}_${courseId}`)
  const snap = await getDoc(progressRef)
  const percentage = Math.round((score / total) * 100)

  if (snap.exists()) {
    const existing = snap.data()
    await updateDoc(progressRef, {
      quizScores: [...(existing.quizScores || []), { score, total, percentage, date: new Date().toISOString() }],
      lastAttempt: serverTimestamp(),
      bestScore: Math.max(existing.bestScore || 0, percentage),
    })
  } else {
    await setDoc(progressRef, {
      userId,
      courseId,
      quizScores: [{ score, total, percentage, date: new Date().toISOString() }],
      lastAttempt: serverTimestamp(),
      bestScore: percentage,
    })
  }
}

// Get all user progress (for admin)
export const getAllUserProgress = async () => {
  const snap = await getDocs(collection(db, 'user_progress'))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

// Get user progress for a specific user
export const getUserProgress = async (userId: string) => {
  const q = query(collection(db, 'user_progress'), where('userId', '==', userId))
  const snap = await getDocs(q)
  return snap.docs.map((d) => d.data())
}

// Add quiz questions (admin)
export const addQuizQuestions = async (courseId: string, questions: DocumentData[]) => {
  await addDoc(collection(db, 'quizzes'), {
    courseId,
    questions,
    createdAt: serverTimestamp(),
  })
}

// Get all users (admin)
export const getAllUsers = async () => {
  const snap = await getDocs(collection(db, 'users'))
  return snap.docs.map((d) => d.data())
}
