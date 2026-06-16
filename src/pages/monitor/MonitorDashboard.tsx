import { useState, useCallback, useEffect } from 'react'
import { Input, Tag, Badge, message } from 'antd'
import { SearchOutlined, VideoCameraOutlined, WarningOutlined, CloseOutlined } from '@ant-design/icons'
import MonitorSidebar from '../../components/monitor/Sidebar'
import MonitorHeader from '../../components/monitor/Header'
import { videoWallMock, mockAlerts, mockClassrooms, mockBehaviors } from '../../utils/mockData'

const { Search } = Input

export default function MonitorDashboard() {
  const [gridSize, setGridSize] = useState<'4' | '9' | '16'>('4')
  const [searchText, setSearchText] = useState('')
  const [floatingAlerts, setFloatingAlerts] = useState<typeof mockAlerts>([])
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(null)

  const recentAlerts = mockAlerts.filter(a => a.status === 'pending').slice(0, 10)

  useEffect(() => {
    const interval = setInterval(() => {
      if (recentAlerts.length > 0) {
        const randomAlert = recentAlerts[Math.floor(Math.random() * recentAlerts.length)]
        setFloatingAlerts(prev => {
          const updated = [{ ...randomAlert, id: `float_${Date.now()}` }, ...prev]
          return updated.slice(0, 3)
        })
      }
    }, 15000)
    return () => clearInterval(interval)
  }, [recentAlerts])

  const dismissAlert = useCallback((id: string) => {
    setFloatingAlerts(prev => prev.filter(a => a.id !== id))
  }, [])

  const filteredVideos = videoWallMock.filter(v =>
    v.classroom.toLowerCase().includes(searchText.toLowerCase())
  )

  const displayVideos = gridSize === '4' ? filteredVideos.slice(0, 4)
    : gridSize === '9' ? filteredVideos.slice(0, 9)
    : filteredVideos.slice(0, 16)

  const getAttentionClass = (rate: number) => {
    if (rate >= 85) return 'attention-high'
    if (rate >= 70) return 'attention-mid'
    return 'attention-low'
  }

  return (
    <div className="monitor-layout">
      <div className="monitor-sidebar">
        <MonitorSidebar />
        <div className="glow-line" />
        <div style={{ padding: '12px 16px' }}>
          <Search
            placeholder="搜索教室..."
            prefix={<SearchOutlined style={{ color: '#5a6f8a' }} />}
            onChange={e => setSearchText(e.target.value)}
            style={{ background: 'transparent' }}
          />
        </div>
        <div style={{ padding: '0 12px', marginBottom: 8 }}>
          <div className="flex-between" style={{ padding: '0 4px', marginBottom: 8 }}>
            <span style={{ color: '#5a6f8a', fontSize: 12 }}>教室设备列表</span>
            <span style={{ color: '#00e676', fontSize: 12 }}>
              <span className="status-dot online" /> {mockClassrooms.filter(c => c.status === 'online').length} 在线
            </span>
          </div>
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {mockClassrooms.map(c => (
              <div
                key={c.id}
                className={`classroom-item ${selectedClassroom === c.id ? 'active' : ''}`}
                onClick={() => setSelectedClassroom(c.id)}
              >
                <span className={`status-dot ${c.status}`} />
                <div style={{ flex: 1 }}>
                  <div className="class-name">{c.name}</div>
                  <div className="class-detail">{c.studentCount}人 · {c.cameraCount}路</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ padding: '0 16px' }}>
          <div style={{ fontSize: 12, color: '#5a6f8a', marginBottom: 8 }}>实时AI行为分析</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {mockBehaviors.map(b => (
              <Tag key={b.type} color={b.count > 0 ? '#ff1744' : '#1a3a6b'} style={{ margin: 0 }}>
                {b.label}: {b.count}
              </Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="monitor-main">
        <MonitorHeader />
        <div className="monitor-content" style={{ position: 'relative' }}>
          <div className="flex-between mb-8">
            <div className="flex-row gap-8">
              <span style={{ color: '#5a6f8a', fontSize: 13 }}>分屏布局:</span>
              <div className="layout-switch-btn">
                {(['4', '9', '16'] as const).map(s => (
                  <button key={s} className={gridSize === s ? 'active' : ''} onClick={() => setGridSize(s)}>
                    {s}分格
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#5a6f8a' }}>
                <span className="status-dot online" /> 在线 <span style={{ color: '#00e676', fontWeight: 600 }}>{mockClassrooms.filter(c => c.status === 'online').length}</span>
              </span>
              <span style={{ fontSize: 12, color: '#5a6f8a' }}>
                <span className="status-dot warning" /> 告警 <span style={{ color: '#ff9100', fontWeight: 600 }}>{mockAlerts.filter(a => a.status === 'pending').length}</span>
              </span>
              <span style={{ fontSize: 12, color: '#5a6f8a' }}>
                <span className="status-dot offline" /> 离线 <span style={{ color: '#5a6f8a', fontWeight: 600 }}>{mockClassrooms.filter(c => c.status === 'offline').length}</span>
              </span>
            </div>
          </div>

          <div className={`video-grid grid-${gridSize}`}>
            {displayVideos.map(v => (
              <div key={v.id} className={`video-cell ${v.status}`}>
                <div className="video-preview">
                  <div className="camera-overlay">
                    <div className="flex-row gap-8">
                      <VideoCameraOutlined style={{ fontSize: 24, color: v.status === 'online' ? '#1677ff' : '#5a6f8a' }} />
                      <span className="cam-label">{v.status === 'online' ? '实时画面' : v.status === 'warning' ? '信号异常' : '设备离线'}</span>
                    </div>
                  </div>
                  {v.status === 'online' && <div className="recording-dot" />}
                  <div className="ai-analysis-badge">
                    <WarningOutlined style={{ fontSize: 10 }} /> 专注度
                    <span className={getAttentionClass(v.attentionRate)}>{v.attentionRate}%</span>
                  </div>
                </div>
                <div className="video-info">
                  <div>
                    <div className="room-name">{v.classroom}</div>
                  </div>
                  <div className={`status-${v.status}`}>
                    {v.status === 'online' && `${v.studentCount}人`}
                    {v.status === 'offline' && '离线'}
                    {v.status === 'warning' && '⚠ ' + mockAlerts.filter(a => a.classroomName === v.classroom && a.status === 'pending').length + '告警'}
                  </div>
                  <div style={{ fontSize: 11, color: '#5a6f8a', textAlign: 'right' }}>
                    <div>{v.teacher || '—'}</div>
                    <div>{v.subject || '—'}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Floating alert toasts */}
          <div className="alert-toast-container">
            {floatingAlerts.map(alert => (
              <div key={alert.id} className="alert-panel alert-floating-enter" style={{ background: 'rgba(15, 31, 61, 0.97)', borderLeft: '3px solid #ff1744', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div className="flex-row gap-8" style={{ marginBottom: 4 }}>
                    <WarningOutlined style={{ color: '#ff1744' }} />
                    <span style={{ color: '#ff1744', fontSize: 12, fontWeight: 600 }}>AI告警</span>
                  </div>
                  <div style={{ color: '#e0e8f0', fontSize: 13 }}>{alert.description}</div>
                  <div style={{ color: '#5a6f8a', fontSize: 11, marginTop: 4 }}>{alert.timestamp}</div>
                </div>
                <CloseOutlined style={{ color: '#5a6f8a', cursor: 'pointer', fontSize: 12 }} onClick={() => dismissAlert(alert.id)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
