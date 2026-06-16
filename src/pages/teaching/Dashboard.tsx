import { useState } from 'react'
import { Card, Row, Col, Table, Tag, Timeline, Progress, Typography } from 'antd'
import {
  BookOutlined, UserOutlined, FileTextOutlined, CheckCircleOutlined,
  ArrowUpOutlined, ArrowDownOutlined
} from '@ant-design/icons'
import TeachingSidebar from '../../components/teaching/Sidebar'
import TeachingHeader from '../../components/teaching/Header'
import { mockCourses, mockNotifications, mockAlerts } from '../../utils/mockData'
import EChartsReact from 'echarts-for-react'

const { Text } = Typography

export default function TeachingDashboard() {
  const [collapsed] = useState(false)
  
  const statCards = [
    { title: '进行中课程', value: '4', icon: <BookOutlined />, color: '#1677ff', trend: '+1', up: true },
    { title: '学生总数', value: '382', icon: <UserOutlined />, color: '#00e676', trend: '+23', up: true },
    { title: '待批作业', value: '28', icon: <FileTextOutlined />, color: '#ff9100', trend: '-5', up: false },
    { title: '本月批阅', value: '1,245', icon: <CheckCircleOutlined />, color: '#7c4dff', trend: '+12%', up: true },
  ]

  const columns = [
    { title: '课程名称', dataIndex: 'name', key: 'name', render: (t: string) => <Text style={{ color: '#1677ff' }}>{t}</Text> },
    { title: '授课教师', dataIndex: 'teacher', key: 'teacher' },
    { title: '上课时间', dataIndex: 'schedule', key: 'schedule' },
    { title: '教室', dataIndex: 'classroom', key: 'classroom' },
    { title: '人数', dataIndex: 'students', key: 'students' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (s: string) => {
      const m: Record<string, { color: string; text: string }> = {
        ongoing: { color: '#00e676', text: '上课中' },
        upcoming: { color: '#ff9100', text: '待上课' },
        finished: { color: '#8899bb', text: '已结束' },
      }
      return <Tag color={m[s]?.color || '#8899bb'}>{m[s]?.text || s}</Tag>
    }},
  ]

  const attentionChartOption = {
    tooltip: { trigger: 'axis', backgroundColor: '#132044', borderColor: '#1a3a6b', textStyle: { color: '#e0e8f0' } },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '3%', containLabel: true },
    xAxis: { type: 'category', data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'], axisLabel: { color: '#5a6f8a' }, axisLine: { lineStyle: { color: '#1a3a6b' } } },
    yAxis: { type: 'value', min: 0, max: 100, axisLabel: { color: '#5a6f8a', formatter: '{value}%' }, splitLine: { lineStyle: { color: 'rgba(26, 58, 107, 0.3)' } } },
    series: [{
      data: [82, 85, 78, 88, 90, 75, 80], type: 'line', smooth: true,
      lineStyle: { color: '#1677ff', width: 2 },
      areaStyle: { color: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: 'rgba(22, 119, 255, 0.3)' }, { offset: 1, color: 'rgba(22, 119, 255, 0.02)' }] } },
      symbol: 'circle', symbolSize: 6, itemStyle: { color: '#00d4ff' },
    }]
  }

  return (
    <div className="teaching-layout">
      <div className="teaching-sidebar">
        <TeachingSidebar />
      </div>
      <div className="teaching-main">
        <TeachingHeader />
        <div className="teaching-content">
          <div className="welcome-hero">
            <h1>欢迎回来，张老师</h1>
            <p>今天是 {new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' })}，有 4 门课程正在进行中</p>
            <div className="hero-stats">
              <div className="hero-stat-item">
                <div className="num">92%</div>
                <div className="label">本周到课率</div>
              </div>
              <div className="hero-stat-item">
                <div className="num">84.5</div>
                <div className="label">平均作业分</div>
              </div>
              <div className="hero-stat-item">
                <div className="num">12h</div>
                <div className="label">本周授课时长</div>
              </div>
              <div className="hero-stat-item">
                <div className="num">156</div>
                <div className="label">AI批阅题目</div>
              </div>
            </div>
          </div>

          <Row gutter={[16, 16]}>
            {statCards.map((card, i) => (
              <Col xs={12} sm={12} md={6} key={i}>
                <div className="stat-card">
                  <div className="stat-title">{card.title}</div>
                  <div className="stat-value">{card.value}</div>
                  <div className="stat-trend" style={{ color: card.up ? '#00e676' : '#ff1744' }}>
                    {card.up ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {card.trend} 较上周
                  </div>
                  <div className="stat-icon" style={{ color: card.color }}>{card.icon}</div>
                </div>
              </Col>
            ))}
          </Row>

          <Row gutter={[16, 16]} className="mt-16">
            <Col xs={24} lg={16}>
              <div className="data-panel">
                <div className="panel-title">本周学生课堂专注度趋势</div>
                <EChartsReact option={attentionChartOption} style={{ height: 280 }} />
              </div>
            </Col>
            <Col xs={24} lg={8}>
              <div className="data-panel">
                <div className="panel-title">最近通知</div>
                <Timeline
                  items={mockNotifications.slice(0, 4).map(n => ({
                    color: n.type === 'alert' ? '#ff1744' : n.type === 'warning' ? '#ff9100' : '#1677ff',
                    children: <div>
                      <div style={{ color: '#e0e8f0', fontSize: 13 }}>{n.title}</div>
                      <div style={{ color: '#5a6f8a', fontSize: 12 }}>{n.timestamp}</div>
                    </div>,
                  }))}
                />
              </div>
            </Col>
          </Row>

          <div className="data-panel mt-16">
            <div className="panel-title">今日课程安排</div>
            <Table
              dataSource={mockCourses}
              columns={columns}
              pagination={false}
              size="middle"
              rowKey="id"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
