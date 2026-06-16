import { Row, Col, Table, Tag } from "antd"
import MonitorSidebar from "../../components/monitor/Sidebar"
import MonitorHeader from "../../components/monitor/Header"
import { mockAlertStats, mockClassrooms } from "../../utils/mockData"
import EChartsReact from "echarts-for-react"
export default function DataStats() {
  const trendOption = {
    tooltip: { trigger: "axis", backgroundColor: "#132044", borderColor: "#1a3a6b", textStyle: { color: "#e0e8f0" } },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "3%", containLabel: true },
    xAxis: { type: "category", data: Array.from({ length: 24 }, (_, i) => i + "时"), axisLabel: { color: "#5a6f8a" }, axisLine: { lineStyle: { color: "#1a3a6b" } } },
    yAxis: { type: "value", axisLabel: { color: "#5a6f8a" }, splitLine: { lineStyle: { color: "rgba(26,58,107,0.3)" } } },
    series: [{ data: mockAlertStats.hourlyTrend, type: "line", smooth: true, lineStyle: { color: "#ff1744", width: 2 }, areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(255,23,68,0.3)" }, { offset: 1, color: "rgba(255,23,68,0.02)" }] } }, symbol: "circle", itemStyle: { color: "#ff1744" } }]
  }
  const barOption = {
    tooltip: { trigger: "axis", backgroundColor: "#132044", borderColor: "#1a3a6b", textStyle: { color: "#e0e8f0" } },
    grid: { left: "3%", right: "4%", bottom: "3%", top: "3%", containLabel: true },
    xAxis: { type: "category", data: mockAlertStats.typeDistribution.map(d => d.type), axisLabel: { color: "#5a6f8a" }, axisLine: { lineStyle: { color: "#1a3a6b" } } },
    yAxis: { type: "value", axisLabel: { color: "#5a6f8a" }, splitLine: { lineStyle: { color: "rgba(26,58,107,0.3)" } } },
    series: [{ type: "bar", data: mockAlertStats.typeDistribution.map(d => d.count), itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#ff9100" }, { offset: 1, color: "#ff1744" }] } } }]
  }
  return (
    <div className="monitor-layout">
      <div className="monitor-sidebar"><MonitorSidebar /></div>
      <div className="monitor-main">
        <MonitorHeader />
        <div className="monitor-content">
          <div className="page-header"><h2>数据可视化统计面板</h2><p>系统运行数据多维分析展示</p></div>
          <Row gutter={[16, 16]}>
            <Col span={6}><div className="stat-card"><div className="stat-title">在线设备</div><div className="big-number">{(mockClassrooms.filter(c => c.status === "online").length)}</div></div></Col>
            <Col span={6}><div className="stat-card"><div className="stat-title">今日告警</div><div className="big-number" style={{ background: "linear-gradient(135deg, #ff1744, #ff9100)", WebkitBackgroundClip: "text" }}>{mockAlertStats.todayTotal}</div></div></Col>
            <Col span={6}><div className="stat-card"><div className="stat-title">总摄像头</div><div className="big-number">{mockClassrooms.reduce((s, c) => s + c.cameraCount, 0)}</div></div></Col>
            <Col span={6}><div className="stat-card"><div className="stat-title">在线率</div><div className="big-number" style={{ background: "linear-gradient(135deg, #00e676, #00d4ff)", WebkitBackgroundClip: "text" }}>{Math.round(mockClassrooms.filter(c => c.status === "online").length / mockClassrooms.length * 100)}%</div></div></Col>
          </Row>
          <Row gutter={[16, 16]} className="mt-16">
            <Col span={12}><div className="data-panel"><div className="panel-title">全天告警趋势（24小时）</div><EChartsReact option={trendOption} style={{ height: 280 }} /></div></Col>
            <Col span={6}><div className="data-panel"><div className="panel-title">告警类型分布</div><EChartsReact option={barOption} style={{ height: 280 }} /></div></Col>
            <Col span={6}><div className="data-panel"><div className="panel-title">告警高频教室</div><Table dataSource={mockAlertStats.topClassrooms} rowKey="name" size="small" pagination={false} columns={[{ title: "名称", dataIndex: "name", key: "name" }, { title: "告警次数", dataIndex: "count", key: "count", render: (v: number) => <span style={{ color: "#ff1744", fontWeight: 600 }}>{v}</span> }]} /></div></Col>
          </Row>
        </div>
      </div>
    </div>
  )
}