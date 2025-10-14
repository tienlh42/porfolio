<template>
    <section class="relative py-20 bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <div
            class="absolute inset-0 bg-gradient-to-r from-blue-100/40 via-transparent to-transparent dark:from-gray-800/60">
        </div>

        <div class="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6">
            <!-- Left: Philosophy Text -->
            <div v-motion :initial="{ opacity: 0, x: -40 }" :enter="{ opacity: 1, x: 0, transition: { duration: 700 } }"
                class="text-center lg:text-left flex-1">
                <h2 class="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white">
                    {{ philosophy.title }}
                </h2>
                <p class="max-w-2xl text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed mx-auto lg:mx-0">
                    “{{ philosophy.quote }}”
                </p>
            </div>

            <!-- Right: 3D Icon / Animation -->
            <div v-motion :initial="{ opacity: 0, scale: 0.9 }"
                :enter="{ opacity: 1, scale: 1, transition: { delay: 200, duration: 800 } }"
                class="flex-1 flex justify-center">
                <!-- Option 1: Lottie 3D-style animation -->
                <!-- <lottie-player src="/lottie/philosophy-3d.json" background="transparent" speed="1"
                    style="width: 300px; height: 300px" loop autoplay></lottie-player> -->

                <!-- 🧱 Option 2: Nếu bạn dùng mô hình 3D .glb -->
                <common-model-viewer3-d src="/model-3d/cozy_workplace_corner.glb" />
            </div>
        </div>
    </section>
</template>

<script setup>
defineProps({
    philosophy: {
        type: Object,
        required: true
    }
})
</script>

<style scoped>
/* Đảm bảo thẻ 3D không bị cắt góc */
</style>
