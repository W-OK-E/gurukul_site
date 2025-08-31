import { requireStudent } from "@/lib/auth";
import { logoutAction } from "@/app/actions/auth";
import StudentDashboardClient from "./StudentDashboardClient";

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

export default async function StudentDashboard() {
  // Server-side authentication check
  const user = await requireStudent();

  // Mock student data - in real app, fetch from database using user info
  const studentData: StudentData = {
    name: user?.name || "Alex Johnson",
    email: user?.email || "student@demo.com",
    id: "STU-2024-001",
    joinDate: "September 2024"
  };

  // Mock teacher data - in real app, fetch from database
  const teacherData: TeacherData = {
    name: "Dr. Sarah Mitchell",
    email: "sarah.mitchell@tutoring.com",
    phone: "+1 (555) 123-4567",
    subject: "Advanced Mathematics",
    experience: "8 years",
    rating: 4.9,
    bio: "Specialized in Calculus, Linear Algebra, and Statistics with a PhD in Mathematics from Stanford University.",
    profileImage: "👩‍🏫",
    nextSession: "Tomorrow at 3:00 PM"
  };

  // Mock course data - in real app, fetch from database
  const coursesData: CourseData[] = [
    {
      id: 1,
      name: "Advanced Calculus",
      progress: 75,
      totalSessions: 20,
      completedSessions: 15,
      nextSession: "Dec 30, 2024 - 3:00 PM",
      status: "active",
      grade: "A-"
    },
    {
      id: 2,
      name: "Linear Algebra",
      progress: 60,
      totalSessions: 16,
      completedSessions: 10,
      nextSession: "Jan 2, 2025 - 2:00 PM",
      status: "active",
      grade: "B+"
    },
    {
      id: 3,
      name: "Statistics & Probability",
      progress: 100,
      totalSessions: 12,
      completedSessions: 12,
      nextSession: null,
      status: "completed",
      grade: "A"
    }
  ];

  // Mock attendance data - in real app, fetch from database
  const attendanceData: AttendanceData = {
    "2024-12-15": { status: "present", session: "Calculus - Integration" },
    "2024-12-18": { status: "present", session: "Linear Algebra - Matrices" },
    "2024-12-20": { status: "absent", session: "Calculus - Applications" },
    "2024-12-22": { status: "present", session: "Statistics - Distributions" },
    "2024-12-25": { status: "holiday", session: "Christmas Holiday" },
    "2024-12-27": { status: "present", session: "Linear Algebra - Determinants" },
    "2024-12-29": { status: "scheduled", session: "Calculus - Review" }
  };

  return (
    <StudentDashboardClient
      studentData={studentData}
      teacherData={teacherData}
      coursesData={coursesData}
      attendanceData={attendanceData}
    />
  );
}