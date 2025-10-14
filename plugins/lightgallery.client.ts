import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'

import LightGallery from 'lightgallery/vue'
import { defineNuxtPlugin } from '#app'
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'

export default defineNuxtPlugin(() => {
    return {
        provide: {
            LightGallery,
            lgZoom,
            lgThumbnail
        }
    }
})
