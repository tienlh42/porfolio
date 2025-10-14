<template>
    <div ref="wrapper" class="relative flex justify-center items-center select-none">
        <!-- Hiệu ứng glow nền -->
        <div
            class="absolute w-[320px] h-[320px] bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-pink-400/10 blur-3xl rounded-full animate-pulse-slow">
        </div>

        <!-- Model 3D -->
        <model-viewer ref="model" :src="src" alt="Interactive 3D Model" camera-controls auto-rotate shadow-intensity="1"
            environment-image="neutral" exposure="1.2"
            style="width: 340px; height: 340px; transition: transform 0.5s ease-out;"></model-viewer>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    src: { type: String, required: true },
})

const wrapper = ref(null)
const model = ref(null)

// internal state
let rotationX = 0
let rotationY = 0
let scrollProgress = 0

// 🎯 Mouse Move Parallax
const handleMouseMove = (e) => {
    const rect = wrapper.value.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    // chuyển thành góc quay (nghiêng nhẹ)
    rotationY = x * 20
    rotationX = -y * 10
    updateModelTransform()
}

const handleMouseLeave = () => {
    rotationX = 0
    rotationY = 0
    updateModelTransform()
}

// 🎯 Scroll-based Animation
const handleScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop
    scrollProgress = (scrollY % window.innerHeight) / window.innerHeight
    updateModelTransform()
}

// 🧠 Cập nhật transform (apply rotation + scroll)
const updateModelTransform = () => {
    if (!model.value) return
    const el = model.value
    el.style.transform = `
    rotateX(${rotationX + scrollProgress * 15}deg)
    rotateY(${rotationY + scrollProgress * 30}deg)
    scale(${1 + scrollProgress * 0.05})
  `
}

onMounted(() => {
    wrapper.value.addEventListener('mousemove', handleMouseMove)
    wrapper.value.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    wrapper.value?.removeEventListener('mousemove', handleMouseMove)
    wrapper.value?.removeEventListener('mouseleave', handleMouseLeave)
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@keyframes pulse-slow {

    0%,
    100% {
        opacity: 0.4;
        transform: scale(1);
    }

    50% {
        opacity: 0.8;
        transform: scale(1.05);
    }
}

.animate-pulse-slow {
    animation: pulse-slow 6s ease-in-out infinite;
}

model-viewer {
    border-radius: 1rem;
    background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.05), transparent);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}
</style>
