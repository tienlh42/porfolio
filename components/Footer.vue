<template>
  <footer class="w-full bg-gray-900 text-gray-300 py-10">
    <div
      class="container mx-auto flex flex-col items-center justify-between gap-8 px-6 sm:flex-row"
    >
      <!-- 🔹 Logo + Name -->
      <div class="flex items-center gap-3">
        <img
          src="/apple-touch-icon.png"
          alt="Scott Le Logo"
          class="h-10 w-10 rounded-xl ring-1 ring-white/20"
        />
        <div>
          <h2 class="text-lg font-semibold text-white tracking-wide">
            Scott Le
          </h2>
          <p class="text-xs text-gray-400">
            Software Engineer • Tech Enthusiast
          </p>
        </div>
      </div>

      <!-- 🔹 Social Media -->
      <div
        class="flex flex-wrap items-center justify-center gap-6 text-gray-400"
      >
        <!-- 📧 Mail -->
        <a
          href="mailto:lehaitien422003dev@gmail.com"
          class="flex items-center gap-2 transition hover:text-emerald-400"
          aria-label="Email"
        >
          <EnvelopeIcon class="w-5 h-5" />
          <span class="text-sm font-medium">Mail</span>
        </a>

        <!-- 📸 Instagram -->
        <a
          href="https://instagram.com/therealworld._.2"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 transition hover:text-pink-500"
          aria-label="Instagram"
        >
          <CameraIcon class="w-5 h-5" />
          <span class="text-sm font-medium">Instagram</span>
        </a>

        <!-- 🧑‍💻 GitHub -->
        <a
          href="https://github.com/tienlh42"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 transition hover:text-white"
          aria-label="GitHub"
        >
          <CodeBracketIcon class="w-5 h-5" />
          <span class="text-sm font-medium">GitHub</span>
        </a>
      </div>

      <!-- 🔹 Copyright -->
      <p class="text-xs text-gray-500 text-center sm:text-right">
        © {{ new Date().getFullYear() }}
        <span class="font-medium text-gray-300">Scott Le</span> — Built with
        <span class="text-emerald-400 font-medium">Nuxt 3</span> &
        <span class="text-sky-400 font-medium">Vue 3</span>
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Static footer – no JS logic needed
import {
  EnvelopeIcon,
  CameraIcon,
  CodeBracketIcon,
} from "@heroicons/vue/24/outline";
</script>
