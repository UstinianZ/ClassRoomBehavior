import type {
  ClassroomDevice, AlertEvent, AlertStats, SystemUser,
  Courseware, MicroCourse, Course, Homework, Exam, ScoreDistribution,
  StudentPerformance, BehaviorCount, Notification
} from '../types';

export const mockClassrooms: ClassroomDevice[] = [
  { id: 'c01', name: '教学楼A-101', building: '教学楼A', floor: 1, room: '101', status: 'online', cameraCount: 2, studentCount: 45, lastActive: '2026-06-16 14:30:25' },
  { id: 'c02', name: '教学楼A-102', building: '教学楼A', floor: 1, room: '102', status: 'online', cameraCount: 2, studentCount: 38, lastActive: '2026-06-16 14:29:10' },
  { id: 'c03', name: '教学楼A-201', building: '教学楼A', floor: 2, room: '201', status: 'online', cameraCount: 2, studentCount: 42, lastActive: '2026-06-16 14:30:01' },
  { id: 'c04', name: '教学楼A-202', building: '教学楼A', floor: 2, room: '202', status: 'warning', cameraCount: 2, studentCount: 36, lastActive: '2026-06-16 14:28:55' },
  { id: 'c05', name: '教学楼B-101', building: '教学楼B', floor: 1, room: '101', status: 'offline', cameraCount: 2, studentCount: 0, lastActive: '2026-06-15 17:00:00' },
  { id: 'c06', name: '教学楼B-102', building: '教学楼B', floor: 1, room: '102', status: 'online', cameraCount: 2, studentCount: 50, lastActive: '2026-06-16 14:30:22' },
  { id: 'c07', name: '教学楼B-201', building: '教学楼B', floor: 2, room: '201', status: 'online', cameraCount: 3, studentCount: 44, lastActive: '2026-06-16 14:30:18' },
  { id: 'c08', name: '教学楼B-202', building: '教学楼B', floor: 2, room: '202', status: 'online', cameraCount: 2, studentCount: 40, lastActive: '2026-06-16 14:29:45' },
  { id: 'c09', name: '实验楼C-101', building: '实验楼C', floor: 1, room: '101', status: 'online', cameraCount: 2, studentCount: 30, lastActive: '2026-06-16 14:30:05' },
  { id: 'c10', name: '实验楼C-102', building: '实验楼C', floor: 1, room: '102', status: 'offline', cameraCount: 2, studentCount: 0, lastActive: '2026-06-15 16:30:00' },
  { id: 'c11', name: '实验楼C-201', building: '实验楼C', floor: 2, room: '201', status: 'online', cameraCount: 2, studentCount: 35, lastActive: '2026-06-16 14:28:30' },
  { id: 'c12', name: '实验楼C-202', building: '实验楼C', floor: 2, room: '202', status: 'warning', cameraCount: 2, studentCount: 28, lastActive: '2026-06-16 14:27:15' },
  { id: 'c13', name: '综合楼D-101', building: '综合楼D', floor: 1, room: '101', status: 'online', cameraCount: 3, studentCount: 60, lastActive: '2026-06-16 14:30:30' },
  { id: 'c14', name: '综合楼D-102', building: '综合楼D', floor: 1, room: '102', status: 'online', cameraCount: 2, studentCount: 48, lastActive: '2026-06-16 14:29:50' },
  { id: 'c15', name: '综合楼D-201', building: '综合楼D', floor: 2, room: '201', status: 'online', cameraCount: 2, studentCount: 55, lastActive: '2026-06-16 14:30:12' },
];

const alertTypes: { type: AlertEvent['type']; label: string }[] = [
  { type: 'sleeping', label: '学生睡觉' },
  { type: 'head_down', label: '学生低头' },
  { type: 'fighting', label: '学生打闹' },
  { type: 'no_teacher', label: '无人上课' },
  { type: 'crowd', label: '人员聚集' },
];

const getRandomAlert = (id: number, classroom: ClassroomDevice): AlertEvent => {
  const at = alertTypes[Math.floor(Math.random() * alertTypes.length)];
  return {
    id: `alert_${id}`,
    classroomId: classroom.id,
    classroomName: classroom.name,
    type: at.type,
    severity: Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low',
    description: `${classroom.name} 检测到${at.label}行为`,
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    snapshotUrl: '',
    status: Math.random() > 0.7 ? 'resolved' : Math.random() > 0.4 ? 'confirmed' : 'pending',
  };
};

export const mockAlerts: AlertEvent[] = [];
for (let i = 0; i < 50; i++) {
  const c = mockClassrooms[Math.floor(Math.random() * mockClassrooms.length)];
  if (c.status === 'online') mockAlerts.push(getRandomAlert(i, c));
}

