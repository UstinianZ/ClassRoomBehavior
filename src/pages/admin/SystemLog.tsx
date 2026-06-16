import { Table, Tag, Button, Select, Row, Col, Statistic } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import { useNavigate, useLocation } from "react-router-dom"
import { SettingOutlined, DesktopOutlined, UserOutlined, AlertOutlined, DashboardOutlined } from "@ant-design/icons"
import { useState } from "react"
const adminNav = [
  { path: "/admin/dashboard", label: "管理首页", icon: <DashboardOutlined /> },
  { path: "/admin/devices", label: "设备管理", icon: <DesktopOutlined /> },
  { path: "/admin/users", label: "用户管理", icon: <UserOutlined /> },
  { path: "/admin/threshold", label: "阈值配置", icon: <AlertOutlined /> },
  { path: "/admin/logs", label: "系统日志", icon: <SettingOutlined /> },
]
const logData = Array.from({ length: 30 }, (_, i) => ({
  id: "log_" + i, time: new Date(Date.now() - i * 3600000).toLocaleString("zh-CN"),
  user: ["系统管理员", "张老师", "李老师", "王老师"][Math.floor(Math.random() * 4)],
  action: ["登录系统", "修改设备配置", "查看告警记录", "导出报表"][Math.floor(Math.random() * 4)],
  target: ["教学楼A-101", "告警配置", "用户管理"][Math.floor(Math.random() * 3)], ip: "192.168.1." + Math.floor(Math.random() * 255),
  result: Math.random() > 0.1 ? "success" : "failed",
}))
export default function SystemLog() {
  const navigate = useNavigate(); const location = useLocation()
  const [logType, setLogType] = useState("all")
  const filteredLogs = logType === "all" ? logData : logData.filter(l => l.result === logType)
  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a1628", overflow: "hidden" }}>
      <div className="teaching-sidebar"><div className="sidebar-logo"><div className="logo-icon" style={{ background: "linear-gradient(135deg, #7c4dff, #ff1744)" }}>AD</div><div className="logo-text">后台管理<small>Admin Console</small></div></div><div className="sidebar-nav"><div className="nav-section">系统管理</div>{adminNav.map(item => (<div key={item.path} className={"nav-item" + (location.pathname === item.path ? " active" : "")} onClick={() => navigate(item.path)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span></div>))}</div></div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div className="admin-header"><div className="header-left"><h3>系统操作日志</h3></div><div className="header-right"><Button icon={<DownloadOutlined />}>导出日志</Button></div></div>
        <div className="admin-content">
          <Row gutter={16} className="mb-16">
            <Col span={6}><Statistic title="总记录" value={logData.length} valueStyle={{ color: "#00d4ff" }} /></Col>
            <Col span={6}><Statistic title="成功" value={logData.filter(l => l.result === "success").length} valueStyle={{ color: "#00e676" }} /></Col>
            <Col span={6}><Statistic title="失败" value={logData.filter(l => l.result === "failed").length} valueStyle={{ color: "#ff1744" }} /></Col>
            <Col span={6}><Select value={logType} onChange={setLogType} style={{ width: "100%" }} options={[{ value: "all", label: "全部日志" }, { value: "success", label: "操作成功" }, { value: "failed", label: "操作失败" }]} /></Col>
          </Row>
          <Table dataSource={filteredLogs} columns={[{ title: "时间", dataIndex: "time", key: "time", width: 180 }, { title: "操作人", dataIndex: "user", key: "user" }, { title: "操作", dataIndex: "action", key: "action" }, { title: "操作对象", dataIndex: "target", key: "target" }, { title: "结果", dataIndex: "result", key: "result", render: (r: string) => <Tag color={r === "success" ? "#00e676" : "#ff1744"}>{r === "success" ? "成功" : "失败"}</Tag> }]} rowKey="id" pagination={{ pageSize: 10 }} size="middle" />
        </div>
      </div>
    </div>
  )
}
