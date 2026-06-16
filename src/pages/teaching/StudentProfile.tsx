import { useState } from "react"
import { Row, Col, Select, Avatar, Descriptions, Tag } from "antd"
import { UserOutlined } from "@ant-design/icons"
import TeachingSidebar from "../../components/teaching/Sidebar"
import TeachingHeader from "../../components/teaching/Header"
import { mockStudentPerformances } from "../../utils/mockData"
import EChartsReact from "echarts-for-react"
export default function StudentProfile() {
  const [selectedStudent, setSelectedStudent] = useState(mockStudentPerformances[0])
  const trendOption = {
    tooltip: { trigger: "axis", backgroundColor: "#132044", borderColor: "#1a3a6b", textStyle: { color: "#e0e8f0" } },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "3%", containLabel: true },
    xAxis: { type: "category", data: ["第1周", "第2周", "第3周", "第4周", "第5周", "第6周", "第7周"], axisLabel: { color: "#5a6f8a" }, axisLine: { lineStyle: { color: "#1a3a6b" } } },
    yAxis: { type: "value", min: 0, max: 100, axisLabel: { color: "#5a6f8a", formatter: "{value}%" }, splitLine: { lineStyle: { color: "rgba(26,58,107,0.3)" } } },
    series: [{ data: selectedStudent.attentionTrend, type: "line", smooth: true, lineStyle: { color: "#1677ff", width: 2 }, areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(22,119,255,0.3)" }, { offset: 1, color: "rgba(22,119,255,0.02)" }] } }, symbol: "circle", symbolSize: 6, itemStyle: { color: "#00d4ff" } }]
  }
  return (
    <div className="teaching-layout">
      <div className="teaching-sidebar"><TeachingSidebar /></div>
      <div className="teaching-main">
        <TeachingHeader />
        <div className="teaching-content">
          <div className="page-header"><h2>学生学习画像</h2><p>全方位分析学生学习状态与能力图谱</p></div>
          <Row gutter={[16, 16]}>
            <Col span={6}><div className="data-panel" style={{ textAlign: "center", padding: 24 }}><Avatar size={72} icon={<UserOutlined />} style={{ background: "linear-gradient(135deg, #1677ff, #7c4dff)", marginBottom: 12 }} /><div style={{ fontSize: 18, fontWeight: 600, color: "#e0e8f0" }}>{selectedStudent.name}</div><div style={{ color: "#5a6f8a", fontSize: 13 }}>{selectedStudent.className}</div><Select value={selectedStudent.studentId} onChange={(v) => setSelectedStudent(mockStudentPerformances.find(s => s.studentId === v) || mockStudentPerformances[0])} style={{ width: "100%", marginTop: 16 }} options={mockStudentPerformances.map(s => ({ value: s.studentId, label: s.name }))} /></div></Col>
            <Col span={18}><div className="data-panel"><div className="panel-title">专注度趋势</div><EChartsReact option={trendOption} style={{ height: 250 }} /></div></Col>
          </Row>
          <div className="data-panel mt-16"><div className="panel-title">学习指标详情</div><Descriptions column={2} size="small" contentStyle={{ color: "#e0e8f0" }} labelStyle={{ color: "#8899bb" }}><Descriptions.Item label="出勤率">{selectedStudent.attendance}%</Descriptions.Item><Descriptions.Item label="作业均分">{selectedStudent.homeworkScore}</Descriptions.Item><Descriptions.Item label="考试均分">{selectedStudent.examScore}</Descriptions.Item><Descriptions.Item label="参与度">{selectedStudent.participation}%</Descriptions.Item></Descriptions></div>
        </div>
      </div>
    </div>
  )
}