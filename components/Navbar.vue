<template>
    <transition name="slide-fade">
        <nav v-show="isVisible" class="fixed top-4 left-1/2 -translate-x-1/2 bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm
             text-text-primary dark:text-white shadow-lg rounded-full px-8 py-3 z-50 flex items-center
             justify-between w-[90%] max-w-3xl border border-gray-200/30 transition-all duration-500">
            <NuxtLink to="/">
                <CommonTypingHeading text="Le Hai Tien" size="sm" :cursor="true" :gradient="true" :speed="30"
                    :startOnMount="true" />

            </NuxtLink>

            <div class="flex items-center gap-6">
                <NuxtLink v-for="link in links" :key="link.to" :to="link.to" class="relative group text-sm font-medium">
                    <span class="transition-all duration-300 group-hover:text-primary">{{ link.label }}</span>
                    <!-- underline effect -->
                    <span
                        class="absolute bottom-0 left-0 w-0 h-[2px] bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
                </NuxtLink>
                <ThemeToggle />
            </div>
        </nav>
    </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ThemeToggle from './common/ThemeToggle.vue'

const isVisible = ref(true)
let lastScroll = 0

const handleScroll = () => {
    const currentScroll = window.scrollY
    if (currentScroll > lastScroll && currentScroll > 80) {
        // Scroll xuống => ẩn navbar
        isVisible.value = true
    } else {
        // Scroll lên => hiện navbar
        isVisible.value = true
    }
    lastScroll = currentScroll
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})

const links = [
    { to: '/projects', label: 'Projects' },
]


</script>

<style scoped>
/* transition cho navbar ẩn/hiện */
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.4s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    opacity: 0;
    transform: translateY(-20px);
}

/* active link */
.router-link-active {
    color: #2563eb;
    /* blue-600 */
    font-weight: 600;
}

/* hover animation subtle glow */
nav {
    transition: background 0.3s ease, box-shadow 0.3s ease;
}

nav:hover {
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}
</style>
