<template>
    <section ref="sectionRef" class="relative py-20 text-center overflow-hidden bg-gray-50 dark:bg-gray-900 ">
        <!-- Background gradient -->
        <div
            class="absolute inset-0 bg-gradient-to-b from-blue-100/40 via-transparent to-transparent dark:from-gray-800/60">
        </div>

        <div class="relative z-10 max-w-6xl mx-auto px-6">
            <!-- Title -->
            <h2 class="text-4xl sm:text-5xl font-extrabold mb-10 text-gray-900 dark:text-white tracking-wide">
                {{ displayedTitle }}
                <span class="cursor" :class="{ blinking: isTypingDone }">|</span>
            </h2>

            <!-- Grid of achievements -->
            <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                <div v-for="(item, i) in achievements.items" :key="i" ref="cardsRefs"
                    class="opacity-0 scale-90 group p-6 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-2xl shadow-lg border border-white/30 dark:border-gray-700/40 hover:-translate-y-2 hover:shadow-xl transform transition-all duration-500 text-left flex flex-col items-center">
                    <!-- Animated icon -->
                    <lottie-player :src="item.icon" background="transparent" speed="1"
                        style="width: 100px; height: 100px" loop autoplay></lottie-player>

                    <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-4 mb-2">
                        {{ item.title }}
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
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

const props = defineProps({
    achievements: {
        type: Object,
        required: true
    }
})

const sectionRef = ref(null)
const displayedTitle = ref('')
const isTypingDone = ref(false)
const cardsRefs = ref([])

// Chạy animation
const runAnimation = async () => {
    // Fade in section
    await animate(
        sectionRef.value,
        { duration: 0.2, easing: 'ease-out' }
    )

    // Typing effect cho title
    displayedTitle.value = ''
    const text = props.achievements.title
    for (let i = 0; i < text.length; i++) {
        displayedTitle.value += text[i]
        await new Promise((r) => setTimeout(r, 40))
    }
    isTypingDone.value = true

    // Animate cards
    await nextTick()
    animate(
        cardsRefs.value,
        { opacity: [0, 1], scale: [0.9, 1] },
        { delay: stagger(0.1), duration: 0.6, easing: 'ease-out', fill: 'forwards' }
    )
}

onMounted(() => {
    // Import lottie-player client-side only
    import('@lottiefiles/lottie-player')

    // Gắn function để parent có thể trigger lại
    sectionRef.value.__animate = runAnimation

    // Intersection Observer để chỉ animate 1 lần khi scroll vào
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

lottie-player {
    transition: transform 0.3s ease;
}

.group:hover lottie-player {
    transform: scale(1.1);
}
</style>
