import { Row, Col, Tag, Input, Select, Button } from "antd"
import { PlayCircleOutlined, EyeOutlined, UserOutlined, SearchOutlined } from "@ant-design/icons"
import TeachingSidebar from "../../components/teaching/Sidebar"
import TeachingHeader from "../../components/teaching/Header"
import { mockMicroCourses } from "../../utils/mockData"
export default function MicroCourseLib() {
  return (
    <div className="teaching-layout">
      <div className="teaching-sidebar"><TeachingSidebar /></div>
      <div className="teaching-main">
        <TeachingHeader />
        <div className="teaching-content">
          <div className="page-header"><h2>微课资源库</h2><p>精选微课资源，支持在线预览与下载</p></div>
          <Row gutter={[16, 16]} className="mb-16">
            <Col span={8}><Input prefix={<SearchOutlined />} placeholder="搜索微课..." /></Col>
            <Col span={4}><Select placeholder="科目" style={{ width: "100%" }} options={[{ value: "all", label: "全部" }, { value: "计算机", label: "计算机" }, { value: "数学", label: "数学" }]} /></Col>
            <Col span={4}><Button type="primary">上传微课</Button></Col>
          </Row>
          <Row gutter={[16, 16]}>
            {mockMicroCourses.map(mc => (
              <Col xs={24} sm={12} md={8} lg={6} key={mc.id}>
                <div className="stat-card" style={{ padding: 0, overflow: "hidden", cursor: "pointer" }}>
                  <div style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, #0f1f3d, #1a3050)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                    <PlayCircleOutlined style={{ fontSize: 48, color: "#1677ff", opacity: 0.8 }} />
                    <div style={{ position: "absolute", bottom: 8, right: 8, background: "rgba(0,0,0,0.7)", padding: "2px 8px", borderRadius: 4, fontSize: 12, color: "#e0e8f0" }}>{mc.duration}</div>
                  </div>
                  <div style={{ padding: 12 }}>
                    <div style={{ color: "#e0e8f0", fontWeight: 600, fontSize: 14, marginBottom: 8 }}>{mc.title}</div>
                    <div className="flex-row gap-8" style={{ fontSize: 12, color: "#5a6f8a", marginBottom: 8 }}>
                      <span><UserOutlined /> {mc.teacher}</span><span><EyeOutlined /> {mc.views}</span>
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>{mc.tags.map(t => <Tag key={t} color="#1677ff" style={{ fontSize: 11, margin: 0 }}>{t}</Tag>)}</div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  )
}