export const mockAlertStats: AlertStats = {
  todayTotal: 23,
  pendingCount: 8,
  resolvedCount: 12,
  hourlyTrend: [1, 0, 2, 3, 1, 4, 2, 5, 3, 1, 0, 1, 0, 0, 2, 3, 4, 2, 1, 0, 0, 1, 2, 1],
  typeDistribution: [
    { type: '学生睡觉', count: 8 },
    { type: '学生低头', count: 12 },
    { type: '学生打闹', count: 1 },
    { type: '无人上课', count: 0 },
    { type: '人员聚集', count: 2 },
  ],
  topClassrooms: [
    { name: '教学楼A-101', count: 5 },
    { name: '教学楼B-102', count: 4 },
    { name: '实验楼C-201', count: 3 },
    { name: '教学楼A-201', count: 3 },
    { name: '综合楼D-101', count: 2 },
  ],
};

export const mockUsers: SystemUser[] = [
  { id: 'u1', username: 'admin', name: '系统管理员', role: 'admin', avatar: '', classrooms: [], status: 'active' },
  { id: 'u2', username: 'zhang', name: '张老师', role: 'teacher', avatar: '', classrooms: ['c01', 'c02', 'c03'], status: 'active' },
  { id: 'u3', username: 'li', name: '李老师', role: 'teacher', avatar: '', classrooms: ['c06', 'c07'], status: 'active' },
  { id: 'u4', username: 'wang', name: '王老师', role: 'teacher', avatar: '', classrooms: ['c09', 'c10', 'c11'], status: 'active' },
];

export const mockCoursewares: Courseware[] = [
  { id: 'cw1', title: '高等数学-微积分基础', subject: '数学', grade: '大一', type: 'ppt', createdAt: '2026-06-10', creator: '张老师', size: '12.5MB', downloads: 156 },
  { id: 'cw2', title: '大学英语-阅读理解', subject: '英语', grade: '大二', type: 'document', createdAt: '2026-06-09', creator: '李老师', size: '5.2MB', downloads: 98 },
  { id: 'cw3', title: '数据结构-二叉树', subject: '计算机', grade: '大二', type: 'video', createdAt: '2026-06-08', creator: '王老师', size: '45.8MB', downloads: 210 },
  { id: 'cw4', title: '计算机网络-TCP/IP协议', subject: '计算机', grade: '大三', type: 'ppt', createdAt: '2026-06-07', creator: '张老师', size: '18.3MB', downloads: 167 },
  { id: 'cw5', title: '线性代数-矩阵运算', subject: '数学', grade: '大一', type: 'quiz', createdAt: '2026-06-06', creator: '李老师', size: '2.1MB', downloads: 89 },
  { id: 'cw6', title: '大学物理-力学基础', subject: '物理', grade: '大一', type: 'ppt', createdAt: '2026-06-05', creator: '王老师', size: '22.6MB', downloads: 134 },
  { id: 'cw7', title: 'C语言程序设计-指针', subject: '计算机', grade: '大一', type: 'video', createdAt: '2026-06-04', creator: '张老师', size: '56.4MB', downloads: 278 },
  { id: 'cw8', title: '概率论与数理统计', subject: '数学', grade: '大二', type: 'document', createdAt: '2026-06-03', creator: '李老师', size: '8.9MB', downloads: 112 },
];

export const mockMicroCourses: MicroCourse[] = [
  { id: 'mc1', title: 'Python入门-变量与数据类型', subject: '计算机', teacher: '张老师', duration: '15:30', views: 2340, coverUrl: '', createdAt: '2026-06-01', tags: ['Python', '编程基础'] },
  { id: 'mc2', title: '英语四级-听力技巧', subject: '英语', teacher: '李老师', duration: '22:15', views: 1890, coverUrl: '', createdAt: '2026-05-28', tags: ['英语四级', '听力'] },
  { id: 'mc3', title: '高等数学-极限求解', subject: '数学', teacher: '王老师', duration: '18:45', views: 3120, coverUrl: '', createdAt: '2026-05-25', tags: ['高数', '极限'] },
  { id: 'mc4', title: '数据结构入门-栈与队列', subject: '计算机', teacher: '张老师', duration: '20:00', views: 1560, coverUrl: '', createdAt: '2026-05-22', tags: ['数据结构', '栈队列'] },
  { id: 'mc5', title: '大学物理-牛顿定律', subject: '物理', teacher: '李老师', duration: '25:30', views: 980, coverUrl: '', createdAt: '2026-05-20', tags: ['物理', '力学'] },
];

