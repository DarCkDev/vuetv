<script>
// import axios from 'axios'
import { useStore } from '../stores/store'
import VideoPlayerComponent from '@/components/VideoPlayerComponent.vue'
import ChannelItem from '@/components/ChannelItem.vue'
import dataList from '../assets/tv.json'

export default {
  components: {
    VideoPlayerComponent,
    ChannelItem
  },
  data() {
    return {
      data: {},
      loading: true,
      error: '',
      videoPlayerStyle: {}
    }
  },
  mounted() {
    this.data = dataList
    this.loading = false
    window.addEventListener('scroll', this.handleScroll)
    // axios
    //   .get('https://www.tdtchannels.com/lists/tv.json')
    //   .then((response) => {
    //     this.data = response.data
    //     this.error = ''
    //   })
    //   .catch((error) => {
    //     this.error = error
    //   })
    //   .finally(() => {
    //     this.loading = false
    //   })
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const isMediumScreen = window.innerWidth >= 768 // Tailwind md breakpoint

      if (scrollTop > 100) {
        this.videoPlayerStyle = {
          position: 'fixed',
          top: '0',
          right: isMediumScreen ? '0' : '0',
          left: isMediumScreen ? 'auto' : '0',
          width: isMediumScreen ? '360px' : '100%'
        }
      } else {
        this.videoPlayerStyle = {}
      }
    }
  },
  setup() {
    const store = useStore()
    return { store }
  }
}
</script>

<template>
  <main id="main">
    <div class="wrapper">
      <div v-if="store.channel">
        <VideoPlayerComponent :customStyle="videoPlayerStyle" />
      </div>
      <div>
        <div>
          <h2 v-if="loading">Loading...</h2>
          <h2 v-else-if="error">{{ error }}</h2>
          <div v-else>
            <div v-for="country in data.countries" :key="country.name">
              <h3 class="text-2xl md:text-3xl text-teal-700 font-bold">{{ country.name }}</h3>
              <details class="" v-for="ambit in country.ambits" :key="ambit.name" open>
                <summary class="md:text-2xl font-semibold cursor-pointer">
                  {{ ambit.name }}
                </summary>
                <div class="flex flex-wrap justify-between gap-4 p-4">
                  <ChannelItem
                    v-for="channel in ambit.channels.filter(
                      (channel) => channel.options.length > 0
                    )"
                    :key="channel.name"
                    :channel="channel"
                    @select="store.setChannel"
                  />
                </div>
                <div class="w-full bg-teal-700 h-[1px]"></div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
details[open] {
  background-color: rgba(59, 130, 246, 0.1);
}
</style>
