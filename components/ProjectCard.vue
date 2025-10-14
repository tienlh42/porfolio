<template>
    <div class="border rounded-lg shadow hover:shadow-lg transition-all p-4 mb-4">
        <h3 class="text-xl font-semibold text-gray-800">{{ title }}</h3>
        <p class="text-gray-600 mt-2">{{ desc }}</p>
        <NuxtLink :to="`/projects/${id}`" class="text-blue-500 mt-3 inline-block hover:underline">
            View details →
        </NuxtLink>
    </div>
</template>

<script setup>
defineProps({
    id: Number,
    title: String,
    desc: String
})
</script>