export const mockCourses: Course[] = [
  { id: 'cs1', name: '高等数学（上）', teacher: '张老师', schedule: '周一 1-2节', classroom: '教学楼A-101', students: 45, status: 'ongoing' },
  { id: 'cs2', name: '大学英语（二）', teacher: '李老师', schedule: '周一 3-4节', classroom: '教学楼B-102', students: 50, status: 'ongoing' },
  { id: 'cs3', name: '数据结构', teacher: '王老师', schedule: '周二 1-2节', classroom: '实验楼C-201', students: 35, status: 'ongoing' },
  { id: 'cs4', name: 'C语言程序设计', teacher: '张老师', schedule: '周三 1-2节', classroom: '教学楼A-102', students: 38, status: 'ongoing' },
  { id: 'cs5', name: '线性代数', teacher: '李老师', schedule: '周四 3-4节', classroom: '教学楼B-201', students: 44, status: 'upcoming' },
  { id: 'cs6', name: '大学物理', teacher: '王老师', schedule: '周五 1-2节', classroom: '综合楼D-101', students: 60, status: 'finished' },
];

export const mockHomeworks: Homework[] = [
  { id: 'hw1', title: '微积分章节练习', course: '高等数学（上）', assignedDate: '2026-06-10', dueDate: '2026-06-17', submittedCount: 38, totalCount: 45, avgScore: 82, status: 'active' },
  { id: 'hw2', title: '英语阅读理解练习', course: '大学英语（二）', assignedDate: '2026-06-09', dueDate: '2026-06-16', submittedCount: 42, totalCount: 50, avgScore: 78, status: 'grading' },
  { id: 'hw3', title: '二叉树遍历实验', course: '数据结构', assignedDate: '2026-06-08', dueDate: '2026-06-15', submittedCount: 30, totalCount: 35, avgScore: 85, status: 'grading' },
  { id: 'hw4', title: '指针与数组练习', course: 'C语言程序设计', assignedDate: '2026-06-05', dueDate: '2026-06-12', submittedCount: 38, totalCount: 38, avgScore: 88, status: 'completed' },
  { id: 'hw5', title: '矩阵运算练习', course: '线性代数', assignedDate: '2026-06-03', dueDate: '2026-06-10', submittedCount: 40, totalCount: 44, avgScore: 76, status: 'completed' },
];

export const mockExams: Exam[] = [
  { id: 'ex1', title: '高等数学期中考试', course: '高等数学（上）', date: '2026-05-20', totalStudents: 45, gradedCount: 45, avgScore: 74, maxScore: 98, minScore: 32, status: 'completed' },
  { id: 'ex2', title: '数据结构单元测试', course: '数据结构', date: '2026-05-15', totalStudents: 35, gradedCount: 35, avgScore: 80, maxScore: 100, minScore: 45, status: 'completed' },
  { id: 'ex3', title: '英语词汇测验', course: '大学英语（二）', date: '2026-06-18', totalStudents: 50, gradedCount: 0, avgScore: 0, maxScore: 0, minScore: 0, status: 'upcoming' },
  { id: 'ex4', title: 'C语言上机考试', course: 'C语言程序设计', date: '2026-05-25', totalStudents: 38, gradedCount: 38, avgScore: 82, maxScore: 100, minScore: 28, status: 'completed' },
  { id: 'ex5', title: '高等数学期末考试', course: '高等数学（上）', date: '2026-07-05', totalStudents: 45, gradedCount: 0, avgScore: 0, maxScore: 0, minScore: 0, status: 'upcoming' },
];

export const mockScoreDistribution: ScoreDistribution[] = [
  { range: '90-100', count: 8, percentage: 17.8 },
  { range: '80-89', count: 12, percentage: 26.7 },
  { range: '70-79', count: 10, percentage: 22.2 },
  { range: '60-69', count: 9, percentage: 20.0 },
  { range: '0-59', count: 6, percentage: 13.3 },
];

export const mockStudentPerformances: StudentPerformance[] = [
  { studentId: 's001', name: '张三', className: '计算机1班', attendance: 95, homeworkScore: 88, examScore: 92, participation: 85, attentionTrend: [75, 80, 85, 82, 88, 90, 92] },
  { studentId: 's002', name: '李四', className: '计算机1班', attendance: 98, homeworkScore: 92, examScore: 95, participation: 90, attentionTrend: [80, 82, 88, 90, 92, 94, 95] },
  { studentId: 's003', name: '王五', className: '计算机1班', attendance: 85, homeworkScore: 75, examScore: 68, participation: 70, attentionTrend: [70, 72, 65, 68, 72, 75, 68] },
  { studentId: 's004', name: '赵六', className: '计算机1班', attendance: 92, homeworkScore: 85, examScore: 78, participation: 80, attentionTrend: [78, 80, 75, 82, 80, 85, 78] },
  { studentId: 's005', name: '孙七', className: '计算机1班', attendance: 88, homeworkScore: 80, examScore: 85, participation: 75, attentionTrend: [65, 70, 75, 78, 82, 85, 85] },
  { studentId: 's006', name: '周八', className: '计算机2班', attendance: 96, homeworkScore: 95, examScore: 97, participation: 92, attentionTrend: [85, 88, 90, 92, 95, 97, 97] },
  { studentId: 's007', name: '吴九', className: '计算机2班', attendance: 80, homeworkScore: 70, examScore: 65, participation: 60, attentionTrend: [55, 60, 58, 62, 65, 68, 65] },
  { studentId: 's008', name: '郑十', className: '计算机2班', attendance: 90, homeworkScore: 82, examScore: 88, participation: 85, attentionTrend: [72, 78, 80, 82, 85, 88, 88] },
];

