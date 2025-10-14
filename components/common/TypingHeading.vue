<template>
    <h1 :class="[
        // base heading styles (có thể override qua prop class)
        'inline-block cursor-pointer select-none font-extrabold tracking-tight',
        sizeClass,
        gradient ? 'bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent' : 'text-gray-900 dark:text-white',
        $attrs.class || ''
    ]" role="button" tabindex="0" :aria-label="`Typing heading: ${text}`" @click="start()"
        @keydown.space.prevent="start()" @keydown.enter.prevent="start()">
        <span>{{ shown }}</span>
        <span v-if="cursor" :class="['inline-block align-baseline', caretBlinkClass]">{{ caretChar }}</span>
    </h1>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'

const props = defineProps<{
    text: string
    speed?: number            // ms mỗi ký tự
    startOnMount?: boolean
    cursor?: boolean
    caretChar?: string
    caretBlinkMs?: number
    size?: 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
    gradient?: boolean
}>()

const emit = defineEmits<{
    (e: 'finished'): void
    (e: 'started'): void
    (e: 'reset'): void
}>()

const speed = computed(() => Math.max(5, props.speed ?? 35))
const caretChar = computed(() => props.caretChar ?? '_')
const caretBlinkMs = computed(() => props.caretBlinkMs ?? 600)
const cursor = computed(() => props.cursor ?? true)
const sizeClass = computed(() => {
    switch (props.size ?? '2xl') {
        case 'sm': return 'text-lg'
        case 'base': return 'text-xl'
        case 'lg': return 'text-2xl'
        case 'xl': return 'text-3xl'
        case '2xl': return 'text-4xl'
        case '3xl': return 'text-5xl'
        case '4xl': return 'text-6xl'
        case '5xl': return 'text-7xl'
        default: return 'text-4xl'
    }
})
const caretBlinkClass = computed(() => `animate-[blink_${caretBlinkMs.value}ms_steps(1,start)_infinite]`)

const shown = ref('')
let timer: number | null = null

function clearTimer() {
    if (timer) {
        clearInterval(timer)
        timer = null
    }
}
function reset() {
    clearTimer()
    shown.value = ''
    emit('reset')
}
function start() {
    // nếu đã hoàn tất -> reset trước khi chạy lại
    if (shown.value.length === props.text.length) reset()

    if (timer) return // đang chạy rồi
    emit('started')
    timer = window.setInterval(() => {
        const nextLen = shown.value.length + 1
        shown.value = props.text.slice(0, nextLen)
        if (nextLen >= props.text.length) {
            clearTimer()
            emit('finished')
        }
    }, speed.value)
}

onMounted(() => {
    if (props.startOnMount) start()
})
onBeforeUnmount(() => clearTimer())

// nếu prop text đổi khi đang hiển thị => reset để đảm bảo sync
watch(() => props.text, () => reset())
</script>

<style scoped>
@keyframes blink {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
