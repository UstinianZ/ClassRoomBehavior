import { useState } from "react"
import { Table, Tag, Button, Space, Select, Input, message, Row, Col } from "antd"
import { WarningOutlined, ReloadOutlined } from "@ant-design/icons"
import MonitorSidebar from "../../components/monitor/Sidebar"
import MonitorHeader from "../../components/monitor/Header"
import { mockAlerts, mockAlertStats } from "../../utils/mockData"
export default function AlertManagement() {
  const [filterStatus, setFilterStatus] = useState("all")
  const alerts = filterStatus === "all" ? mockAlerts : mockAlerts.filter(a => a.status === filterStatus)
  const severityColor: Record<string, string> = { high: "#ff1744", medium: "#ff9100", low: "#1677ff" }
  const statusColor: Record<string, string> = { pending: "#ff1744", confirmed: "#ff9100", resolved: "#00e676" }
  const typeSummary = mockAlerts.reduce((acc, a) => { acc[a.status] = (acc[a.status] || 0) + 1; return acc }, {} as Record<string, number>)
  return (
    <div className="monitor-layout"><div className="monitor-sidebar"><MonitorSidebar /></div><div className="monitor-main"><MonitorHeader /><div className="monitor-content">
      <Row gutter={[16, 16]}>
        <Col span={6}><div className="stat-card"><div className="stat-title">告警总数</div><div className="stat-value" style={{ color: "#ff1744" }}>{mockAlerts.length}</div></div></Col>
        <Col span={6}><div className="stat-card"><div className="stat-title">待处理</div><div className="stat-value" style={{ color: "#ff9100" }}>{(typeSummary.pending||0)}</div></div></Col>
        <Col span={6}><div className="stat-card"><div className="stat-title">已确认</div><div className="stat-value" style={{ color: "#1677ff" }}>{(typeSummary.confirmed||0)}</div></div></Col>
        <Col span={6}><div className="stat-card"><div className="stat-title">已解决</div><div className="stat-value" style={{ color: "#00e676" }}>{(typeSummary.resolved||0)}</div></div></Col>
      </Row>
      <div className="data-panel mt-16"><div className="flex-between panel-title"><span>实时告警列表</span><Space><Select value={filterStatus} onChange={setFilterStatus} style={{ width: 120 }} options={[{ value: "all", label: "全部" }, { value: "pending", label: "待处理" }, { value: "confirmed", label: "已确认" }, { value: "resolved", label: "已解决" }]} /><Button size="small" icon={<ReloadOutlined />}>刷新</Button></Space></div>
        {alerts.slice(0, 20).map(alert => (
          <div key={alert.id} className={"alert-panel " + alert.severity} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <div className="flex-row gap-8" style={{ marginBottom: 4 }}><WarningOutlined style={{ color: severityColor[alert.severity] }} /><span style={{ color: "#e0e8f0", fontWeight: 600, fontSize: 13 }}>{alert.classroomName}</span><Tag color={severityColor[alert.severity]} style={{ marginLeft: 8, fontSize: 11 }}>{alert.severity === "high" ? "高危" : alert.severity === "medium" ? "中危" : "低危"}</Tag></div>
              <div style={{ color: "#8899bb", fontSize: 13 }}>{alert.description}</div>
              <div style={{ color: "#5a6f8a", fontSize: 11 }}>{new Date(alert.timestamp).toLocaleString("zh-CN")}</div>
            </div>
            <Space><Tag color={statusColor[alert.status]}>{alert.status === "pending" ? "待处理" : alert.status === "confirmed" ? "已确认" : "已解决"}</Tag></Space>
          </div>
        ))}
      </div>
    </div></div></div>
  )
}