export const mockNotifications: Notification[] = [
  { id: 'n1', type: 'alert', title: '告警：教学楼A-101 检测到学生睡觉', content: '教学楼A-101教室第3排2号座位学生疑似睡觉，已自动截图', timestamp: '2026-06-16 14:25:00', read: false },
  { id: 'n2', type: 'alert', title: '告警：实验楼C-201 检测到人员聚集', content: '实验楼C-201教室后部检测到5人以上聚集，请关注', timestamp: '2026-06-16 14:20:00', read: false },
  { id: 'n3', type: 'warning', title: '教学楼A-102设备离线', content: '教学楼A-102教室摄像头2号信号中断，请检查网络连接', timestamp: '2026-06-16 14:15:00', read: false },
  { id: 'n4', type: 'info', title: '系统自动批阅完成', content: '《数据结构》作业"二叉树遍历实验"已自动批阅完成，可查看结果', timestamp: '2026-06-16 14:00:00', read: false },
  { id: 'n5', type: 'alert', title: '告警：教学楼B-102 检测到学生睡觉', content: '教学楼B-102教室第5排1号座位学生疑似睡觉，已自动截图', timestamp: '2026-06-16 13:50:00', read: true },
];

export const mockBehaviors: BehaviorCount[] = [
  { type: 'sleeping', label: '学生睡觉', count: 3 },
  { type: 'head_down', label: '学生低头', count: 8 },
  { type: 'fighting', label: '学生打闹', count: 0 },
  { type: 'no_teacher', label: '无人上课', count: 0 },
  { type: 'crowd', label: '人员聚集', count: 1 },
];

export const videoWallMock = [
  { id: 'v1', classroom: '教学楼A-101', status: 'online', teacher: '张老师', subject: '高等数学', studentCount: 45, attentionRate: 92 },
  { id: 'v2', classroom: '教学楼A-102', status: 'online', teacher: '刘老师', subject: '大学物理', studentCount: 38, attentionRate: 85 },
  { id: 'v3', classroom: '教学楼B-101', status: 'offline', teacher: '', subject: '', studentCount: 0, attentionRate: 0 },
  { id: 'v4', classroom: '教学楼B-102', status: 'online', teacher: '李老师', subject: '大学英语', studentCount: 50, attentionRate: 78 },
  { id: 'v5', classroom: '实验楼C-101', status: 'online', teacher: '王老师', subject: '数据结构', studentCount: 30, attentionRate: 88 },
  { id: 'v6', classroom: '实验楼C-201', status: 'online', teacher: '陈老师', subject: 'C语言程序设计', studentCount: 35, attentionRate: 72 },
  { id: 'v7', classroom: '综合楼D-101', status: 'online', teacher: '赵老师', subject: '线性代数', studentCount: 60, attentionRate: 90 },
  { id: 'v8', classroom: '综合楼D-102', status: 'online', teacher: '周老师', subject: '概率统计', studentCount: 48, attentionRate: 82 },
  { id: 'v9', classroom: '教学楼A-201', status: 'online', teacher: '吴老师', subject: '马克思主义哲学', studentCount: 42, attentionRate: 76 },
  { id: 'v10', classroom: '教学楼B-201', status: 'online', teacher: '郑老师', subject: '体育理论', studentCount: 44, attentionRate: 88 },
  { id: 'v11', classroom: '实验楼C-202', status: 'warning', teacher: '孙老师', subject: '数字电路', studentCount: 28, attentionRate: 65 },
  { id: 'v12', classroom: '综合楼D-201', status: 'online', teacher: '钱老师', subject: '计算机网络', studentCount: 55, attentionRate: 80 },
  { id: 'v13', classroom: '教学楼A-202', status: 'warning', teacher: '黄老师', subject: '软件工程', studentCount: 36, attentionRate: 70 },
  { id: 'v14', classroom: '教学楼B-202', status: 'online', teacher: '许老师', subject: '操作系统', studentCount: 40, attentionRate: 86 },
  { id: 'v15', classroom: '实验楼C-102', status: 'offline', teacher: '', subject: '', studentCount: 0, attentionRate: 0 },
  { id: 'v16', classroom: '综合楼D-202', status: 'online', teacher: '何老师', subject: '人工智能导论', studentCount: 35, attentionRate: 94 },
];
