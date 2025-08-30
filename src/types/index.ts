export interface User {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'instructor';
  joinDate: string;
}

export interface StudentData extends User {
  courses: CourseData[];
  teacher: TeacherData;
}

export interface TeacherData {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  experience: string;
  rating: number;
  bio: string;
  profileImage: string;
  students: string[];
}

export interface CourseData {
  id: number;
  name: string;
  progress: number;
  totalSessions: number;
  completedSessions: number;
  nextSession: string | null;
  status: 'active' | 'completed' | 'paused';
  grade: string;
  teacherId: string;
}

export interface AttendanceRecord {
  id: string;
  date: string;
  status: 'present' | 'absent' | 'holiday' | 'scheduled';
  session: string;
  courseId: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}