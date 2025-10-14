<template>
    <section
        class="relative flex flex-col py-20 justify-center items-center text-center min-h-screen bg-gradient-to-br from-blue-50  to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <!-- Glass background overlay -->

        <div class="relative z-10 max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6">
            <div v-motion :initial="{ opacity: 0, x: -40 }" :enter="{ opacity: 1, x: 0, transition: { duration: 700 } }"
                class="text-center  flex-1">
                <!-- Title typing animation -->
                <h1 class="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-900 dark:text-white typing-animation">
                    {{ props.intro.title }}
                </h1>

                <!-- Description typing animation -->
                <p class="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-6 fade-in">
                    {{ props.intro.description }}
                </p>

                <!-- Skill chips -->
                <div class="flex flex-wrap justify-center gap-3 mb-8">
                    <span v-for="(tag, i) in props.intro.techStack" :key="i"
                        class="px-4 py-1 text-sm font-medium rounded-full text-white"
                        :class="tagColors[i % tagColors.length]">
                        {{ tag }}
                    </span>
                </div>

                <common-glass-button label="View My Projects" to="/projects" />
            </div>
            <div v-motion :initial="{ opacity: 0, scale: 0.9 }"
                :enter="{ opacity: 1, scale: 1, transition: { delay: 200, duration: 800 } }" class="">

                <lottie-player src=" /lottie/Designer.json" background="transparent" speed="1"
                    style="width: 360px; height: 500px" loop autoplay></lottie-player>

            </div>
        </div>




    </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { animate, stagger } from 'motion'

const props = defineProps({
    intro: {
        type: Object,
        required: true
    }
})

const tagColors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
]
</script>

<style scoped>
/* Typing animation cho title */
.typing-animation {
    overflow: hidden;
    white-space: nowrap;
    border-right: 3px solid rgba(59, 130, 246, 0.75);
    animation: typing 3s steps(40, end), blink 0.7s step-end infinite;
}

@keyframes typing {
    from {
        width: 0;
    }

    to {
        width: 100%;
    }
}

@keyframes blink {

    from,
    to {
        border-color: transparent;
    }

    50% {
        border-color: rgba(59, 130, 246, 0.75);
    }
}

/* Fade-in cho description */
.fade-in {
    opacity: 0;
    animation: fadeIn 2.5s ease forwards;
    animation-delay: 2s;
}

@keyframes fadeIn {
    to {
        opacity: 1;
    }
}
</style>
