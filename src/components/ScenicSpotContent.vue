<template>
  <div class="row">
    <div
      v-for="s in scenicSpotTotalPages"
      :key="s.ScenicSpotID"
      class="col-xl-3 col-lg-4 col-md-6 col-12"
    >
      <div class="item">
        <div class="thumb">
          <img
            v-if="!s.Picture.hasOwnProperty('PictureUrl1')"
            src="@/assets/images/no_picture_scenic_spot.jpg"
            alt="Picture"
          >
          <img
            v-else
            :src="s.Picture.PictureUrl1"
            :alt="s.Picture.PictureDescription1"
          >
          <button
            type="button"
            class="detail-btn"
            @click.prevent="openScenicSpot(s)"
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
              camera_alt
            </span>
            <p>Scenic Spot</p>
          </div>
          <h4 class="name">
            {{ s.ScenicSpotName }}
          </h4>
          <ul class="tags-all">
            <li v-if="s.City">
              <div class="tag">
                {{ s.City }}
              </div>
            </li>
            <li v-if="s.Class1">
              <div class="tag">
                {{ s.Class1 }}
              </div>
            </li>
            <li v-if="s.Class2">
              <div class="tag">
                {{ s.Class2 }}
              </div>
            </li>
            <li v-if="s.Class3">
              <div class="tag">
                {{ s.Class3 }}
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
  name: 'ScenicSpotContent',
  props: {
    scenicSpotTotalPages: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    openScenicSpot (item) {
      this.$emit('update-current-item', item)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/components/_innerContent.scss';
</style>
