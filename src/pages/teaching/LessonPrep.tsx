import { Row, Col, Input, Button, Tabs, List } from "antd"
import { EditOutlined, RobotOutlined, StarOutlined, ReloadOutlined } from "@ant-design/icons"
import TeachingSidebar from "../../components/teaching/Sidebar"
import TeachingHeader from "../../components/teaching/Header"
export default function LessonPrep() {
  return (
    <div className="teaching-layout">
      <div className="teaching-sidebar"><TeachingSidebar /></div>
      <div className="teaching-main">
        <TeachingHeader />
        <div className="teaching-content">
          <div className="page-header"><h2>备课助手</h2><p>AI辅助备课，智能推荐教学资源与教案模板</p></div>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <div className="data-panel">
                <div className="panel-title"><RobotOutlined /> AI备课建议</div>
                <div style={{ marginBottom: 16, background: "rgba(22,119,255,0.1)", border: "1px solid rgba(22,119,255,0.3)", borderRadius: 8, padding: 12 }}>
                  <div style={{ color: "#00d4ff", fontSize: 13, marginBottom: 4 }}>推荐教案主题</div>
                  <div style={{ color: "#e0e8f0", fontSize: 13 }}>基于您最近的教学进度，推荐准备"微分中值定理"和"泰勒公式"的教案</div>
                </div>
                <List dataSource={[{ title: "课件推荐", desc: "高等数学-微分中值定理 PPT" }, { title: "习题推荐", desc: "微分中值定理专项练习" }, { title: "视频推荐", desc: "微积分可视化讲解视频" }]} renderItem={item => (<List.Item style={{ borderBottom: "1px solid rgba(26,58,107,0.3)", padding: "10px 0" }}><List.Item.Meta title={<span style={{ color: "#e0e8f0", fontSize: 13 }}>{item.title}</span>} description={<span style={{ color: "#8899bb", fontSize: 12 }}>{item.desc}</span>} /></List.Item>)} />
              </div>
            </Col>
            <Col span={16}>
              <div className="data-panel" style={{ minHeight: 400 }}>
                <div className="panel-title"><EditOutlined /> 备课编辑器</div>
                <Tabs defaultActiveKey="1" items={[{ key: "1", label: "教案内容", children: <Input.TextArea rows={12} placeholder="在此编写教案内容...可使用Markdown格式，或点击AI辅助生成快速创建教案框架" style={{ background: "rgba(10,22,40,0.6)", color: "#e0e8f0", borderColor: "#1a3a6b" }} /> }, { key: "2", label: "课件大纲", children: <div style={{ color: "#8899bb" }}>课件大纲将在此展示</div> }]} />
                <div className="flex-row gap-8" style={{ marginTop: 16 }}><Button type="primary" icon={<RobotOutlined />}>AI辅助生成</Button><Button icon={<StarOutlined />}>保存为模板</Button><Button icon={<ReloadOutlined />}>重置</Button></div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
