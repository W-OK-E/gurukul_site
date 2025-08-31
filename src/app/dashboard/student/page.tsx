// app/dashboard/student/page.tsx
import { requireStudent } from '@/lib/auth'
import { getStudentDashboardData } from '@/lib/database-service'
import { logoutAction } from '@/app/actions/auth'
import StudentCalendar from '@/components/StudentCalendar'
import InstructorCourseCard from '@/components/InstructorCourseCard'

export default async function StudentDashboard() {
  const user = await requireStudent()
  const dashboardData = await getStudentDashboardData(user.id)

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Welcome back, {user.full_name}!
                </h1>
                <p className="mt-1 text-sm text-gray-600">
                  Here's your learning dashboard
                </p>
              </div>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Check if student has any enrollments */}
          {dashboardData.enrollments.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg fill="none" stroke="currentColor" viewBox="0 0 48 48" aria-hidden="true">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A9.971 9.971 0 0122 34c2.389 0 4.57.834 6.287 2.286"
                  />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No courses enrolled</h3>
              <p className="mt-1 text-sm text-gray-500">
                Contact your administrator to get enrolled in courses.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column - Course and Instructor Info */}
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Your Courses
                  </h2>
                  <div className="space-y-4">
                    {dashboardData.enrollments.map((enrollment) => (
                      <InstructorCourseCard
                        key={enrollment.id}
                        enrollment={enrollment}
                      />
                    ))}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Courses:</span>
                      <span className="text-sm font-medium">
                        {dashboardData.enrollments.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Classes:</span>
                      <span className="text-sm font-medium">
                        {dashboardData.schedules.length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Completed:</span>
                      <span className="text-sm font-medium text-green-600">
                        {dashboardData.schedules.filter(s => s.status === 'completed').length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Upcoming:</span>
                      <span className="text-sm font-medium text-blue-600">
                        {dashboardData.schedules.filter(s => s.status === 'scheduled').length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right column - Calendar */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-900">
                      Class Schedule
                    </h2>
                    <p className="text-sm text-gray-600">
                      Your upcoming and completed classes
                    </p>
                  </div>
                  <div className="p-6">
                    <StudentCalendar schedules={dashboardData.schedules} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}