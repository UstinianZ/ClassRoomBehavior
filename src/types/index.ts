export interface ClassroomDevice {
  id: string;
  name: string;
  building: string;
  floor: number;
  room: string;
  status: 'online' | 'offline' | 'warning';
  cameraCount: number;
  studentCount: number;
  lastActive: string;
}
export interface AlertEvent {
  id: string;
  classroomId: string;
  classroomName: string;
  type: AlertType;
  severity: 'high' | 'medium' | 'low';
  description: string;
  timestamp: string;
  snapshotUrl: string;
  status: 'pending' | 'confirmed' | 'resolved';
}
export type AlertType = 'sleeping' | 'head_down' | 'fighting' | 'no_teacher' | 'crowd' | 'other';
export interface AIRecognitionResult {
  classroomId: string;
  timestamp: string;
  totalStudents: number;
  attentionRate: number;
  behaviors: BehaviorCount[];
  alertEvents: AlertEvent[];
}
export interface BehaviorCount {
  type: AlertType;
  label: string;
  count: number;
}
export interface StudentPerformance {
  studentId: string;
  name: string;
  className: string;
  attendance: number;
  homeworkScore: number;
  examScore: number;
  participation: number;
  attentionTrend: number[];
}
export interface AlertStats {
  todayTotal: number;
  pendingCount: number;
  resolvedCount: number;
  hourlyTrend: number[];
  typeDistribution: { type: string; count: number }[];
  topClassrooms: { name: string; count: number }[];
}
export interface SystemUser {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'teacher';
  avatar: string;
  classrooms: string[];
  status: 'active' | 'disabled';
}
export interface Courseware {
  id: string;
  title: string;
  subject: string;
  grade: string;
  type: 'ppt' | 'video' | 'document' | 'quiz';
  createdAt: string;
  creator: string;
  size: string;
  downloads: number;
}
export interface MicroCourse {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  duration: string;
  views: number;
  coverUrl: string;
  createdAt: string;
  tags: string[];
}
export interface Course {
  id: string;
  name: string;
  teacher: string;
  schedule: string;
  classroom: string;
  students: number;
  status: 'ongoing' | 'upcoming' | 'finished';
}
export interface Notification {
  id: string;
  type: 'alert' | 'info' | 'warning';
  title: string;
  content: string;
  timestamp: string;
  read: boolean;
}
export interface Homework {
  id: string;
  title: string;
  course: string;
  assignedDate: string;
  dueDate: string;
  submittedCount: number;
  totalCount: number;
  avgScore: number;
  status: 'active' | 'grading' | 'completed';
}
export interface Exam {
  id: string;
  title: string;
  course: string;
  date: string;
  totalStudents: number;
  gradedCount: number;
  avgScore: number;
  maxScore: number;
  minScore: number;
  status: 'upcoming' | 'grading' | 'completed';
}
export interface ScoreDistribution {
  range: string;
  count: number;
  percentage: number;
}
