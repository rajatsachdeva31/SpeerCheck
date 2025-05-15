"use client"
import InterviewScheduler from "@/components/interview-scheduler"
import { engineers, candidates } from "@/lib/data"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-8 px-4">
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-8 w-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-white"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
                <path d="m9 16 2 2 4-4" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">SpeerCheck</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Schedule interviews efficiently based on candidate and engineer availability
          </p>
        </header>

        <InterviewScheduler engineers={engineers} candidates={candidates} />
      </div>
    </main>
  )
}
