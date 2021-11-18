<template>
  <section class="scroll-area">
    <div class="container">
      <div class="row">
        <div
          id="scroll-top"
          class="scroll-top"
          title="Scroll to top"
          @click.prevent="scrollTop"
        >
          <div class="arrow" />
          <div class="bg" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'ScrollTop',
  methods: {
    scrollTop () {
      $('html,body').animate(
        {
          scrollTop: 0
        },
        600
      )
      return false
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_scrollTop.scss';
</style>
