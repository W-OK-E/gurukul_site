// components/StudentCalendar.tsx
'use client'

import { useState } from 'react'
import type { ScheduleEntry } from '@/lib/database-service'

interface StudentCalendarProps {
  schedules: ScheduleEntry[]
}

export default function StudentCalendar({ schedules }: StudentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState<'month' | 'list'>('month')

  // Helper functions
  const today = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Get first day of month and days in month
  const firstDay = new Date(currentYear, currentMonth, 1)
  const lastDay = new Date(currentYear, currentMonth + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Get schedules for a specific date
  const getSchedulesForDate = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    return schedules.filter(schedule => schedule.class_date === dateString)
  }

  // Get status color
  const getStatusColor = (status: ScheduleEntry['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500'
      case 'scheduled':
        return 'bg-blue-500'
      case 'cancelled':
        return 'bg-red-500'
      case 'rescheduled':
        return 'bg-yellow-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: ScheduleEntry['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed'
      case 'scheduled':
        return 'Scheduled'
      case 'cancelled':
        return 'Cancelled'
      case 'rescheduled':
        return 'Rescheduled'
      default:
        return status
    }
  }

  // Generate calendar days
  const calendarDays = []
  
  // Empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  
  // Days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(new Date(currentYear, currentMonth, day))
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  if (view === 'list') {
    return (
      <div>
        {/* Header with view toggle */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Class Schedule</h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setView('month')}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Month View
            </button>
            <button
              onClick={() => setView('list')}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
            >
              List View
            </button>
          </div>
        </div>

        {/* List view */}
        <div className="space-y-4">
          {schedules.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No classes scheduled
            </div>
          ) : (
            schedules
              .sort((a, b) => new Date(a.class_date).getTime() - new Date(b.class_date).getTime())
              .map((schedule) => {
                const scheduleDate = new Date(schedule.class_date)
                const isPast = scheduleDate < today
                
                return (
                  <div
                    key={schedule.id}
                    className={`p-4 rounded-lg border-l-4 ${getStatusColor(schedule.status)} ${
                      isPast ? 'bg-gray-50' : 'bg-white'
                    } shadow-sm`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900">
                            {scheduleDate.toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(schedule.status)} text-white`}>
                            {getStatusText(schedule.status)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {schedule.start_time} - {schedule.end_time}
                        </p>
                        {schedule.notes && (
                          <p className="text-sm text-gray-500 mt-1">
                            {schedule.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header with navigation and view toggle */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-medium text-gray-900">
            {monthNames[currentMonth]} {currentYear}
          </h3>
          <div className="flex items-center space-x-1">
            <button
              onClick={goToPreviousMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goToNextMonth}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={goToToday}
              className="ml-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Today
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setView('month')}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
          >
            Month View
          </button>
          <button
            onClick={() => setView('list')}
            className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
          >
            List View
          </button>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Days of week header */}
        <div className="grid grid-cols-7 bg-gray-50 border-b">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="px-3 py-2 text-center text-sm font-medium text-gray-700">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={index} className="h-24 border-b border-r border-gray-200"></div>
            }

            const daySchedules = getSchedulesForDate(date)
            const isToday = date.toDateString() === today.toDateString()
            const isCurrentMonth = date.getMonth() === currentMonth

            return (
              <div
                key={index}
                className={`h-24 border-b border-r border-gray-200 p-1 ${
                  isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                } ${isToday ? 'bg-blue-50' : ''}`}
              >
                <div className={`text-sm ${
                  isToday 
                    ? 'font-bold text-blue-600' 
                    : isCurrentMonth 
                    ? 'text-gray-900' 
                    : 'text-gray-400'
                }`}>
                  {date.getDate()}
                </div>
                
                {/* Schedule indicators */}
                <div className="mt-1 space-y-1">
                  {daySchedules.slice(0, 2).map((schedule) => (
                    <div
                      key={schedule.id}
                      className={`text-xs px-1 py-0.5 rounded text-white truncate ${getStatusColor(schedule.status)}`}
                      title={`${schedule.start_time} - ${schedule.end_time} (${getStatusText(schedule.status)})`}
                    >
                      {schedule.start_time}
                    </div>
                  ))}
                  {daySchedules.length > 2 && (
                    <div className="text-xs text-gray-500 px-1">
                      +{daySchedules.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span>Scheduled</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span>Cancelled</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
          <span>Rescheduled</span>
        </div>
      </div>
    </div>
  )
}