<template>
    <section ref="sectionRef" class="relative  py-24 min-h-screen opacity-0 flex flex-col items-center justify-center
           bg-gradient-to-br bg-gray-100 dark:bg-gray-900 ">
        <div class="relative z-10 max-w-3xl px-6 text-center">
            <!-- Title -->
            <h2
                class="text-4xl sm:text-5xl font-extrabold mb-8 text-gray-900 dark:text-white tracking-wide drop-shadow-md">
                <span class="inline-block transition-transform duration-500 hover:scale-105 hover:rotate-1">
                    {{ displayedTitle }}
                </span>
                <span class="cursor" :class="{ blinking: isTypingDone }">|</span>
            </h2>

            <!-- Cards -->
            <div class="grid sm:grid-cols-2 gap-6 mt-10">
                <div v-for="(point, i) in props.strengths.points" :key="i" ref="pointsRefs"
                    class="opacity-0 translate-y-2 transition-transform duration-300">
                    <div class="p-6 rounded-2xl border-white/30 dark:border-gray-700/40 
                   backdrop-blur-md bg-white/20 dark:bg-gray-800/20 
                   shadow-lg hover:shadow-xl hover:-translate-y-1 
                   transform-gpu transition-all duration-500 ease-out hover:scale-[1.02]">
                        <p class="text-gray-700 dark:text-white text-lg font-medium leading-relaxed">
                            {{ point }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { animate, stagger } from 'motion'

const props = defineProps({
    strengths: {
        type: Object,
        required: true,
    },
})

const sectionRef = ref(null)
const displayedTitle = ref('')
const isTypingDone = ref(false)
const pointsRefs = ref([])

// --- Animation logic ---
const runAnimation = async () => {
    // Reset trạng thái
    displayedTitle.value = ''
    isTypingDone.value = false
    pointsRefs.value.forEach((el) => {
        if (el) el.style.opacity = 0
    })
    // sectionRef.value.style.opacity = 0

    // Fade-in section
    await animate(
        sectionRef.value,
        { opacity: [1, 1] },
        { duration: 0.2, easing: 'ease-out' }
    )

    // Typing effect
    const text = props.strengths.title
    for (let i = 0; i < text.length; i++) {
        displayedTitle.value += text[i]
        await new Promise((r) => setTimeout(r, 50))
    }
    isTypingDone.value = true

    // Animate cards sau khi typing xong
    await nextTick()
    animate(
        pointsRefs.value,
        { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
        { delay: stagger(0.15), duration: 0.6, easing: 'ease-out', fill: 'forwards' }
    )
}

// --- Intersection Observer để trigger lần đầu ---
onMounted(() => {
    sectionRef.value.__animate = runAnimation // expose cho parent gọi

    const observer = new IntersectionObserver(
        async (entries) => {
            if (entries[0].isIntersecting) {
                await runAnimation()
                observer.disconnect() // chỉ chạy 1 lần
            }
        },
        { threshold: 0.25 }
    )

    observer.observe(sectionRef.value)
})
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
