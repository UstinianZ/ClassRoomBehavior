import { useNavigate } from 'react-router-dom'
import { SettingOutlined, MonitorOutlined } from '@ant-design/icons'
export default function TeachingHeader() {
  const navigate = useNavigate()
  return (
    <div className="teaching-header">
      <div className="header-left"><h3>AI智慧教学备课授课平台</h3></div>
      <div className="header-right">
        <div className="header-btn" onClick={() => navigate('/monitor/dashboard')}><MonitorOutlined /></div>
        <div className="header-btn" onClick={() => navigate('/admin/dashboard')}><SettingOutlined /></div>
        <div className="header-user"><div className="user-avatar">T</div><span className="user-name">教师张</span></div>
      </div>
    </div>
  )
}
