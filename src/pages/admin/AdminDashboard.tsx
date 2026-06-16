import { Row, Col, Table, Tag, Statistic } from "antd"
import { useNavigate, useLocation } from "react-router-dom"
import { SettingOutlined, DesktopOutlined, UserOutlined, AlertOutlined, DashboardOutlined, MonitorOutlined, BookOutlined } from "@ant-design/icons"
import { mockUsers, mockClassrooms, mockAlertStats, mockAlerts } from "../../utils/mockData"
import EChartsReact from "echarts-for-react"
const navItems = [
  { path: "/admin/dashboard", label: "管理首页", icon: <DashboardOutlined /> },
  { path: "/admin/devices", label: "设备管理", icon: <DesktopOutlined /> },
  { path: "/admin/users", label: "用户管理", icon: <UserOutlined /> },
  { path: "/admin/threshold", label: "阈值配置", icon: <AlertOutlined /> },
  { path: "/admin/logs", label: "系统日志", icon: <SettingOutlined /> },
]
export default function AdminDashboard() {
  const navigate = useNavigate(); const location = useLocation()
  const onlineCount = mockClassrooms.filter(c => c.status === "online").length
  const offlineCount = mockClassrooms.filter(c => c.status === "offline").length
  const warningCount = mockClassrooms.filter(c => c.status === "warning").length
  const teacherCount = mockUsers.filter(u => u.role === "teacher").length
  const trendOption = {
    tooltip: { trigger: "axis", backgroundColor: "#132044", borderColor: "#1a3a6b", textStyle: { color: "#e0e8f0" } },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "3%", containLabel: true },
    xAxis: { type: "category", data: Array.from({ length: 24 }, (_, i) => i + "时"), axisLabel: { color: "#5a6f8a" }, axisLine: { lineStyle: { color: "#1a3a6b" } } },
    yAxis: { type: "value", axisLabel: { color: "#5a6f8a" }, splitLine: { lineStyle: { color: "rgba(26,58,107,0.3)" } } },
    series: [{ data: mockAlertStats.hourlyTrend, type: "line", smooth: true, lineStyle: { color: "#ff1744", width: 2 }, areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(255,23,68,0.3)" }, { offset: 1, color: "rgba(255,23,68,0.02)" }] } }, symbol: "circle", itemStyle: { color: "#ff1744" } }]
  }
  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a1628", overflow: "hidden" }}>
      <div className="teaching-sidebar">
        <div className="sidebar-logo"><div className="logo-icon" style={{ background: "linear-gradient(135deg, #7c4dff, #ff1744)" }}>AD</div><div className="logo-text">后台管理<small>Admin Console</small></div></div>
        <div className="sidebar-nav"><div className="nav-section">系统管理</div>{navItems.map(item => (<div key={item.path} className={"nav-item" + (location.pathname === item.path ? " active" : "")} onClick={() => navigate(item.path)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span></div>))}
        <div className="nav-section mt-8">模块导航</div>
        <div className="nav-item" onClick={() => navigate("/teaching/dashboard")}><span className="nav-icon"><BookOutlined /></span><span>教学平台</span></div>
        <div className="nav-item" onClick={() => navigate("/monitor/dashboard")}><span className="nav-icon"><MonitorOutlined /></span><span>监控系统</span></div>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div className="admin-header"><div className="header-left"><h3>全局后台管理</h3></div><div className="header-right"><div className="header-user"><div className="user-avatar">A</div><span className="user-name">系统管理员</span></div></div></div>
        <div className="admin-content">
          <Row gutter={[16, 16]}><Col xs={12} sm={6}><div className="stat-card"><div className="stat-title">在线设备</div><div className="stat-value" style={{ color: "#00e676" }}>{onlineCount}</div></div></Col><Col xs={12} sm={6}><div className="stat-card"><div className="stat-title">告警设备</div><div className="stat-value" style={{ color: "#ff9100" }}>{warningCount}</div></div></Col><Col xs={12} sm={6}><div className="stat-card"><div className="stat-title">离线设备</div><div className="stat-value" style={{ color: "#5a6f8a" }}>{offlineCount}</div></div></Col><Col xs={12} sm={6}><div className="stat-card"><div className="stat-title">教师用户</div><div className="stat-value" style={{ color: "#7c4dff" }}>{teacherCount}</div></div></Col></Row>
          <Row gutter={[16, 16]} className="mt-16"><Col xs={24} lg={12}><div className="data-panel"><div className="panel-title">今日告警趋势</div><EChartsReact option={trendOption} style={{ height: 250 }} /></div></Col>
          <Col xs={24} lg={12}><div className="data-panel"><div className="panel-title">系统概览</div><Row gutter={[16, 16]}><Col span={12}><Statistic title="今日告警总数" value={mockAlertStats.todayTotal} valueStyle={{ color: "#ff1744" }} /><Statistic title="待处理告警" value={mockAlertStats.pendingCount} valueStyle={{ color: "#ff9100" }} className="mt-8" /></Col><Col span={12}><Statistic title="教室总数" value={mockClassrooms.length} valueStyle={{ color: "#00d4ff" }} /><Statistic title="摄像头总数" value={mockClassrooms.reduce((s, c) => s + c.cameraCount, 0)} valueStyle={{ color: "#1677ff" }} className="mt-8" /></Col></Row></div></Col></Row>
          <div className="data-panel mt-16"><div className="panel-title">最近告警记录</div><Table dataSource={mockAlerts.slice(0, 8)} columns={[{ title: "教室", dataIndex: "classroomName", key: "classroomName" }, { title: "告警类型", dataIndex: "description", key: "description", ellipsis: true }, { title: "时间", dataIndex: "timestamp", key: "timestamp", render: (t: string) => new Date(t).toLocaleString("zh-CN") }, { title: "状态", dataIndex: "status", key: "status", render: (s: string) => <Tag color={s === "pending" ? "#ff1744" : s === "confirmed" ? "#ff9100" : "#00e676"}>{s === "pending" ? "待处理" : s === "confirmed" ? "已确认" : "已解决"}</Tag> }]} pagination={false} size="small" rowKey="id" /></div>
        </div>
      </div>
    </div>
  )
}