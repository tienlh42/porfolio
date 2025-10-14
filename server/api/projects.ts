export default defineEventHandler(() => {
    return [
        {
            id: 1,
            title: 'Realtime Notification Service',
            desc:
                'Hệ thống thông báo realtime sử dụng NATS (pub/sub) kết hợp Socket.io để đẩy thông báo tới client theo phòng/kênh, hỗ trợ lưu lịch sử, retry, và lập lịch tự động qua cron. ' +
                'Module xử lý bao gồm: persistence (MongoDB), dead-letter & retry policy, multi-tenant routing, và gateway tối ưu kết nối WebSocket. ' +
                'Kết quả: độ trễ P95 < 150ms ở 10k concurrent connections, dễ mở rộng theo chiều ngang.',
            duration: '6 min',
            author: 'Tien LH',
            rating: 4.8,
            tags: ['Realtime', 'NATS', 'Socket.io'],
            thumbnail_image: '/projects/default.png',
            // ảnh nằm trong /public/projects/...
            images: [
                '/projects/default.png',
                '/projects/default.png',
                '/projects/default.png',
                '/projects/default.png'
            ]
        },
        {
            id: 2,
            title: 'Recruitment Platform (Multi-tenant)',
            desc: 'Talent, Application, Plan, Campaign; import/export Excel.',
            duration: '10 min',
            author: 'Kaizen Team',
            rating: 4.6,
            tags: ['NestJS', 'MongoDB', 'NATS'],
            thumbnail_image: '/projects/default.png'
        },
        {
            id: 3,
            title: 'Steel Product Search',
            desc: 'Atlas Search: compound, fuzzy, phrase, facets.',
            duration: '8 min',
            author: 'Tien LH',
            rating: 4.7,
            tags: ['MongoDB', 'Search', 'E-commerce'],
            thumbnail_image: '/projects/default.png'
        },
        {
            id: 4,
            title: 'Call Center & VoIP System',
            desc: 'FusionPBX, FreeSWITCH, IVR, WebRTC, chatbot Flowise.',
            duration: '9 min',
            author: 'Kaizen Ops',
            rating: 4.5,
            tags: ['VoIP', 'IVR', 'WebRTC'],
            thumbnail_image: '/projects/default.png'
        },
        {
            id: 5,
            title: 'Student Management (Nuxt + Nest)',
            desc: 'Course, ExamSchedule, Tuition, QR payment, Interceptors.',
            duration: '7 min',
            author: 'School Dev',
            rating: 4.4,
            tags: ['Nuxt', 'NestJS', 'MongoDB'],
            thumbnail_image: '/projects/default.png'
        },
        {
            id: 6,
            title: 'Fitness WOD Tracker',
            desc: 'Firestore mapping workoutIds → data, DatePicker UI.',
            duration: '5 min',
            author: 'Coach Team',
            rating: 4.3,
            tags: ['React', 'Firestore', 'UX'],
            thumbnail_image: '/projects/default.png'
        }
    ]
})
