import { Form, InputNumber, Switch, Button, message, Row, Col } from "antd"
import { useNavigate, useLocation } from "react-router-dom"
import { SettingOutlined, DesktopOutlined, UserOutlined, AlertOutlined, DashboardOutlined, MonitorOutlined, BookOutlined } from "@ant-design/icons"
import { useState } from "react"
const adminNav = [
  { path: "/admin/dashboard", label: "管理首页", icon: <DashboardOutlined /> },
  { path: "/admin/devices", label: "设备管理", icon: <DesktopOutlined /> },
  { path: "/admin/users", label: "用户管理", icon: <UserOutlined /> },
  { path: "/admin/threshold", label: "阈值配置", icon: <AlertOutlined /> },
  { path: "/admin/logs", label: "系统日志", icon: <SettingOutlined /> },
]
export default function ThresholdConfig() {
  const navigate = useNavigate(); const location = useLocation()
  const [form] = Form.useForm(); const [saving, setSaving] = useState(false)
  const handleSave = () => { setSaving(true); setTimeout(() => { setSaving(false); message.success("阈值配置已保存") }, 500) }
  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a1628", overflow: "hidden" }}>
      <div className="teaching-sidebar"><div className="sidebar-logo"><div className="logo-icon" style={{ background: "linear-gradient(135deg, #7c4dff, #ff1744)" }}>AD</div><div className="logo-text">后台管理<small>Admin Console</small></div></div><div className="sidebar-nav"><div className="nav-section">系统管理</div>{adminNav.map(item => (<div key={item.path} className={"nav-item" + (location.pathname === item.path ? " active" : "")} onClick={() => navigate(item.path)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span></div>))}</div></div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div className="admin-header"><div className="header-left"><h3>告警阈值配置</h3></div></div>
        <div className="admin-content">
          <Form form={form} layout="vertical" initialValues={{ sleepingThreshold: 180, headDownThreshold: 300, crowdThreshold: 5, noTeacherDelay: 600, alertInterval: 60, enableSleeping: true, enableHeadDown: true, enableFighting: true, enableCrowd: true, enableNoTeacher: true, sensitivity: 70, snapshotEnabled: true }}>
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}><div className="data-panel"><div className="panel-title">行为检测阈值</div><Form.Item name="sleepingThreshold" label="学生睡觉检测时间阈值（秒）"><InputNumber min={10} max={600} style={{ width: "100%" }} /></Form.Item><Form.Item name="headDownThreshold" label="学生低头检测时间阈值（秒）"><InputNumber min={10} max={600} style={{ width: "100%" }} /></Form.Item><Form.Item name="crowdThreshold" label="人员聚集检测人数阈值"><InputNumber min={2} max={50} style={{ width: "100%" }} /></Form.Item><Form.Item name="noTeacherDelay" label="无人上课检测延迟（秒）"><InputNumber min={30} max={1800} style={{ width: "100%" }} /></Form.Item><Form.Item name="sensitivity" label="AI识别灵敏度（%）"><InputNumber min={0} max={100} style={{ width: "100%" }} /></Form.Item></div></Col>
              <Col xs={24} lg={12}><div className="data-panel"><div className="panel-title">告警开关与抓拍</div><Form.Item name="enableSleeping" label="学生睡觉检测" valuePropName="checked"><Switch /></Form.Item><Form.Item name="enableHeadDown" label="学生低头检测" valuePropName="checked"><Switch /></Form.Item><Form.Item name="enableFighting" label="学生打闹检测" valuePropName="checked"><Switch /></Form.Item><Form.Item name="enableCrowd" label="人员聚集检测" valuePropName="checked"><Switch /></Form.Item><Form.Item name="enableNoTeacher" label="无人上课检测" valuePropName="checked"><Switch /></Form.Item><Form.Item name="snapshotEnabled" label="自动抓拍截图" valuePropName="checked"><Switch /></Form.Item></div></Col>
            </Row>
            <Button type="primary" size="large" loading={saving} onClick={handleSave} style={{ marginTop: 16 }}>保存配置</Button>
          </Form>
        </div>
      </div>
    </div>
  )
}
