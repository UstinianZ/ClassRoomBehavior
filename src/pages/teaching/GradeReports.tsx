import { Row, Col, Table, Tag, Button } from "antd"
import { DownloadOutlined } from "@ant-design/icons"
import TeachingSidebar from "../../components/teaching/Sidebar"
import TeachingHeader from "../../components/teaching/Header"
import { mockScoreDistribution, mockStudentPerformances } from "../../utils/mockData"
import EChartsReact from "echarts-for-react"
export default function GradeReports() {
  const barOption = {
    tooltip: { trigger: "axis", backgroundColor: "#132044", borderColor: "#1a3a6b", textStyle: { color: "#e0e8f0" } },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "3%", containLabel: true },
    xAxis: { type: "category", data: mockScoreDistribution.map(d => d.range), axisLabel: { color: "#5a6f8a" }, axisLine: { lineStyle: { color: "#1a3a6b" } } },
    yAxis: { type: "value", name: "人数", axisLabel: { color: "#5a6f8a" }, splitLine: { lineStyle: { color: "rgba(26,58,107,0.3)" } } },
    series: [{ type: "bar", data: mockScoreDistribution.map(d => d.count), itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#1677ff" }, { offset: 1, color: "#00d4ff" }] } } }]
  }
  return (
    <div className="teaching-layout">
      <div className="teaching-sidebar"><TeachingSidebar /></div>
      <div className="teaching-main">
        <TeachingHeader />
        <div className="teaching-content">
          <div className="flex-between page-header"><div><h2>成绩可视化报表</h2><p>多维度成绩分析，支持图表与报表导出</p></div><Button icon={<DownloadOutlined />}>导出报表</Button></div>
          <Row gutter={[16, 16]}><Col span={6}><div className="stat-card"><div className="stat-title">班级平均分</div><div className="stat-value" style={{ color: "#00d4ff" }}>82.5</div></div></Col><Col span={6}><div className="stat-card"><div className="stat-title">最高分</div><div className="stat-value" style={{ color: "#00e676" }}>98</div></div></Col><Col span={6}><div className="stat-card"><div className="stat-title">最低分</div><div className="stat-value" style={{ color: "#ff1744" }}>28</div></div></Col><Col span={6}><div className="stat-card"><div className="stat-title">及格率</div><div className="stat-value" style={{ color: "#7c4dff" }}>86.7%</div></div></Col></Row>
          <Row gutter={[16, 16]} className="mt-16"><Col span={12}><div className="data-panel"><div className="panel-title">分数段分布</div><EChartsReact option={barOption} style={{ height: 280 }} /></div></Col></Row>
          <div className="data-panel mt-16"><div className="panel-title">学生成绩明细表</div><Table dataSource={mockStudentPerformances} rowKey="studentId" size="middle" pagination={{ pageSize: 10 }} columns={[{ title: "姓名", dataIndex: "name", key: "name" }, { title: "班级", dataIndex: "className", key: "className" }, { title: "出勤率", dataIndex: "attendance", key: "attendance", render: (v: number) => v + "%" }, { title: "作业均分", dataIndex: "homeworkScore", key: "homeworkScore" }, { title: "考试均分", dataIndex: "examScore", key: "examScore", sorter: (a: { examScore: number }, b: { examScore: number }) => a.examScore - b.examScore }]} /></div>
        </div>
      </div>
    </div>
  )
}
