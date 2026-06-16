import { Row, Col, Table, Tag } from "antd"
import TeachingSidebar from "../../components/teaching/Sidebar"
import TeachingHeader from "../../components/teaching/Header"
import { mockStudentPerformances } from "../../utils/mockData"
import EChartsReact from "echarts-for-react"
export default function StudentAnalytics() {
  const scatterOption = {
    tooltip: { trigger: "axis", backgroundColor: "#132044", borderColor: "#1a3a6b", textStyle: { color: "#e0e8f0" } },
    grid: { left: "3%", right: "8%", bottom: "3%", top: "3%", containLabel: true },
    xAxis: { type: "value", name: "作业成绩", axisLabel: { color: "#5a6f8a" }, splitLine: { lineStyle: { color: "rgba(26,58,107,0.3)" } }, min: 40, max: 100 },
    yAxis: { type: "value", name: "考试成绩", axisLabel: { color: "#5a6f8a" }, splitLine: { lineStyle: { color: "rgba(26,58,107,0.3)" } }, min: 40, max: 100 },
    series: [{ type: "scatter", symbolSize: 16, data: mockStudentPerformances.map(s => ({ value: [s.homeworkScore, s.examScore, s.attendance], name: s.name })), itemStyle: { color: "#1677ff" }, label: { show: true, formatter: (p: { name: string }) => p.name, color: "#8899bb", fontSize: 11, position: "top" } }]
  }
  return (
    <div className="teaching-layout">
      <div className="teaching-sidebar"><TeachingSidebar /></div>
      <div className="teaching-main">
        <TeachingHeader />
        <div className="teaching-content">
          <div className="page-header"><h2>学情数据分析</h2><p>多维度学生学习数据分析，洞察教学效果</p></div>
          <Row gutter={[16, 16]}><Col span={12}><div className="data-panel"><div className="panel-title">成绩分布散点图</div><EChartsReact option={scatterOption} style={{ height: 350 }} /></div></Col></Row>
          <div className="data-panel mt-16"><div className="panel-title">学生成绩明细</div><Table dataSource={mockStudentPerformances} rowKey="studentId" size="middle" pagination={false} columns={[{ title: "姓名", dataIndex: "name", key: "name" }, { title: "班级", dataIndex: "className", key: "className" }, { title: "出勤率", dataIndex: "attendance", key: "attendance", render: (v: number) => <Tag color={v >= 90 ? "#00e676" : v >= 80 ? "#1677ff" : "#ff9100"}>{v}%</Tag> }, { title: "作业均分", dataIndex: "homeworkScore", key: "homeworkScore" }, { title: "考试均分", dataIndex: "examScore", key: "examScore" }, { title: "课堂参与", dataIndex: "participation", key: "participation", render: (v: number) => v + "%" }]} /></div>
        </div>
      </div>
    </div>
  )
}
