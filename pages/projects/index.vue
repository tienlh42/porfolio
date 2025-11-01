<template>
  <section
    class="p-20 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
  >
    <CommonTypingHeading
      text="My Projects"
      size="2xl"
      :cursor="true"
      :gradient="true"
      :speed="30"
      :startOnMount="true"
      class="mb-6"
    />

    <div v-if="pending">Loading projects...</div>
    <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard
        v-for="p in projects"
        :key="p.id"
        :project="p"
        @preview="onPreview"
      />
    </div>
  </section>
  <ProjectsProjectDialog v-model="openPreview" :project="selectedProject" />
</template>

<script setup lang="ts">
import type { Project } from "~/types/projects";

// type Project = {
//   id: number | string;
//   title: string;
//   desc?: string;
//   duration?: string;
//   author?: string;
//   rating?: number;
//   tags?: string[];
//   thumbnail_image?: string;
//   images?: string[];
// };
const { data, pending, error } = await useAsyncData("projects", () =>
  $fetch("/api/projects")
);
const projects = computed(() => (Array.isArray(data.value) ? data.value : []));

const openPreview = ref(false);
const selectedProject = ref<any | null>(null);

function onPreview(p: Project) {
  selectedProject.value = p;
  openPreview.value = true;
}
</script>
