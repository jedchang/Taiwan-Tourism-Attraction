<template>
  <section class="scroll-area">
    <div class="container">
      <div class="row">
        <div
          v-if="scenicSpotTotalData.length !== 0 || restaurantTotalData.length !== 0 || hotelTotalData.length !== 0"
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
  props: {
    scenicSpotTotalData: {
      type: Array,
      default: () => []
    },
    restaurantTotalData: {
      type: Array,
      default: () => []
    },
    hotelTotalData: {
      type: Array,
      default: () => []
    }
  },
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
