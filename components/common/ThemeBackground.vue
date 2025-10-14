<template>
    <div
        class="relative min-h-screen w-full overflow-hidden flex flex-col justify-center items-center text-center transition-all duration-700">
        <!-- Nền thay đổi theo theme -->
        <div class="absolute inset-0 -z-10 transition-all duration-700" :style="backgroundStyle"></div>

        <!-- Lớp glass mờ -->
        <div v-if="glass"
            class="absolute inset-0 -z-5 bg-white/30 dark:bg-gray-700/20 backdrop-blur-lg rounded-lg shadow-lg"></div>

        <!-- Nội dung -->
        <div class="relative z-10 w-full h-full">
            <slot />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    glass: {
        type: Boolean,
        default: false,
    },
})

const isDark = ref(false)
let observer

onMounted(() => {
    // SSR-safe: chỉ chạy khi client
    const html = document.documentElement
    isDark.value = html.classList.contains('dark')

    // Theo dõi sự thay đổi theme realtime
    observer = new MutationObserver(() => {
        isDark.value = html.classList.contains('dark')
    })

    observer.observe(html, { attributes: true, attributeFilter: ['class'] })
})

onBeforeUnmount(() => {
    if (observer) observer.disconnect()
})

// Chuyển giữa hai background
const backgroundStyle = computed(() =>
    isDark.value
        ? {
            backgroundColor: '#020617',
            backgroundImage: `
          linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
          radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
        `,
            backgroundSize: '40px 40px, 40px 40px, 100% 100%',
        }
        : {
            backgroundImage: `
          radial-gradient(ellipse 85% 65% at 8% 8%, rgba(175, 109, 255, 0.42), transparent 60%),
          radial-gradient(ellipse 75% 60% at 75% 35%, rgba(255, 235, 170, 0.55), transparent 62%),
          radial-gradient(ellipse 70% 60% at 15% 80%, rgba(255, 100, 180, 0.40), transparent 62%),
          radial-gradient(ellipse 70% 60% at 92% 92%, rgba(120, 190, 255, 0.45), transparent 62%),
          linear-gradient(180deg, #f7eaff 0%, #fde2ea 100%)
        `,
            backgroundSize: '100% 100%',
        }
)
</script>
