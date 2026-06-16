import { Table, Tag, Button, Space, message, Row, Col, Statistic, Modal, Form, Input, Select } from "antd"
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { SettingOutlined, DesktopOutlined, UserOutlined, AlertOutlined, DashboardOutlined } from "@ant-design/icons"
import { mockUsers } from "../../utils/mockData"
const adminNav = [
  { path: "/admin/dashboard", label: "管理首页", icon: <DashboardOutlined /> },
  { path: "/admin/devices", label: "设备管理", icon: <DesktopOutlined /> },
  { path: "/admin/users", label: "用户管理", icon: <UserOutlined /> },
  { path: "/admin/threshold", label: "阈值配置", icon: <AlertOutlined /> },
  { path: "/admin/logs", label: "系统日志", icon: <SettingOutlined /> },
]
export default function UserManagement() {
  const navigate = useNavigate(); const location = useLocation()
  const [users, setUsers] = useState(mockUsers)
  const [modalOpen, setModalOpen] = useState(false); const [editingUser, setEditingUser] = useState<any>(null)
  const [form] = Form.useForm()
  const handleSave = () => {
    form.validateFields().then(values => {
      if (editingUser) { setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...values } : u)); message.success("用户已更新") }
      else { setUsers(prev => [...prev, { id: "u" + Date.now(), ...values, avatar: "", classrooms: [] }]); message.success("用户已添加") }
      setModalOpen(false); setEditingUser(null); form.resetFields()
    })
  }
  return (
    <div style={{ display: "flex", height: "100vh", background: "#0a1628", overflow: "hidden" }}>
      <div className="teaching-sidebar"><div className="sidebar-logo"><div className="logo-icon" style={{ background: "linear-gradient(135deg, #7c4dff, #ff1744)" }}>AD</div><div className="logo-text">后台管理<small>Admin Console</small></div></div><div className="sidebar-nav"><div className="nav-section">系统管理</div>{adminNav.map(item => (<div key={item.path} className={"nav-item" + (location.pathname === item.path ? " active" : "")} onClick={() => navigate(item.path)}><span className="nav-icon">{item.icon}</span><span>{item.label}</span></div>))}</div></div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div className="admin-header"><div className="header-left"><h3>用户管理</h3></div><div className="header-right"><Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingUser(null); form.resetFields(); setModalOpen(true) }}>添加用户</Button></div></div>
        <div className="admin-content">
          <Row gutter={16} className="mb-16"><Col span={8}><Statistic title="用户总数" value={users.length} valueStyle={{ color: "#00d4ff" }} /></Col><Col span={8}><Statistic title="管理员" value={users.filter(u => u.role === "admin").length} valueStyle={{ color: "#7c4dff" }} /></Col><Col span={8}><Statistic title="教师" value={users.filter(u => u.role === "teacher").length} valueStyle={{ color: "#1677ff" }} /></Col></Row>
          <Table dataSource={users} columns={[{ title: "用户名", dataIndex: "username", key: "username" }, { title: "姓名", dataIndex: "name", key: "name" }, { title: "角色", dataIndex: "role", key: "role", render: (r: string) => <Tag color={r === "admin" ? "#7c4dff" : "#1677ff"}>{r === "admin" ? "管理员" : "教师"}</Tag> }, { title: "状态", dataIndex: "status", key: "status", render: (s: string) => <Tag color={s === "active" ? "#00e676" : "#5a6f8a"}>{s === "active" ? "正常" : "禁用"}</Tag> }, { title: "操作", key: "action", render: (_: unknown, record: any) => (<Space><Button size="small" icon={<EditOutlined />} onClick={() => { setEditingUser(record); form.setFieldsValue(record); setModalOpen(true) }}>编辑</Button><Button size="small" danger icon={<DeleteOutlined />} onClick={() => { setUsers(prev => prev.filter(u => u.id !== record.id)); message.success("已删除") }}>删除</Button></Space>) }]} rowKey="id" pagination={false} size="middle" />
          <Modal title={editingUser ? "编辑用户" : "添加用户"} open={modalOpen} onCancel={() => { setModalOpen(false); setEditingUser(null) }} onOk={handleSave}><Form form={form} layout="vertical"><Form.Item name="username" label="用户名" rules={[{ required: true }]}><Input /></Form.Item><Form.Item name="name" label="姓名" rules={[{ required: true }]}><Input /></Form.Item><Form.Item name="role" label="角色" rules={[{ required: true }]}><Select options={[{ value: "admin", label: "管理员" }, { value: "teacher", label: "教师" }]} /></Form.Item><Form.Item name="status" label="状态"><Select options={[{ value: "active", label: "正常" }, { value: "disabled", label: "禁用" }]} /></Form.Item></Form></Modal>
        </div>
      </div>
    </div>
  )
}
