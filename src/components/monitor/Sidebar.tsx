import { useNavigate, useLocation } from "react-router-dom"
import { DashboardOutlined, AlertOutlined, BarChartOutlined, PlaySquareOutlined, OrderedListOutlined, SettingOutlined, MonitorOutlined } from "@ant-design/icons"
const navItems = [
  { path: "/monitor/dashboard", label: "监控大屏", icon: <MonitorOutlined /> },
  { path: "/monitor/alerts", label: "告警管理", icon: <AlertOutlined />, badge: 8 },
  { path: "/monitor/stats", label: "数据统计", icon: <BarChartOutlined /> },
  { path: "/monitor/replay", label: "历史回放", icon: <PlaySquareOutlined /> },
  { path: "/monitor/records", label: "告警记录", icon: <OrderedListOutlined /> },
]
export default function MonitorSidebar() {
  const navigate = useNavigate(); const location = useLocation()
  return (<><div className="sidebar-logo"><div className="logo-icon" style={{ background: "linear-gradient(135deg, #00d4ff, #7c4dff)" }}>MS</div><div className="logo-text">智慧监控<small>Smart Monitor System</small></div></div>
    <div className="sidebar-nav"><div className="nav-section">监控系统</div>{navItems.map(item => (<div key={item.path} className={"nav-item" + (location.pathname === item.path ? " active" : "")} onClick={() => navigate(item.path)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span>{item.badge && <span className="nav-badge">{item.badge}</span>}</div>))}
    <div className="nav-section mt-8">全局导航</div>
    <div className="nav-item" onClick={() => navigate("/teaching/dashboard")}><span className="nav-icon"><SettingOutlined /></span><span>教学平台</span></div>
    <div className="nav-item" onClick={() => navigate("/admin/dashboard")}><span className="nav-icon"><SettingOutlined /></span><span>后台管理</span></div>
  </div></>)
}