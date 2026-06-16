import { Row, Col, Button, Tag, Space } from "antd"
import { VideoCameraOutlined, PlayCircleOutlined, PauseCircleOutlined, SoundOutlined, MessageOutlined, ShareAltOutlined, FullscreenOutlined } from "@ant-design/icons"
import TeachingSidebar from "../../components/teaching/Sidebar"
import TeachingHeader from "../../components/teaching/Header"
import { mockCourses } from "../../utils/mockData"
import { useState } from "react"
export default function LiveTeaching() {
  const [isLive, setIsLive] = useState(false)
  return (
    <div className="teaching-layout">
      <div className="teaching-sidebar"><TeachingSidebar /></div>
      <div className="teaching-main">
        <TeachingHeader />
        <div className="teaching-content">
          <div className="page-header"><h2>线上直播授课</h2><p>支持实时互动、屏幕共享、在线答疑</p></div>
          <Row gutter={[16, 16]}>
            <Col span={16}>
              <div className="data-panel" style={{ padding: 0, overflow: "hidden" }}>
                <div style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, #0a1628, #0d1f3c)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <VideoCameraOutlined style={{ fontSize: 64, color: "#1a3a6b", marginBottom: 16 }} />
                  <div style={{ color: "#5a6f8a", fontSize: 16, marginBottom: 24 }}>{isLive ? "直播中 - 高等数学" : "点击下方按钮开始直播"}</div>
                  {isLive && <div className="recording-dot" style={{ top: 16, left: 16, width: 12, height: 12 }} />}
                  <div style={{ display: "flex", gap: 12 }}>
                    <Button type="primary" size="large" icon={isLive ? <PauseCircleOutlined /> : <PlayCircleOutlined />} onClick={() => setIsLive(!isLive)}>{isLive ? "结束直播" : "开始直播"}</Button>
                    <Button size="large" icon={<SoundOutlined />} disabled={!isLive}>麦克风</Button>
                    <Button size="large" icon={<ShareAltOutlined />} disabled={!isLive}>共享屏幕</Button>
                    <Button size="large" icon={<FullscreenOutlined />} disabled={!isLive}>全屏</Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={8}>
              <div className="data-panel" style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                <div className="panel-title"><MessageOutlined /> 互动消息</div>
                <div style={{ flex: 1, overflowY: "auto", marginBottom: 12 }}>
                  {[{ name: "张三", msg: "老师，这个极限怎么求？", time: "14:32" }, { name: "李四", msg: "明白了，谢谢老师！", time: "14:30" }].map((m, i) => (
                    <div key={i} style={{ padding: "8px 0", borderBottom: "1px solid rgba(26,58,107,0.3)" }}>
                      <div className="flex-row gap-8"><span style={{ color: "#1677ff", fontWeight: 600, fontSize: 12 }}>{m.name}</span><span style={{ color: "#5a6f8a", fontSize: 11, marginLeft: "auto" }}>{m.time}</span></div>
                      <div style={{ color: "#8899bb", fontSize: 13 }}>{m.msg}</div>
                    </div>
                  ))}
                </div>
                <input placeholder="输入消息..." style={{ background: "rgba(10,22,40,0.6)", border: "1px solid #1a3a6b", borderRadius: 6, padding: "8px 12px", color: "#e0e8f0", outline: "none", width: "100%" }} />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
