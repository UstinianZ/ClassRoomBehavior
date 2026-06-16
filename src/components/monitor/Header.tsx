import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { BellOutlined, FullscreenOutlined } from "@ant-design/icons"
import { Badge, Dropdown, Tooltip } from "antd"
import { mockNotifications } from "../../utils/mockData"
export default function MonitorHeader() {
  const navigate = useNavigate()
  const [time, setTime] = useState(new Date().toLocaleTimeString("zh-CN", { hour12: false }))
  const [dateStr, setDateStr] = useState("")
  const unreadCount = mockNotifications.filter(n => !n.read).length
  useEffect(() => {
    const updateClock = () => { const now = new Date(); setTime(now.toLocaleTimeString("zh-CN", { hour12: false })); setDateStr(now.toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit", weekday: "long" })) }
    updateClock(); const timer = setInterval(updateClock, 1000); return () => clearInterval(timer)
  }, [])
  const notificationItems = mockNotifications.slice(0, 5).map(n => ({ key: n.id, label: <div style={{ maxWidth: 300, color: n.read ? "#8899bb" : "#e0e8f0" }}>{n.title}</div> }))
  return (
    <div className="monitor-header">
      <div className="header-left"><h3>智慧教室联合监控系统</h3><div className="layout-switch-btn"><button className="active" onClick={() => navigate("/monitor/dashboard")}>监控大屏</button><button onClick={() => navigate("/monitor/stats")}>数据面板</button></div></div>
      <div className="header-right">
        <span className="header-time">{dateStr} {time}</span>
        <Dropdown menu={{ items: notificationItems }} trigger={["click"]} placement="bottomRight">
          <div className="header-btn"><Badge count={unreadCount} size="small"><BellOutlined /></Badge></div>
        </Dropdown>
        <Tooltip title="全屏显示"><div className="header-btn" onClick={() => { document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen() }}><FullscreenOutlined /></div></Tooltip>
        <div className="header-user" onClick={() => navigate("/admin/dashboard")}><div className="user-avatar">A</div><span className="user-name">管理员</span></div>
      </div>
    </div>
  )
}