<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        @keydown.esc.prevent="close"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-sm"
          @click="close"
        ></div>

        <!-- Panel -->
        <transition name="pop">
          <div
            class="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900"
          >
            <!-- Poster -->
            <div class="relative aspect-[16/9] w-full">
              <img
                v-if="project?.thumbnail_image"
                :src="project.thumbnail_image"
                alt=""
                class="absolute inset-0 h-full w-full object-cover"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
              ></div>
              <button
                ref="closeBtn"
                class="absolute right-3 top-3 rounded-lg bg-black/60 p-2 text-white hover:bg-black/80"
                @click="close"
                aria-label="Close"
              >
                ✕
              </button>
              <div class="absolute bottom-3 left-3 right-3">
                <h3 class="text-2xl font-extrabold text-white drop-shadow">
                  {{ project?.title }}
                </h3>
                <div class="mt-1 flex items-center gap-3 text-xs text-white/80">
                  <span
                    v-if="project?.duration"
                    class="rounded bg-white/10 px-2 py-0.5"
                    >⏱ {{ project.duration }}</span
                  >
                  <span
                    v-if="project?.author"
                    class="rounded bg-white/10 px-2 py-0.5"
                    >👤 {{ project.author }}</span
                  >
                  <span
                    v-if="project?.rating"
                    class="rounded bg-white/10 px-2 py-0.5"
                    >★ {{ project.rating.toFixed(1) }}</span
                  >
                </div>
              </div>
            </div>

            <!-- Body -->
            <div class="p-5">
              <p class="text-gray-700 dark:text-gray-300">
                {{ project?.desc }}
              </p>

              <ClientOnly>
                <component
                  v-if="galleryImages.length"
                  :is="$LightGallery"
                  :plugins="[$lgZoom, $lgThumbnail]"
                  :speed="400"
                  :download="false"
                  :closable="true"
                  :thumbnail="true"
                  class="mt-5"
                >
                  <!-- Mỗi ảnh là 1 anchor; data-src là ảnh lớn, img là thumbnail -->
                  <a
                    v-for="(src, i) in galleryImages"
                    :key="i"
                    :data-src="src"
                    :data-sub-html="project?.title"
                    class="inline-block mr-3 mb-3"
                  >
                    <img
                      :src="src"
                      alt=""
                      class="h-24 w-40 rounded-lg object-cover ring-1 ring-black/10 dark:ring-white/10"
                      loading="lazy"
                    />
                  </a>
                </component>
              </ClientOnly>

              <div
                v-if="project?.tags?.length"
                class="mt-4 flex flex-wrap gap-2"
              >
                <span
                  v-for="(t, i) in project.tags"
                  :key="i"
                  class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                >
                  #{{ t }}
                </span>
              </div>

              <div class="mt-6 flex items-center gap-3">
                <NuxtLink
                  v-if="project?.id !== undefined"
                  :to="`/projects/${project.id}`"
                  class="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                  @click="close"
                >
                  ▶ View details
                </NuxtLink>
                <button
                  class="inline-flex items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
                  @click="close"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, computed } from "vue";
import type { Project } from "~/types/projects";
const { $LightGallery, $lgZoom, $lgThumbnail } = useNuxtApp();

// type Project = {
//     id: number | string
//     title: string
//     desc?: string
//     duration?: string
//     author?: string
//     rating?: number
//     tags?: string[]
//     thumbnail_image?: string
//     images?: string[]
// }

const props = defineProps<{
  modelValue: boolean;
  project?: Project | null;
}>();
const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const galleryImages = computed(() => props.project?.images ?? []);

const closeBtn = ref<HTMLButtonElement | null>(null);

const close = () => emit("update:modelValue", false);

watch(
  () => props.modelValue,
  (open) => {
    // lock body scroll
    document.documentElement.style.overflow = open ? "hidden" : "";
    // focus close button when open
    if (open) {
      setTimeout(() => closeBtn.value?.focus(), 0);
      console.log(props.project);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  document.documentElement.style.overflow = "";
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 200ms ease, opacity 200ms ease;
}

.pop-enter-from,
.pop-leave-to {
  transform: translateY(12px) scale(0.98);
  opacity: 0;
}
</style>
