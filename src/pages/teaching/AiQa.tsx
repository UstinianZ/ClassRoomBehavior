import { useState } from "react"
import { Input, Button, Empty, Typography, Tag, Space } from "antd"
import { RobotOutlined, UserOutlined, SendOutlined, LikeOutlined, DislikeOutlined, CopyOutlined } from "@ant-design/icons"
import TeachingSidebar from "../../components/teaching/Sidebar"
import TeachingHeader from "../../components/teaching/Header"
const { TextArea } = Input; const { Text } = Typography
interface QaItem { id: string; question: string; answer: string; time: string; liked?: boolean }
export default function AiQa() {
  const [question, setQuestion] = useState("")
  const [qaList, setQaList] = useState<QaItem[]>([
    { id: "1", question: "请解释微积分中的极限概念", answer: "极限是微积分的基础概念。\n\n极限在导数、积分等概念中都有重要应用。", time: "2026-06-16 14:30", liked: true },
    { id: "2", question: "二叉树的中序遍历是什么？", answer: "二叉树的中序遍历（In-order Traversal）是指按照左子树到根节点到右子树的顺序遍历二叉树的所有节点。", time: "2026-06-16 14:00", liked: false },
  ])
  const [answering, setAnswering] = useState(false)
  const handleAsk = () => {
    if (!question.trim()) return; setAnswering(true)
    const newQ: QaItem = { id: "qa_" + Date.now(), question, answer: "正在分析您的问题，请稍候...", time: new Date().toLocaleString("zh-CN") }
    setQaList(prev => [newQ, ...prev]); setQuestion("")
    setTimeout(() => {
      setQaList(prev => prev.map(item => item.id === newQ.id ? { ...item, answer: "这是一个AI自动生成的回答。该问题涉及的知识点包括核心概念解释和关键定理应用。" } : item))
      setAnswering(false)
    }, 1500)
  }
  return (
    <div className="teaching-layout">
      <div className="teaching-sidebar"><TeachingSidebar /></div>
      <div className="teaching-main">
        <TeachingHeader />
        <div className="teaching-content">
          <div className="page-header"><h2>AI课堂答疑</h2><p>智能问答助手，支持学科知识解答、题目解析</p></div>
          <div style={{ display: "flex", gap: 16, height: "calc(100vh - 180px)" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div style={{ flex: 1, overflowY: "auto", marginBottom: 16 }}>
                {qaList.map(item => (
                  <div key={item.id} className="data-panel" style={{ marginBottom: 12, padding: 16 }}>
                    <div className="flex-row gap-8" style={{ marginBottom: 8 }}><UserOutlined style={{ color: "#1677ff" }} /><Text style={{ color: "#1677ff", fontWeight: 600 }}>问题</Text><span style={{ color: "#5a6f8a", fontSize: 12, marginLeft: "auto" }}>{item.time}</span></div>
                    <div style={{ color: "#e0e8f0", marginBottom: 12, paddingLeft: 24 }}>{item.question}</div>
                    <div className="flex-row gap-8" style={{ marginBottom: 8 }}><RobotOutlined style={{ color: "#00d4ff" }} /><Text style={{ color: "#00d4ff", fontWeight: 600 }}>AI回答</Text></div>
                    <div style={{ color: "#e0e8f0", paddingLeft: 24, whiteSpace: "pre-wrap", lineHeight: 1.8 }}>{item.answer}</div>
                  </div>
                ))}
                {qaList.length === 0 && <Empty description="暂无问答记录" />}
              </div>
              <div className="flex-row gap-8">
                <TextArea value={question} onChange={e => setQuestion(e.target.value)} placeholder="输入你的问题..." rows={2} style={{ flex: 1 }} onPressEnter={handleAsk} />
                <Button type="primary" icon={<SendOutlined />} onClick={handleAsk} loading={answering} style={{ height: 54 }}>提问</Button>
              </div>
            </div>
            <div className="data-panel" style={{ width: 260, flexShrink: 0 }}>
              <div className="panel-title">热门学科</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{"高等数学,线性代数,C语言,数据结构,大学物理,大学英语".split(",").map(s => <Tag key={s} color="#1677ff" style={{ cursor: "pointer", margin: 0 }}>{s}</Tag>)}</div>
              <div className="panel-title mt-16">常见问题</div>
              {"什么是极限？,如何理解递归？,TCP/IP协议栈,矩阵乘法规则".split(",").map((q, i) => (<div key={i} style={{ padding: "8px 0", cursor: "pointer", color: "#8899bb", fontSize: 13, borderBottom: "1px solid rgba(26,58,107,0.3)" }} onClick={() => setQuestion(q)}>{q}</div>))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
