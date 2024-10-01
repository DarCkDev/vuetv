import { defineStore } from 'pinia'

export const useStore = defineStore('player', {
  state: () => ({
    channel: null
  }),
  actions: {
    setChannel(channel) {
      this.channel = channel
    }
  },
  getters: {
    getChannel() {
      return this.channel
    }
  }
})
