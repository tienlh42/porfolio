<template>
    <section>
        <h1 class="text-2xl font-bold mb-3">{{ project?.title }}</h1>
        <p>{{ project?.description }}</p>
        <NuxtLink to="/projects" class="text-blue-500 hover:underline mt-6 inline-block">
            ← Back to all projects
        </NuxtLink>
    </section>
</template>

<script setup>
const route = useRoute()
const { data: project } = await useAsyncData(`project-${route.params.id}`, () =>
    $fetch(`/api/projects`).then(list => list.find(p => p.id === Number(route.params.id)))
)
</script>
