<template>
    <button @click="toggleTheme"
        class="p-2 rounded-full bg-gray-100 dark:bg-gray-700 hover:scale-110 transition-transform duration-300"
        :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`">
        <!-- Icon: Heroicons -->
        <SunIcon v-if="isDark" class="h-4 w-4 text-yellow-400 transition-transform duration-500 rotate-0 scale-100" />
        <MoonIcon v-else class="h-4 w-4 text-gray-700 transition-transform duration-500 rotate-180 scale-100" />
    </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid'

// state theme
const isDark = ref(false)

const toggleTheme = () => {
    isDark.value = !isDark.value
    document.documentElement.classList.toggle('dark', isDark.value)
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// Khởi tạo theme khi load trang
onMounted(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDark.value = true
        document.documentElement.classList.add('dark')
    }
})
</script>
