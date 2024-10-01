<script>
import Hls from 'hls.js'
import { useStore } from '@/stores/store'
import { watch, onMounted, ref } from 'vue'

export default {
  props: {
    customStyle: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    const store = useStore()
    const hls = ref(null)

    const setSource = (url) => {
      const video = document.getElementById('video')

      hls.value = new Hls()
      hls.value.loadSource(url)
      hls.value.attachMedia(video)
      hls.value.on(Hls.Events.MANIFEST_PARSED, function () {
        video.play()
      })
    }

    const destroyHls = () => {
      if (hls.value) {
        hls.value.destroy()
        hls.value = null
      }
    }

    const openExternalLink = (url) => {
      window.open(url, '_blank')
    }

    watch(
      () => store.channel,
      (newChannel) => {
        if (newChannel) {
          if (
            newChannel.options[0].format === 'youtube' ||
            newChannel.options[0].format === 'stream'
          ) {
            destroyHls()
            return
          }
          setSource(newChannel.options[0].url)
        }
      },
      { immediate: true }
    )

    onMounted(() => {
      if (store.channel && store.channel.options[0].format === 'm3u8') {
        setSource(store.channel.options[0].url)
      }
    })

    return { store, setSource, openExternalLink }
  }
}
</script>
<template>
  <div class="w-full flex flex-col md:flex-row mb-5">
    <div class="flex flex-grow justify-center items-center">
      <video
        id="video"
        :style="customStyle"
        class="aspect-video w-full"
        width="80%"
        height="auto"
        controls
      ></video>
    </div>
    <div class="w-full md:w-[500px] bg-slate-600/50 p-5 md:p-10 space-y-4">
      <div class="flex gap-2">
        <div class="w-20 h-20 md:min-w-40 md:min-h-40">
          <img
            :src="store.channel.logo"
            :alt="store.channel.name"
            class="w-full h-full object-cover rounded"
          />
        </div>
        <div class="flex-grow flex flex-col gap-2 items-start">
          <h1 class="text-3xl font-bold text-center">{{ store.channel.name }}</h1>
          <a class="bg-teal-700 px-4 py-2 rounded-full" :href="store.channel.web" target="_blank"
            >Open web</a
          >
        </div>
      </div>
      <div class="flex flex-wrap gap-2 justify-start items-start">
        <button
          class="rounded bg-transparent border border-teal-700 px-4 py-2 hover:bg-teal-700 hover:text-white transition-all duration-300 flex items-center gap-2"
          v-for="(option, index) in store.channel.options"
          :key="index"
          @click="option.format === 'm3u8' ? setSource(option.url) : openExternalLink(option.url)"
        >
          <img
            v-if="option.format === 'youtube'"
            src="/images/youtube.svg"
            alt="icon"
            width="20"
            height="20"
          />
          <img
            v-else-if="option.format === 'stream'"
            src="/images/twitch.svg"
            alt="icon"
            width="20"
            height="20"
          />
          <img v-else src="/images/tv.svg" alt="icon" width="20" height="20" />Option
          {{ index + 1 }}
        </button>
      </div>
    </div>
  </div>
</template>
<style></style>
