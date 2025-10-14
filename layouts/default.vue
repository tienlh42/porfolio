<template>
    <div :class="[
        'min-h-screen transition-colors duration-500',
    ]">

        <!-- Nội dung chính -->
        <div class="relative z-10">
            <Navbar />

            <main class=" mx-auto">
                <slot />
            </main>

            <Footer />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Footer from '~/components/Footer.vue'
import Navbar from '~/components/Navbar.vue'

const darkMode = ref(false)

onMounted(() => {
    // Tự động nhận theme hệ thống
    darkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches

    // Theo dõi thay đổi live nếu user đổi theme hệ thống
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        darkMode.value = e.matches
    })
})
</script>

<style scoped>
/* Optional: thêm transition mượt khi đổi theme */
html,
body {
    transition: background 0.6s ease, color 0.6s ease;
}
</style>
