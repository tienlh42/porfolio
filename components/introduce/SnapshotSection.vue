<template>
    <section ref="sectionRef"
        class="relative py-20 text-center  bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div class="relative z-10 max-w-6xl mx-auto px-6">
            <!-- Title -->
            <h2 class="text-4xl sm:text-5xl font-extrabold mb-10 text-gray-900 dark:text-white tracking-wide">
                {{ snapshot.title }}
            </h2>

            <!-- 3 hàng auto slide -->
            <div class="flex flex-col gap-10 light overflow-hidden ">
                <div v-for="(row, rowIndex) in groupedStacks" :key="rowIndex"
                    class="relative flex whitespace-nowrap animate-marquee" :class="{
                        'reverse': rowIndex % 2 === 1
                    }">
                    <!-- lặp 2 lần để tạo hiệu ứng seamless loop -->
                    <div v-for="repeat in 2" :key="repeat" class="flex justify-center gap-10 min-w-full">
                        <div v-for="tech in row" :key="tech + repeat"
                            class="group flex flex-col items-center gap-3 hover:scale-110 transition-transform duration-300">
                            <!-- Icon -->
                            <div
                                class="w-16 h-16 flex items-center justify-center rounded-2xl shadow-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/30 dark:border-gray-700/40">
                                <img :src="getTechIcon(tech)" :alt="tech" @error="onImgError"
                                    class="w-8 h-8 object-contain" />
                            </div>
                            <p class="text-gray-700 dark:text-gray-300 text-sm font-medium truncate max-w-[90px]">
                                {{ tech }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { animate } from 'motion'

const props = defineProps({
    snapshot: {
        type: Object,
        required: true
    }
})

const sectionRef = ref(null)
const defaultIcon = '/icon/serverfault.svg'

// SimpleIcons CDN + fallback
const getTechIcon = (tech) => {
    const cleanName = tech.toLowerCase().replace(/\s+/g, '')
    return `https://cdn.simpleicons.org/${cleanName}`
}
const onImgError = (e) => (e.target.src = defaultIcon)

// Chia techStack thành 3 hàng
const groupedStacks = computed(() => {
    const arr = [...props.snapshot.techStack]
    const chunkSize = Math.ceil(arr.length / 6)
    return Array.from({ length: 3 }, (_, i) => arr.slice(i * chunkSize, (i + 1) * chunkSize))
})

// Fade-in section khi scroll tới
onMounted(() => {
    const observer = new IntersectionObserver(
        async (entries) => {
            if (entries[0].isIntersecting) {
                animate(
                    sectionRef.value,
                    { opacity: [0, 1], y: [40, 0] },
                    { duration: 0.8, easing: 'ease-out' }
                )
                observer.disconnect()
            }
        },
        { threshold: 0.25 }
    )
    observer.observe(sectionRef.value)
})
</script>

<style scoped>
/* 🎞️ Animation chạy ngang (seamless loop) */
@keyframes marquee {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

@keyframes marquee-reverse {
    0% {
        transform: translateX(-50%);
    }

    100% {
        transform: translateX(0);
    }
}

/* ⏯️ Hàng chạy mượt, xen kẽ chiều */
.animate-marquee {
    display: flex;
    animation: marquee 30s linear infinite;
}

.animate-marquee.reverse {
    animation: marquee-reverse 35s linear infinite;
}

/* ⏸️ Pause khi hover */
.animate-marquee:hover {
    animation-play-state: paused;
}

.overflow-hidden {
    mask-image: linear-gradient(to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%);
    -webkit-mask-image: linear-gradient(to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%);
}
</style>
