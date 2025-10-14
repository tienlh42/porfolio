<template>
    <section ref="sectionRef" class="relative py-20 bg-gray-50 dark:bg-gray-900 text-center overflow-hidden opacity-0">
        <!-- Background gradient -->


        <div class="relative z-10 max-w-6xl mx-auto px-6">
            <!-- Title -->
            <h2 class="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
                {{ displayedTitle }}
                <span class="cursor" :class="{ blinking: isTypingDone }">|</span>
            </h2>

            <!-- Description -->
            <p class="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed mb-16">
                {{ mission.description }}
            </p>

            <!-- Chart -->
            <v-chart class="h-80 w-full mb-16" :option="chartOption" autoresize />

            <!-- Strategy Cards -->
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center text-left">
                <div v-for="(item, i) in strategies" :key="i" ref="cardsRefs"
                    class="opacity-0 translate-y-2 p-6 rounded-2xl bg-white/70 dark:bg-gray-800/70 backdrop-blur-md shadow-lg border border-white/30 dark:border-gray-700/40 hover:shadow-xl hover:-translate-y-2 transform transition-all duration-500 ease-out w-full h-full">
                    <div class="flex items-center gap-4 mb-4">
                        <div class="w-12 h-12 flex items-center justify-center rounded-full text-white"
                            :class="iconColors[i % iconColors.length]">
                            <component :is="item.icon" class="w-6 h-6" />
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                            {{ item.title }}
                        </h3>
                    </div>
                    <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ item.description }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { animate, stagger } from 'motion'
import VChart from 'vue-echarts'
import * as echarts from 'echarts'
import {
    RocketLaunchIcon,
    UsersIcon,
    ChartBarIcon,
    LightBulbIcon,
    GlobeAltIcon,
    Squares2X2Icon
} from '@heroicons/vue/24/outline'

// Props
const props = defineProps({
    mission: { type: Object, required: true }
})

// --- Animation state ---
const sectionRef = ref(null)
const displayedTitle = ref('')
const isTypingDone = ref(false)
const cardsRefs = ref([])

// --- Animation handler ---
const runAnimation = async () => {
    displayedTitle.value = ''
    isTypingDone.value = false
    // sectionRef.value.style.opacity = 0

    // Fade-in section
    await animate(
        sectionRef.value,
        { opacity: [0.8, 1] },
        { duration: 0.2, easing: 'ease-out' }
    )

    // Typing effect
    const text = props.mission.title
    for (let i = 0; i < text.length; i++) {
        displayedTitle.value += text[i]
        await new Promise((r) => setTimeout(r, 40))
    }
    isTypingDone.value = true

    // Animate cards
    await nextTick()
    animate(cardsRefs.value,
        { opacity: [0, 1], y: [20, 0] },
        { delay: stagger(0.1), duration: 0.6, fill: 'forwards' }
    )
}

// --- Observer trigger ---
onMounted(() => {
    sectionRef.value.__animate = runAnimation

    const observer = new IntersectionObserver(
        async (entries) => {
            if (entries[0].isIntersecting) {
                await runAnimation()
                observer.disconnect()
            }
        },
        { threshold: 0.25 }
    )
    observer.observe(sectionRef.value)
})

// --- Chart config ---
const chartOption = ref({
    title: {
        text: 'Projects Over Years',
        left: 'center',
        textStyle: { color: '#3b82f6', fontWeight: 'bold', fontSize: 18 }
    },
    tooltip: { trigger: 'axis' },
    xAxis: {
        type: 'category',
        data: ['2020', '2021', '2022', '2023', '2024', '2025'],
        axisLine: { lineStyle: { color: '#94a3b8' } }
    },
    yAxis: {
        type: 'value',
        axisLine: { lineStyle: { color: '#94a3b8' } },
        splitLine: { lineStyle: { color: '#cbd5e1', opacity: 0.3 } }
    },
    series: [
        {
            name: 'Projects',
            data: [1, 3, 5, 10, 25, 30],
            type: 'line',
            smooth: true,
            lineStyle: { color: '#3b82f6', width: 4 },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: 'rgba(59,130,246,0.4)' },
                    { offset: 1, color: 'rgba(59,130,246,0)' }
                ])
            },
            symbolSize: 8,
            itemStyle: { color: '#2563eb' }
        }
    ]
})

// --- Strategies data ---
const strategies = [
    {
        title: 'Innovation',
        icon: LightBulbIcon,
        description: 'Continuously improve product quality and adopt new technologies.'
    },
    {
        title: 'Global Expansion',
        icon: GlobeAltIcon,
        description: 'Expand our market across regions and strengthen partnerships.'
    },
    {
        title: 'Team Empowerment',
        icon: UsersIcon,
        description: 'Foster a culture of collaboration and continuous learning.'
    },
    {
        title: 'Data-Driven Growth',
        icon: ChartBarIcon,
        description: 'Leverage data analytics and AI for better decisions.'
    },
    {
        title: 'Agile Execution',
        icon: Squares2X2Icon,
        description: 'Maintain flexible processes for faster market adaptation.'
    },
    {
        title: 'Sustainability',
        icon: RocketLaunchIcon,
        description: 'Commit to environmentally responsible innovation.'
    }
]

const iconColors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-indigo-500']
</script>

<style scoped>
.cursor {
    display: inline-block;
    margin-left: 3px;
    color: #3b82f6;
}

.blinking {
    animation: blink 0.8s step-start infinite;
}

@keyframes blink {
    50% {
        opacity: 0;
    }
}
</style>
