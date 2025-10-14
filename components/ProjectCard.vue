<template>
    <!-- :to="`/projects/${project.id}`" -->
    <div class="group relative block overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        role="button" tabindex="0" @click="$emit('preview', project)" @keydown.enter.prevent="$emit('preview', project)"
        @keydown.space.prevent="$emit('preview', project)">
        <!-- Poster -->
        <div class="relative aspect-[16/9] w-full bg-gray-200 dark:bg-gray-800">
            <!-- Background image -->
            <div class="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-out group-hover:scale-105"
                :style="bgStyle" />

            <!-- Top row: badges + menu -->
            <div class="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-3">
                <!-- Badges -->
                <div class="flex items-center gap-2">
                    <span v-if="project.duration"
                        class="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur">{{
                            project.duration }}</span>
                    <span v-if="project.author"
                        class="rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">by
                        {{ project.author }}</span>
                </div>

                <!-- Context menu -->
                <div class="relative">
                    <button
                        class="rounded-full bg-black/50 p-1.5 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus:opacity-100"
                        @click.prevent="open = !open" aria-label="More actions">
                        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="currentColor" aria-hidden="true">
                            <circle cx="5" cy="12" r="2"></circle>
                            <circle cx="12" cy="12" r="2"></circle>
                            <circle cx="19" cy="12" r="2"></circle>
                        </svg>
                    </button>

                    <div v-show="open" @click.stop
                        class="absolute right-0 mt-2 w-44 backdrop-blur-sm rounded-xl text-sm text-white shadow-xl">
                        <button class="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10">
                            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.53C11.09 5.01 12.76 4 14.5 4 17 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            Add to My List
                        </button>
                        <button class="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10">
                            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                                <path
                                    d="M18 8c-1.657 0-3 1.343-3 3 0 .265.036.521.102.766L8.91 14.7A2.99 2.99 0 0 0 7 14c-1.657 0-3 1.343-3 3s1.343 3 3 3a2.99 2.99 0 0 0 1.91-.7l6.192 2.934A2.98 2.98 0 0 0 18 23c1.657 0 3-1.343 3-3s-1.343-3-3-3a2.99 2.99 0 0 0-1.91.7l-6.192-2.934c.06-.244.102-.5.102-.766s-.042-.522-.102-.766L16.09 9.3A2.99 2.99 0 0 0 18 10c1.657 0 3-1.343 3-3z" />
                            </svg>
                            Share
                        </button>
                        <NuxtLink :to="`/projects/${project.id}`"
                            class="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/10">
                            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            More info
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/0" />

            <!-- Bottom content -->
            <div class="absolute inset-x-0 bottom-0 z-20 p-4">
                <!-- Tags -->
                <div v-if="project.tags?.length" class="mb-2 flex flex-wrap gap-1.5">
                    <span v-for="(t, i) in project.tags" :key="i"
                        class="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur">{{
                            t }}</span>
                </div>

                <!-- Title -->
                <h3 class="line-clamp-2 text-lg sm:text-xl font-extrabold leading-snug text-white drop-shadow-md">
                    {{ project.title }}
                </h3>

                <!-- Rating + CTA -->
                <div class="mt-2 flex items-center justify-between">
                    <div class="flex items-center gap-1">
                        <!-- (tuỳ chọn) vẽ sao ở đây -->
                        <span class="ml-1 text-xs text-white/80">{{ safeRating.toFixed(1) }}</span>
                    </div>

                    <span
                        class="inline-flex items-center gap-2 rounded-lg backdrop-blur-lg bg-white px-3 py-1.5 text-xs font-semibold text-gray-900 transition-all duration-200 group-hover:translate-y-[-1px] group-hover:shadow-md">
                        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        View details
                    </span>
                </div>
            </div>

            <!-- Border glow -->
            <div
                class="absolute inset-0 rounded-2xl ring-1 ring-white/10 transition duration-300 group-hover:ring-white/30" />
            <div
                class="absolute inset-0 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-shadow duration-300 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, withDefaults, defineProps } from 'vue'

export type Project = {
    id: number | string
    title: string
    desc?: string
    duration?: string
    author?: string
    rating?: number // 0..5
    tags?: string[]
    thumbnail_image?: string
    images?: string[]
}

const props = withDefaults(defineProps<{
    project: Project
}>(), {
    project: () => ({
        id: '',
        title: '',
        desc: '',
        duration: '',
        author: '',
        rating: 4.5,
        tags: [],
        thumbnail_image: '',
        images: []
    })
})

defineEmits<{
    (e: 'preview', payload: Project): void
}>()

const open = ref(false)

const bgStyle = computed(() => ({
    backgroundImage: props.project.thumbnail_image
        ? `url('${props.project.thumbnail_image}')`
        : `linear-gradient(135deg, #1f2937, #0f172a)`
}))

const safeRating = computed(() =>
    Math.min(5, Math.max(0, props.project.rating ?? 4.5))
)
</script>

<style scoped>
/* có thể thêm directive click-outside để auto-close menu nếu cần */
</style>
