import { Table, Tag, Button, Space, Input, Row, Col, Select, Statistic } from "antd"
import { CheckCircleOutlined, ClockCircleOutlined, FileTextOutlined } from "@ant-design/icons"
import TeachingSidebar from "../../components/teaching/Sidebar"
import TeachingHeader from "../../components/teaching/Header"
import { mockHomeworks } from "../../utils/mockData"
import EChartsReact from "echarts-for-react"
export default function HomeworkGrading() {
  const pieOption = {
    tooltip: { trigger: "item", backgroundColor: "#132044", borderColor: "#1a3a6b", textStyle: { color: "#e0e8f0" } },
    series: [{ type: "pie", radius: ["45%", "70%"], center: ["50%", "50%"], data: [{ value: 5, name: "待批改", itemStyle: { color: "#ff9100" } }, { value: 12, name: "已完成", itemStyle: { color: "#00e676" } }, { value: 3, name: "进行中", itemStyle: { color: "#1677ff" } }], label: { color: "#8899bb", fontSize: 12 }, labelLine: { lineStyle: { color: "#1a3a6b" } } }]
  }
  return (
    <div className="teaching-layout">
      <div className="teaching-sidebar"><TeachingSidebar /></div>
      <div className="teaching-main">
        <TeachingHeader />
        <div className="teaching-content">
          <div className="page-header"><h2>作业智能批改</h2><p>AI自动批改作业，支持多种题型，即时反馈</p></div>
          <Row gutter={[16, 16]}>
            <Col span={6}><div className="stat-card"><div className="stat-title">总作业数</div><div className="stat-value">20</div><div className="stat-icon" style={{ color: "#1677ff" }}><FileTextOutlined /></div></div></Col>
            <Col span={6}><div className="stat-card"><div className="stat-title">待批改</div><div className="stat-value" style={{ color: "#ff9100" }}>5</div><div className="stat-icon" style={{ color: "#ff9100" }}><ClockCircleOutlined /></div></div></Col>
            <Col span={6}><div className="stat-card"><div className="stat-title">已完成</div><div className="stat-value" style={{ color: "#00e676" }}>12</div><div className="stat-icon" style={{ color: "#00e676" }}><CheckCircleOutlined /></div></div></Col>
            <Col span={6}><div className="stat-card"><div className="stat-title">平均分</div><div className="stat-value" style={{ color: "#7c4dff" }}>82.6</div><div className="stat-icon" style={{ color: "#7c4dff" }}><FileTextOutlined /></div></div></Col>
          </Row>
          <Row gutter={[16, 16]} className="mt-16">
            <Col span={8}><div className="data-panel" style={{ height: 280 }}><div className="panel-title">批改进度</div><EChartsReact option={pieOption} style={{ height: 220 }} /></div></Col>
            <Col span={16}><div className="data-panel" style={{ height: 280 }}><div className="panel-title">作业列表</div><Table dataSource={mockHomeworks} rowKey="id" size="small" pagination={false} columns={[{ title: "作业名称", dataIndex: "title", key: "title" }, { title: "课程", dataIndex: "course", key: "course" }, { title: "提交/总人数", key: "submit", render: (_: unknown, r: { submittedCount: number; totalCount: number }) => r.submittedCount + "/" + r.totalCount }, { title: "平均分", dataIndex: "avgScore", key: "avgScore", render: (v: number) => <span style={{ color: v >= 80 ? "#00e676" : v >= 60 ? "#ff9100" : "#ff1744" }}>{v}</span> }, { title: "状态", dataIndex: "status", key: "status", render: (s: string) => <Tag color={s === "active" ? "#1677ff" : s === "grading" ? "#ff9100" : "#00e676"}>{s === "active" ? "收集中" : s === "grading" ? "批改中" : "已完成"}</Tag> }, { title: "操作", key: "action", render: () => <Button size="small" type="primary">批改</Button> }]} /></div></Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
