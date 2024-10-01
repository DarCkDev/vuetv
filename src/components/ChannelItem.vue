<script>
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('select', this.channel)
    }
  }
}
</script>
<template>
  <div
    class="w-full h-16 md:w-60 md:h-20 shadow rounded overflow-hidden bg-teal-700/10 cursor-pointer flex items-center gap-2 hover:bg-teal-700"
    @click="handleClick"
  >
    <img class="w-20 h-20 object-cover" :src="channel.logo" :alt="channel.name" />
    <h3>{{ channel.name }}</h3>
  </div>
</template>
<style></style>
