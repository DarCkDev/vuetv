<template>
  <div id="observer" ref="observer" style="width: 100%" class="overflow-hidden">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const observer = this.$refs.observer
        if (entry.isIntersecting) {
          console.log('VideoPlayerComponent is visible')
          // Aquí puedes agregar la acción que deseas cuando es visible
          observer.style.width = '60px'
        } else {
          console.log('VideoPlayerComponent is not visible')
          // Aquí puedes agregar la acción que deseas cuando no es visible
          observer.style.width = '100%'
        }
      })
    })

    this.observer.observe(this.$refs.observer)
  },
  beforeUnmount() {
    this.observer.disconnect()
  }
}
</script>

<style scoped>
/* Estilos opcionales para el observer */
</style>
