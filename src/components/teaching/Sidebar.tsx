import { useNavigate, useLocation } from "react-router-dom"
import { DashboardOutlined, FileTextOutlined, QuestionCircleOutlined, CheckSquareOutlined, BarChartOutlined, UserOutlined, VideoCameraOutlined, BookOutlined, EditOutlined, FileSearchOutlined, PieChartOutlined } from "@ant-design/icons"
const navItems = [
  { path: "/teaching/dashboard", label: "学情总览", icon: <DashboardOutlined /> },
  { path: "/teaching/courseware", label: "智能课件", icon: <FileTextOutlined /> },
  { path: "/teaching/ai-qa", label: "AI课堂答疑", icon: <QuestionCircleOutlined /> },
  { path: "/teaching/homework", label: "作业批改", icon: <CheckSquareOutlined /> },
  { path: "/teaching/analytics", label: "学情分析", icon: <BarChartOutlined /> },
  { path: "/teaching/student-profile", label: "学习画像", icon: <UserOutlined /> },
  { path: "/teaching/live", label: "线上直播", icon: <VideoCameraOutlined /> },
  { path: "/teaching/micro-course", label: "微课资源库", icon: <BookOutlined /> },
  { path: "/teaching/lesson-prep", label: "备课助手", icon: <EditOutlined /> },
  { path: "/teaching/exam", label: "智能阅卷", icon: <FileSearchOutlined /> },
  { path: "/teaching/grades", label: "成绩报表", icon: <PieChartOutlined /> },
]
export default function TeachingSidebar() {
  const navigate = useNavigate(); const location = useLocation()
  return (<><div className="sidebar-logo"><div className="logo-icon">AI</div><div className="logo-text">智慧教学<small>AI Teaching Platform</small></div></div>
    <div className="sidebar-nav"><div className="nav-section">教学核心功能</div>{navItems.map(item => (<div key={item.path} className={"nav-item" + (location.pathname === item.path ? " active" : "")} onClick={() => navigate(item.path)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span></div>))}</div></>)
}