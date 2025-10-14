<template>

    <div class="relative scroll-smooth">
        <!-- Floating Menu -->
        <nav class="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
            <button v-for="section in sections" :key="section.id" @click="scrollTo(section.id)"
                class="w-3 h-3 rounded-full transition-all duration-300" :class="[
                    activeSection === section.id
                        ? 'bg-blue-500 scale-125 shadow-md'
                        : 'bg-gray-400 dark:bg-gray-600 hover:bg-blue-300'
                ]"></button>
        </nav>
        <!-- Sections -->
        <IntroduceHeroSection ref="heroRef" :intro="aboutData.intro" />
        <IntroduceStrengthsSection ref="strengthsRef" :strengths="aboutData.strengths" data-section="strengths" />
        <IntroduceMissionSection ref="missionRef" :mission="aboutData.mission" data-section="mission" />
        <IntroduceAchievementsSection ref="achievementsRef" :achievements="aboutData.achievements"
            data-section="achievements" />
        <IntroducePhilosophySection ref="philosophyRef" :philosophy="aboutData.philosophy" data-section="philosophy" />
        <IntroduceSnapshotSection ref="snapshotRef" :snapshot="aboutData.snapshot" data-section="snapshot" />
    </div>
</template>

<script setup>
const sections = [
    { id: 'hero', label: 'Intro' },
    { id: 'strengths', label: 'Strengths' },
    { id: 'mission', label: 'Mission' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'snapshot', label: 'Snapshot' },
]
const activeSection = ref('hero')
const sectionRefs = ref({})

onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute('data-section')
                if (entry.isIntersecting) {
                    activeSection.value = id
                    // nếu section đó có hàm animate thì gọi
                    entry.target.__animate?.()
                }
            })
        },
        { threshold: 0.4 }
    )

    // gán observer cho tất cả section
    document.querySelectorAll('[data-section]').forEach((el) => observer.observe(el))
})

const scrollTo = (id) => {
    const el = document.querySelector(`[data-section="${id}"]`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}




const aboutData = {
    intro: {
        title: "Hi, I'm Le Hai Tien",
        description:
            "I'm a full-stack developer with a strong focus on building scalable web systems using Node.js and Vue.js. My background combines software engineering and cloud infrastructure.",
        techStack: [
            "JavaScript", "TypeScript", "Python", "Java",

            "Vue", "Nuxt", "React", "NextJs",
            "Tailwind CSS", "Quasar",
            "Pinia", "Redux", "HTML", "CSS",

            "Node.js", "NestJS", "Express",
            "Spring Boot", "Django", "Flask",
            "GraphQL",

            "PostgreSQL", "MongoDB", "Redis", "MySQL",
            "Elasticsearch", "Firebase Firestore", "Prisma ORM",

        ]
    },
    strengths: {
        title: "What I Do Best",
        points: [
            "Optimizing backend performance & API design.",
            "Building scalable microservice architectures.",
            "Automating CI/CD pipelines with GitHub Actions and Docker.",
            "Automating CI/CD pipelines with GitHub Actions and Docker.",
            "Automating CI/CD pipelines with GitHub Actions and Docker.",
            "Automating CI/CD pipelines with GitHub Actions and Docker.",

        ],
    },
    mission: {
        title: "Mission & Direction",
        description:
            "Currently, I’m focusing on backend and DevOps, aiming to become a Cloud-native Solution Architect with strong security principles.",
    },
    achievements: {
        title: "Achievements",
        items: [
            {
                title: 'Project Launch Success',
                description: 'Successfully delivered 5+ web projects with 99.9% uptime.',
                icon: 'https://assets9.lottiefiles.com/packages/lf20_touohxv0.json'
            },
            {
                title: 'Team Growth',
                description: 'Expanded our dev team by 50% while maintaining high satisfaction.',
                icon: 'https://assets1.lottiefiles.com/packages/lf20_vnikrcia.json'
            },
            {
                title: 'Innovation Award',
                description: 'Recognized for outstanding product innovation in 2024.',
                icon: '/lottie/Social Media Marketing.json'
            },
            {
                title: 'Customer Excellence',
                description: 'Achieved 4.9/5 average client satisfaction score.',
                icon: 'https://assets10.lottiefiles.com/packages/lf20_4kx2q32n.json'
            },
            {
                title: 'Cloud Migration',
                description: 'Migrated entire platform to AWS with zero downtime.',
                icon: '/lottie/loading.json'
            },
            {
                title: 'Open Source Impact',
                description: 'Contributed reusable components to the dev community.',
                icon: 'https://assets7.lottiefiles.com/packages/lf20_vnikrcia.json'
            }
        ],
    },
    philosophy: {
        title: "My Tech Philosophy",
        quote:
            "Good code should be measurable, maintainable, and meaningful — built for both people and machines.",
    },
    snapshot: {
        title: "Tech Stack ",
        techStack: [
            "JavaScript", "TypeScript", "Python", "Java",

            "Vue", "Nuxt", "React", "NextJs",
            "Tailwind CSS", "Quasar", "Vite",
            "Pinia", "Redux", "HTML", "CSS",

            "Node.js", "NestJS", "Express",
            "Spring Boot", "Django", "Flask",
            "GraphQL",

            "PostgreSQL", "MongoDB", "Redis", "MySQL",
            "Elasticsearch", "Firebase Firestore", "Prisma ORM",

            "Docker", "Kubernetes",
            "Nginx", "CI/CD (GitHub Actions)", "GitLab CI",
            "Cloudflare Tunnel", "AWS CloudWatch",

            "Git", "Nx Monorepo", "Postman", "Swagger", "Jest", "ESLint", "Prettier",
            "VS Code", "Figma", "Notion", "ClickUp",

            "OAuth2", "SSL/TLS", "JWT", "API Gateway", "Reverse Proxy"
        ]
    },
}


</script>
