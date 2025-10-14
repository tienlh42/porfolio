import 'vue-final-modal/style.css'

import { ModalsContainer, VueFinalModal, createVfm } from 'vue-final-modal'

import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    // đăng ký plugin
    nuxtApp.vueApp.use(createVfm())

    // đăng ký component toàn cục
    nuxtApp.vueApp.component('VueFinalModal', VueFinalModal)
    nuxtApp.vueApp.component('ModalsContainer', ModalsContainer)
})
