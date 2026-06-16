import { Table, Tag, Button, Space, message, Row, Col, Statistic, Modal, Form, Input, Select } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { SettingOutlined, DesktopOutlined, UserOutlined, AlertOutlined, DashboardOutlined } from "@ant-design/icons"
import { mockClassrooms } from "../../utils/mockData"
const adminNav = [
  { path: "/admin/dashboard", label: "管理首页", icon: <DashboardOutlined /> },
  { path: "/admin/devices", label: "设备管理", icon: <DesktopOutlined /> },
  { path: "/admin/users", label: "用户管理", icon: <UserOutlined /> },
  { path: "/admin/threshold", label: "阈值配置", icon: <AlertOutlined /> },
  { path: "/admin/logs", label: "系统日志", icon: <SettingOutlined /> },
]
export default function DeviceManagement() {
  const navigate = useNavigate(); const location = useLocation()
  const [devices, setDevices] = useState(mockClassrooms)
  const [modalOpen, setModalOpen] = useState(false); const [editingDevice, setEditingDevice] = useState<any>(null)
  const [form] = Form.useForm()
  const handleSave = () => {
    form.validateFields().then(values => {
      if (editingDevice) { setDevices(prev => prev.map(d => d.id === editingDevice.id ? { ...d, ...values } : d)); message.success("设备信息已更新") }
      else { setDevices(prev => [...prev, { id: "c" + Date.now(), ...values, cameraCount: parseInt(values.cameraCount) || 2, studentCount: 0, lastActive: new Date().toISOString(), status: "online" }]); message.success("设备已添加") }
      setModalOpen(false); setEditingDevice(null); form.resetFields()
    })
  }
  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a1628", overflow: "hidden" }}>
      <div className="teaching-sidebar">
        <div className="sidebar-logo"><div className="logo-icon" style={{ background: "linear-gradient(135deg, #7c4dff, #ff1744)" }}>AD</div><div className="logo-text">后台管理<small>Admin Console</small></div></div>
        <div className="sidebar-nav"><div className="nav-section">系统管理</div>{adminNav.map(item => (<div key={item.path} className={"nav-item" + (location.pathname === item.path ? " active" : "")} onClick={() => navigate(item.path)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span></div>))}</div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div className="admin-header"><div className="header-left"><h3>教室设备管理</h3></div><div className="header-right"><Button icon={<ReloadOutlined />} style={{ marginRight: 8 }}>刷新</Button><Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingDevice(null); form.resetFields(); setModalOpen(true) }}>添加设备</Button></div></div>
        <div className="admin-content">
          <Row gutter={16} className="mb-16"><Col span={6}><Statistic title="设备总数" value={devices.length} valueStyle={{ color: "#00d4ff" }} /></Col><Col span={6}><Statistic title="在线" value={devices.filter(d => d.status === "online").length} valueStyle={{ color: "#00e676" }} /></Col><Col span={6}><Statistic title="离线" value={devices.filter(d => d.status === "offline").length} valueStyle={{ color: "#5a6f8a" }} /></Col><Col span={6}><Statistic title="告警" value={devices.filter(d => d.status === "warning").length} valueStyle={{ color: "#ff9100" }} /></Col></Row>
          <Table dataSource={devices} columns={[{ title: "教室名称", dataIndex: "name", key: "name" }, { title: "楼栋", dataIndex: "building", key: "building" }, { title: "摄像头数", dataIndex: "cameraCount", key: "cameraCount" }, { title: "学生数", dataIndex: "studentCount", key: "studentCount" }, { title: "状态", dataIndex: "status", key: "status", render: (s: string) => <Tag color={s === "online" ? "#00e676" : s === "warning" ? "#ff9100" : "#5a6f8a"}>{s === "online" ? "在线" : s === "warning" ? "告警" : "离线"}</Tag> }, { title: "最后活跃", dataIndex: "lastActive", key: "lastActive" }, { title: "操作", key: "action", render: (_: unknown, record: any) => (<Space><Button size="small" icon={<EditOutlined />} onClick={() => { setEditingDevice(record); form.setFieldsValue(record); setModalOpen(true) }}>编辑</Button><Button size="small" danger icon={<DeleteOutlined />} onClick={() => { setDevices(prev => prev.filter(d => d.id !== record.id)); message.success("已删除") }}>删除</Button></Space>) }]} rowKey="id" pagination={false} size="middle" />
          <Modal title={editingDevice ? "编辑设备" : "添加设备"} open={modalOpen} onCancel={() => { setModalOpen(false); setEditingDevice(null) }} onOk={handleSave}><Form form={form} layout="vertical"><Form.Item name="name" label="教室名称" rules={[{ required: true }]}><Input /></Form.Item><Form.Item name="building" label="楼栋" rules={[{ required: true }]}><Input /></Form.Item><Form.Item name="floor" label="楼层" rules={[{ required: true }]}><Input type="number" /></Form.Item><Form.Item name="cameraCount" label="摄像头数量"><Input type="number" /></Form.Item><Form.Item name="status" label="状态"><Select options={[{ value: "online", label: "在线" }, { value: "offline", label: "离线" }, { value: "warning", label: "告警" }]} /></Form.Item></Form></Modal>
        </div>
      </div>
    </div>
  )
}
