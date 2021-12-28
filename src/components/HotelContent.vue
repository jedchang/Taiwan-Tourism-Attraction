<template>
  <div class="row">
    <div
      v-for="h in hotelTotalPages"
      :key="h.HotelID"
      class="col-xl-3 col-lg-4 col-md-6"
    >
      <div class="item">
        <div class="thumb">
          <img
            v-if="!h.Picture.hasOwnProperty('PictureUrl1')"
            src="@/assets/images/no_picture_hotel.jpg"
            alt="Picture"
          >
          <img
            v-else
            :src="h.Picture.PictureUrl1"
            :alt="h.Picture.PictureDescription1"
          >
          <button
            type="button"
            class="detail-btn"
            @click.prevent="openHotel(h)"
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
              local_hotel
            </span>
            <p>Hotel</p>
          </div>
          <h4 class="name">
            {{ h.HotelName }}
          </h4>
          <ul class="tags-all">
            <li v-if="h.City">
              <div class="tag">
                {{ h.City }}
              </div>
            </li>
            <li v-if="h.Class">
              <div class="tag">
                {{ h.Class }}
              </div>
            </li>
            <li v-if="h.Grade">
              <div class="tag">
                {{ h.Grade }}
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
  name: 'HotelContent',
  props: {
    hotelTotalPages: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    openHotel (item) {
      this.$emit('update-current-item', item)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_innerContent.scss';
</style>
