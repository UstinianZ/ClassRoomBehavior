import { useState } from "react"
import { Table, Button, Tag, Space, Input, Row, Col, Select, Modal, Form, message } from "antd"
import { PlusOutlined, FileTextOutlined, VideoCameraOutlined, FilePdfOutlined, DownloadOutlined, SearchOutlined, ThunderboltOutlined, RobotOutlined } from "@ant-design/icons"
import TeachingSidebar from "../../components/teaching/Sidebar"
import TeachingHeader from "../../components/teaching/Header"
import { mockCoursewares } from "../../utils/mockData"
export default function CoursewareGeneration() {
  const [data] = useState(mockCoursewares)
  const [genModal, setGenModal] = useState(false)
  const [genForm] = Form.useForm()
  const [generating, setGenerating] = useState(false)
  const handleGenerate = () => {
    genForm.validateFields().then(() => {
      setGenerating(true)
      setTimeout(() => { setGenerating(false); setGenModal(false); message.success("AI课件生成完成！") }, 2000)
    })
  }
  const typeMap: Record<string, { icon: React.ReactNode; color: string }> = {
    ppt: { icon: <FileTextOutlined />, color: "#ff9100" },
    video: { icon: <VideoCameraOutlined />, color: "#1677ff" },
    document: { icon: <FilePdfOutlined />, color: "#7c4dff" },
    quiz: { icon: <ThunderboltOutlined />, color: "#00e676" },
  }
  return (
    <div className="teaching-layout">
      <div className="teaching-sidebar"><TeachingSidebar /></div>
      <div className="teaching-main">
        <TeachingHeader />
        <div className="teaching-content">
          <div className="flex-between page-header"><div><h2>智能课件生成</h2><p>AI自动生成教学课件，支持PPT、文档、视频等多种格式</p></div><Button type="primary" icon={<RobotOutlined />} size="large" onClick={() => { genForm.resetFields(); setGenModal(true) }}>AI生成课件</Button></div>
          <Row gutter={[16, 16]} className="mb-16"><Col span={6}><Input prefix={<SearchOutlined />} placeholder="搜索课件..." /></Col><Col span={4}><Select placeholder="科目" style={{ width: "100%" }} options={[{ value: "all", label: "全部" }, { value: "数学", label: "数学" }, { value: "计算机", label: "计算机" }]} /></Col><Col span={4}><Select placeholder="类型" style={{ width: "100%" }} options={[{ value: "all", label: "全部" }, { value: "ppt", label: "PPT" }, { value: "video", label: "视频" }]} /></Col></Row>
          <div className="data-panel"><Table dataSource={data} rowKey="id" size="middle" pagination={{ pageSize: 10 }} columns={[{ title: "课件名称", dataIndex: "title", key: "title", render: (t: string, r: any) => <Space><span style={{ color: typeMap[r.type]?.color }}>{typeMap[r.type]?.icon}</span><span>{t}</span></Space> }, { title: "科目", dataIndex: "subject", key: "subject", render: (t: string) => <Tag color="#1677ff">{t}</Tag> }, { title: "类型", dataIndex: "type", key: "type", render: (t: string) => <Tag color={typeMap[t]?.color}>{t.toUpperCase()}</Tag> }, { title: "创建人", dataIndex: "creator", key: "creator" }, { title: "日期", dataIndex: "createdAt", key: "createdAt" }, { title: "下载", dataIndex: "downloads", key: "downloads" }, { title: "操作", key: "action", render: () => <Button size="small" icon={<DownloadOutlined />}>下载</Button> }]} /></div>
          <Modal title={<Space><RobotOutlined style={{ color: "#1677ff" }} />AI智能课件生成</Space>} open={genModal} onCancel={() => setGenModal(false)} onOk={handleGenerate} confirmLoading={generating} okText="开始生成" width={500}>
            <Form form={genForm} layout="vertical">
              <Form.Item name="title" label="课件主题" rules={[{ required: true }]}><Input placeholder="例如：高等数学-导数与微分" /></Form.Item>
              <Form.Item name="subject" label="所属科目" rules={[{ required: true }]}><Select options={[{ value: "数学", label: "数学" }, { value: "计算机", label: "计算机" }]} /></Form.Item>
              <Form.Item name="grade" label="适用年级"><Select options={[{ value: "大一", label: "大一" }, { value: "大二", label: "大二" }]} /></Form.Item>
              <Form.Item name="format" label="生成格式"><Select options={[{ value: "ppt", label: "PPT课件" }, { value: "document", label: "Word文档" }]} /></Form.Item>
              <Form.Item name="outline" label="知识大纲（可选）"><Input.TextArea rows={4} placeholder="输入教学知识点大纲，AI将据此生成课件内容" /></Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  )
}