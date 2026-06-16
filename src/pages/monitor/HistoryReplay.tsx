import { useState } from "react"
import { Row, Col, Select, Button, Timeline, Empty, Slider } from "antd"
import { PlayCircleOutlined, PauseCircleOutlined, StepForwardOutlined, StepBackwardOutlined, CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons"
import MonitorSidebar from "../../components/monitor/Sidebar"
import MonitorHeader from "../../components/monitor/Header"
import { mockClassrooms } from "../../utils/mockData"
export default function HistoryReplay() {
  const [selected, setSelected] = useState(""); const [playing, setPlaying] = useState(false); const [progress, setProgress] = useState(0); const [speed, setSpeed] = useState(1)
  const onlineClassrooms = mockClassrooms.filter(c => c.status === "online")
  return (
    <div className="monitor-layout"><div className="monitor-sidebar"><MonitorSidebar /></div><div className="monitor-main"><MonitorHeader /><div className="monitor-content">
      <div className="page-header"><h2>历史录像回放</h2><p>回放指定教室的历史监控录像，支持倍速播放</p></div>
      <Row gutter={[16,16]}>
        <Col span={16}><div className="data-panel" style={{padding:0,overflow:"hidden"}}><div style={{aspectRatio:"16/9",background:"linear-gradient(135deg,#0a1628,#0d1f3c)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column"}}><CalendarOutlined style={{fontSize:48,color:"#1a3a6b",marginBottom:16}} /><div style={{color:"#5a6f8a"}}>{selected?"回放中 - "+onlineClassrooms.find(c=>c.id===selected)?.name:"请选择教室和日期开始回放"}</div></div>
        <div style={{padding:"12px 16px",borderTop:"1px solid var(--border-color)"}}><div className="flex-row gap-8" style={{marginBottom:8}}><Slider min={0} max={100} value={progress} onChange={setProgress} style={{flex:1}} disabled={!selected} /><span style={{color:"#5a6f8a",fontSize:12}}>{progress}%</span></div>
        <div className="flex-center gap-16"><Button shape="circle" icon={<StepBackwardOutlined />} disabled={!selected} /><Button shape="circle" size="large" type="primary" icon={playing?<PauseCircleOutlined />:<PlayCircleOutlined />} onClick={()=>setPlaying(!playing)} disabled={!selected} /><Button shape="circle" icon={<StepForwardOutlined />} disabled={!selected} /><Select value={speed} onChange={setSpeed} style={{width:80}} options={[{value:0.5,label:"0.5x"},{value:1,label:"1x"},{value:2,label:"2x"},{value:4,label:"4x"}]} /></div></div></div></Col>
        <Col span={8}><div className="data-panel"><div className="panel-title"><CalendarOutlined /> 选择回放记录</div>
        <div style={{marginBottom:12}}><div style={{color:"#5a6f8a",fontSize:12,marginBottom:4}}>选择教室</div><Select value={selected} onChange={setSelected} style={{width:"100%"}} placeholder="选择教室..." options={onlineClassrooms.map(c=>({value:c.id,label:c.name}))} /></div>
        <div style={{marginBottom:12}}><div style={{color:"#5a6f8a",fontSize:12,marginBottom:4}}>选择日期</div><input type="date" defaultValue="2026-06-16" style={{width:"100%",background:"rgba(10,22,40,0.6)",border:"1px solid #1a3a6b",borderRadius:6,padding:"6px 12px",color:"#e0e8f0"}} /></div>
        <Timeline items={selected?[{color:"#1677ff",children:<><div style={{color:"#e0e8f0"}}>14:00 - 15:30</div><div style={{color:"#8899bb",fontSize:12}}>高等数学（上）</div></>},{color:"#00e676",children:<><div style={{color:"#e0e8f0"}}>10:00 - 11:30</div><div style={{color:"#8899bb",fontSize:12}}>C语言程序设计</div></>}]:[]} />
        {!selected&&<Empty description="请先选择教室" />}</div></Col>
      </Row>
    </div></div></div>
  )
}