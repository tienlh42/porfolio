<template>
    <section class="p-8">
        <h1 class="text-2xl font-semibold mb-6">My Projects</h1>

        <div v-if="pending">Loading projects...</div>
        <div v-else>
            <ProjectCard v-for="project in projects" :key="project.id" :title="project.title"
                :desc="project.description" />
        </div>
    </section>
</template>

<script setup>
const { data: projects, pending, error } = await useAsyncData('projects', () =>
    $fetch('/api/projects')
)
</script>
