<template>
  <div class="row">
    <div
      v-for="r in restaurantTotalPages"
      :key="r.RestaurantID"
      class="col-xl-3 col-lg-4 col-md-6 col-12"
    >
      <div class="item">
        <div class="thumb">
          <img
            v-if="!r.Picture.hasOwnProperty('PictureUrl1')"
            src="@/assets/images/no_picture_restaurant.jpg"
            alt="Picture"
          >
          <img
            v-else
            :src="r.Picture.PictureUrl1"
            :alt="r.Picture.PictureDescription1"
          >
          <button
            type="button"
            class="detail-btn"
            @click.prevent="openRestaurant(r)"
          >
            <span class="material-icons">
              visibility
            </span>
            <span>觀看詳情</span>
          </button>
        </div>
        <div class="content">
          <div class="category">
            <span class="material-icons">
              restaurant
            </span>
            <p>Restaurant</p>
          </div>
          <h4 class="name">
            {{ r.RestaurantName }}
          </h4>
          <ul class="tags-all">
            <li v-if="r.City">
              <div class="tag">
                {{ r.City }}
              </div>
            </li>
            <li v-if="r.Class">
              <div class="tag">
                {{ r.Class }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RestaurantContent',
  props: {
    restaurantTotalPages: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    openRestaurant (item) {
      this.$emit('update-current-item', item)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_innerContent.scss';
</style>
