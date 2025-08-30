"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { JSX } from "react";
import { 
  User, 
  BookOpen, 
  Calendar, 
  Clock, 
  Mail, 
  Phone, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  LogOut,
  Bell,
  Settings,
  GraduationCap
} from "lucide-react";

// Type definitions
interface StudentData {
  name: string;
  email: string;
  id: string;
  joinDate: string;
}

interface TeacherData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  experience: string;
  rating: number;
  bio: string;
  profileImage: string;
  nextSession: string;
}

interface CourseData {
  id: number;
  name: string;
  progress: number;
  totalSessions: number;
  completedSessions: number;
  nextSession: string | null;
  status: 'active' | 'completed';
  grade: string;
}

interface AttendanceRecord {
  status: 'present' | 'absent' | 'holiday' | 'scheduled';
  session: string;
}

interface AttendanceData {
  [date: string]: AttendanceRecord;
}

type ActiveTab = 'overview' | 'courses' | 'attendance';

interface StudentDashboardClientProps {
  studentData: StudentData;
  teacherData: TeacherData;
  coursesData: CourseData[];
  attendanceData: AttendanceData;
}

export default function StudentDashboardClient({
  studentData,
  teacherData,
  coursesData,
  attendanceData
}: StudentDashboardClientProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    try {
      // Call server action for logout
      const response = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      router.push('/login');
    }
  };

  // Calendar functionality
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const navigateMonth = (direction: number): void => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getAttendanceStatus = (date: Date): AttendanceRecord | null => {
    const dateStr = formatDate(date);
    return attendanceData[dateStr] || null;
  };

  const getStatusColor = (status: AttendanceRecord['status']): string => {
    switch (status) {
      case "present": return "bg-green-100 text-green-800 border-green-200";
      case "absent": return "bg-red-100 text-red-800 border-red-200";
      case "holiday": return "bg-gray-100 text-gray-600 border-gray-200";
      case "scheduled": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "";
    }
  };

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case "present": return <CheckCircle className="w-3 h-3" />;
      case "absent": return <XCircle className="w-3 h-3" />;
      case "holiday": return <AlertCircle className="w-3 h-3" />;
      case "scheduled": return <Clock className="w-3 h-3" />;
      default: return null;
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days: JSX.Element[] = [];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-12"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dateStr = formatDate(date);
      const attendance = getAttendanceStatus(date);
      const isToday = formatDate(new Date()) === dateStr;
      const isSelected = selectedDate === dateStr;

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(isSelected ? null : dateStr)}
          className={`h-12 flex flex-col items-center justify-center cursor-pointer rounded-lg transition-all duration-200 relative
            ${isToday ? "ring-2 ring-purple-500 bg-purple-50" : ""}
            ${isSelected ? "bg-purple-100 shadow-md" : "hover:bg-gray-50"}
            ${attendance ? getStatusColor(attendance.status) + " border" : ""}
          `}
        >
          <span className={`text-sm font-medium ${isToday ? "text-purple-700" : ""}`}>
            {day}
          </span>
          {attendance && (
            <div className="absolute bottom-1 flex items-center justify-center">
              {getStatusIcon(attendance.status)}
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(dayName => (
          <div key={dayName} className="h-8 flex items-center justify-center text-sm font-medium text-gray-500">
            {dayName}
          </div>
        ))}
        {days}
      </div>
    );
  };

  const tabConfig = [
    { id: "overview" as const, label: "Overview", icon: User },
    { id: "courses" as const, label: "My Courses", icon: BookOpen },
    { id: "attendance" as const, label: "Attendance", icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-8">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {studentData.name}!</h1>
                <p className="text-gray-600">Student Dashboard</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-white/60 backdrop-blur-sm rounded-xl p-1 mb-8 shadow-sm">
          {tabConfig.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Teacher Details Card */}
            <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-4xl">{teacherData.profileImage}</div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{teacherData.name}</h2>
                  <p className="text-purple-600 font-medium">{teacherData.subject}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{teacherData.rating} • {teacherData.experience}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-700">{teacherData.bio}</p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{teacherData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{teacherData.phone}</span>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-6">
                  <div className="flex items-center gap-2 text-purple-700">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">Next Session:</span>
                  </div>
                  <p className="text-purple-600 mt-1">{teacherData.nextSession}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Active Courses</span>
                    <span className="text-2xl font-bold text-purple-600">
                      {coursesData.filter(course => course.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed Courses</span>
                    <span className="text-2xl font-bold text-green-600">
                      {coursesData.filter(course => course.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Overall Progress</span>
                    <span className="text-2xl font-bold text-blue-600">
                      {Math.round(coursesData.reduce((acc, course) => acc + course.progress, 0) / coursesData.length)}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Info</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Student ID</span>
                    <p className="font-medium">{studentData.id}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Email</span>
                    <p className="font-medium">{studentData.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Joined</span>
                    <p className="font-medium">{studentData.joinDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "courses" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
              <div className="text-sm text-gray-600">
                {coursesData.filter(course => course.status === 'active').length} active, {coursesData.filter(course => course.status === 'completed').length} completed
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coursesData.map(course => (
                <div key={course.id} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{course.name}</h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          course.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {course.status}
                        </span>
                        <span className="text-sm text-gray-600">Grade: {course.grade}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Sessions:</span>
                      <span>{course.completedSessions}/{course.totalSessions}</span>
                    </div>
                    {course.nextSession && (
                      <div>
                        <span className="text-purple-600 font-medium">Next: </span>
                        <span>{course.nextSession}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "attendance" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Attendance Calendar</h2>
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigateMonth(-1)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-lg font-semibold text-gray-900 min-w-40 text-center">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button 
                  onClick={() => navigateMonth(1)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-white/50 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                {renderCalendar()}
              </div>

              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Legend</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">Present</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <XCircle className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-700">Absent</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm text-gray-700">Scheduled</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Holiday</span>
                    </div>
                  </div>
                </div>

                {selectedDate && attendanceData[selectedDate] && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Session Details</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-sm text-gray-500">Date</span>
                        <p className="font-medium">{new Date(selectedDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Session</span>
                        <p className="font-medium">{attendanceData[selectedDate].session}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Status</span>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusIcon(attendanceData[selectedDate].status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(attendanceData[selectedDate].status)}`}>
                            {attendanceData[selectedDate].status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}