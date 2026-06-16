import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Spin } from 'antd'

// Lazy load all pages
// Module 1: Teaching
const TeachingDashboard = lazy(() => import('./pages/teaching/Dashboard'))
const CoursewareGeneration = lazy(() => import('./pages/teaching/CoursewareGeneration'))
const AiQa = lazy(() => import('./pages/teaching/AiQa'))
const HomeworkGrading = lazy(() => import('./pages/teaching/HomeworkGrading'))
const StudentAnalytics = lazy(() => import('./pages/teaching/StudentAnalytics'))
const StudentProfile = lazy(() => import('./pages/teaching/StudentProfile'))
const LiveTeaching = lazy(() => import('./pages/teaching/LiveTeaching'))
const MicroCourseLib = lazy(() => import('./pages/teaching/MicroCourseLib'))
const LessonPrep = lazy(() => import('./pages/teaching/LessonPrep'))
const ExamGrading = lazy(() => import('./pages/teaching/ExamGrading'))
const GradeReports = lazy(() => import('./pages/teaching/GradeReports'))
// Module 2: Monitor
const MonitorDashboard = lazy(() => import('./pages/monitor/MonitorDashboard'))
const AlertManagement = lazy(() => import('./pages/monitor/AlertManagement'))
const DataStats = lazy(() => import('./pages/monitor/DataStats'))
const HistoryReplay = lazy(() => import('./pages/monitor/HistoryReplay'))
const AlertRecords = lazy(() => import('./pages/monitor/AlertRecords'))
// Admin
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const DeviceManagement = lazy(() => import('./pages/admin/DeviceManagement'))
const UserManagement = lazy(() => import('./pages/admin/UserManagement'))
const ThresholdConfig = lazy(() => import('./pages/admin/ThresholdConfig'))
const SystemLog = lazy(() => import('./pages/admin/SystemLog'))

const Loading = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0a1628' }}>
    <Spin size="large" tip="加载中..." />
  </div>
)

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Default redirect to teaching */}
        <Route path="/" element={<Navigate to="/teaching/dashboard" replace />} />
        
        {/* Module 1: AI Teaching Platform */}
        <Route path="/teaching/dashboard" element={<TeachingDashboard />} />
        <Route path="/teaching/courseware" element={<CoursewareGeneration />} />
        <Route path="/teaching/ai-qa" element={<AiQa />} />
        <Route path="/teaching/homework" element={<HomeworkGrading />} />
        <Route path="/teaching/analytics" element={<StudentAnalytics />} />
        <Route path="/teaching/student-profile" element={<StudentProfile />} />
        <Route path="/teaching/live" element={<LiveTeaching />} />
        <Route path="/teaching/micro-course" element={<MicroCourseLib />} />
        <Route path="/teaching/lesson-prep" element={<LessonPrep />} />
        <Route path="/teaching/exam" element={<ExamGrading />} />
        <Route path="/teaching/grades" element={<GradeReports />} />
        
        {/* Module 2: Smart Monitor */}
        <Route path="/monitor/dashboard" element={<MonitorDashboard />} />
        <Route path="/monitor/alerts" element={<AlertManagement />} />
        <Route path="/monitor/stats" element={<DataStats />} />
        <Route path="/monitor/replay" element={<HistoryReplay />} />
        <Route path="/monitor/records" element={<AlertRecords />} />
        
        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/devices" element={<DeviceManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/threshold" element={<ThresholdConfig />} />
        <Route path="/admin/logs" element={<SystemLog />} />
        
        <Route path="*" element={<Navigate to="/teaching/dashboard" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
