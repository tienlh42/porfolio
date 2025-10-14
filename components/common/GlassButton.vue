<template>
    <NuxtLink :to="to"
        class="relative inline-flex items-center justify-center overflow-hidden rounded-xl px-8 py-3 font-medium text-white transition-all duration-500 ease-out group">
        <!-- Glass background -->
        <span
            class="absolute inset-0 bg-white/20 dark:bg-gray-700/20 backdrop-blur-md  border-white/30 dark:border-gray-600/30 rounded-xl"></span>

        <!-- Animated gradient overlay on hover -->
        <span
            class="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity group-hover:opacity-80 blur-md transition-opacity duration-500"></span>

        <!-- Glow effect -->
        <span
            class="absolute inset-0 bg-gradient-to-r from-blue-400/40 via-purple-400/40 to-pink-400/40 opacity-0 group-hover:opacity-100 transition duration-700"></span>

        <!-- Button text -->
        <span class="relative z-10">{{ label }}</span>
    </NuxtLink>
</template>

<script setup>
defineProps({
    label: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        default: '#',
    },
})
</script>

<style scoped>
/* Subtle 3D hover lift */
.group:hover {
    transform: translateY(-2px) scale(1.02);
}

/* Smooth glow pulse when hovered */
.group:hover span:last-child {
    animation: glowPulse 1.5s ease-in-out infinite;
}

@keyframes glowPulse {
    0% {
        opacity: 0.8;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0.8;
    }
}
</style>
