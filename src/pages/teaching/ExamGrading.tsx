import { Table, Tag, Button, Row, Col } from "antd"
import { FileSearchOutlined, CheckCircleOutlined, PieChartOutlined } from "@ant-design/icons"
import TeachingSidebar from "../../components/teaching/Sidebar"
import TeachingHeader from "../../components/teaching/Header"
import { mockExams, mockScoreDistribution } from "../../utils/mockData"
import EChartsReact from "echarts-for-react"

export default function ExamGrading() {
  const barOption = {
    tooltip: { trigger: "axis", backgroundColor: "#132044", borderColor: "#1a3a6b", textStyle: { color: "#e0e8f0" } },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "3%", containLabel: true },
    xAxis: { type: "category", data: mockScoreDistribution.map(d => d.range), axisLabel: { color: "#5a6f8a" }, axisLine: { lineStyle: { color: "#1a3a6b" } } },
    yAxis: { type: "value", name: "人数", axisLabel: { color: "#5a6f8a" }, splitLine: { lineStyle: { color: "rgba(26,58,107,0.3)" } } },
    series: [{ type: "bar", data: mockScoreDistribution.map(d => d.count), itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#1677ff" }, { offset: 1, color: "#00d4ff" }] }, borderRadius: [4, 4, 0, 0] } }]
  }

  return (
    <div className="teaching-layout">
      <div className="teaching-sidebar"><TeachingSidebar /></div>
      <div className="teaching-main">
        <TeachingHeader />
        <div className="teaching-content">
          <div className="page-header"><h2>智能阅卷系统</h2><p>AI自动批阅主客观题，支持成绩分析与报表导出</p></div>
          <Row gutter={[16, 16]}>
            <Col span={6}><div className="stat-card"><div className="stat-title">总考试数</div><div className="stat-value">{mockExams.length}</div><div className="stat-icon" style={{ color: "#1677ff" }}><FileSearchOutlined /></div></div></Col>
            <Col span={6}><div className="stat-card"><div className="stat-title">待阅卷</div><div className="stat-value" style={{ color: "#ff9100" }}>{mockExams.filter(e => e.status === "grading").length}</div><div className="stat-icon" style={{ color: "#ff9100" }}><FileSearchOutlined /></div></div></Col>
            <Col span={6}><div className="stat-card"><div className="stat-title">已完成</div><div className="stat-value" style={{ color: "#00e676" }}>{mockExams.filter(e => e.status === "completed").length}</div><div className="stat-icon" style={{ color: "#00e676" }}><CheckCircleOutlined /></div></div></Col>
            <Col span={6}><div className="stat-card"><div className="stat-title">AI批阅率</div><div className="stat-value" style={{ color: "#7c4dff" }}>85%</div><div className="stat-icon" style={{ color: "#7c4dff" }}><PieChartOutlined /></div></div></Col>
          </Row>
          <Row gutter={[16, 16]} className="mt-16">
            <Col span={8}><div className="data-panel"><div className="panel-title">成绩分布</div><EChartsReact option={barOption} style={{ height: 260 }} /></div></Col>
            <Col span={16}>
              <div className="data-panel">
                <div className="panel-title">考试列表</div>
                <Table
                  dataSource={mockExams}
                  rowKey="id"
                  size="small"
                  pagination={false}
                  columns={[
                    { title: "考试名称", dataIndex: "title", key: "title" },
                    { title: "课程", dataIndex: "course", key: "course" },
                    { title: "日期", dataIndex: "date", key: "date" },
                    { title: "已阅/总数", key: "graded", render: (_: unknown, r: { gradedCount: number; totalStudents: number }) => r.gradedCount + "/" + r.totalStudents },
                    { title: "平均分", dataIndex: "avgScore", key: "avgScore", render: (v: number) => v > 0 ? <span style={{ color: "#00d4ff", fontWeight: 600 }}>{v}</span> : "-" },
                    { title: "状态", dataIndex: "status", key: "status", render: (s: string) => <Tag color={s === "completed" ? "#00e676" : s === "grading" ? "#ff9100" : "#1677ff"}>{s === "completed" ? "已阅" : s === "grading" ? "阅卷中" : "待考试"}</Tag> },
                    {
                      title: "操作",
                      key: "action",
                      render: (_: any, record: any) => {
                        if (record.status === "completed") return <Button size="small">查看成绩</Button>
                        return <Button type="primary" size="small" disabled={record.status === "upcoming"}>开始阅卷</Button>
                      }
                    },
                  ]}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
