<template>
  <div id="app">
    <loading
      color="#3986f7"
      :active.sync="isLoading"
    >
      <template slot="default">
        <LoadingLogo />
        <div class="spinner">
          <div class="bounce1" />
          <div class="bounce2" />
          <div class="bounce3" />
        </div>
      </template>
    </loading>

    <section class="banner-section">
      <div class="dot-overlay" />
      <div class="pattern-layer" />
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="content-wrap">
              <div class="title-inner">
                <div class="logo">
                  <img
                    src="@/assets/images/logo.svg"
                    alt="logo"
                  >
                  <h2>
                    Explore
                    <br>
                    Your Travel
                  </h2>
                </div>
                <p>探索您的生活，旅行您想去的地方，立即開始行動吧！</p>
              </div>
              <div class="search-inner">
                <select
                  v-model="selected"
                  :disabled="keyword !== ''"
                  class="form-control city-name"
                >
                  <option
                    value=""
                    selected
                  >
                    -- 請選擇城市 --
                  </option>
                  <option
                    v-for="city in cityData"
                    :key="city.CityID"
                    :value="city.City"
                  >
                    {{ city.CityName }}
                  </option>
                </select>
                <input
                  v-model="keyword"
                  type="text"
                  class="keyword-search"
                  :disabled="selected !== ''"
                  placeholder="-- 關鍵字搜尋 --"
                >
                <button
                  type="button"
                  class="search-btn"
                  :class="{ disable : selected === '' && keyword === '' }"
                  @click.prevent="getData"
                >
                  <span class="material-icons">
                    search
                  </span>
                  <p>Find Now</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section
      id="content"
      class="content-wrap"
    >
      <div class="container">
        <div class="row">
          <div class="col-12">
            <el-tabs
              v-if="scenicSpotData.length !== 0 || restaurantData.length !== 0 || hotelData.length !== 0"
              v-model="activeName"
              type="card"
            >
              <el-tab-pane
                name="scenicSpot"
              >
                <span
                  slot="label"
                  class="label"
                >
                  <span class="material-icons">
                    camera_alt
                  </span>
                  風景區
                </span>
                <div class="tab-content">
                  <div class="row">
                    <div class="col-12">
                      <div
                        v-if="selected"
                        class="result-info result-selected"
                      >
                        <p class="city">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          探索城市
                          <span>{{ nowCityName[0].CityName }}</span>
                        </p>
                        <div class="display">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          <p class="show">
                            目前列出 <span>{{ scenicSpotData.length }}</span> 處景點
                          </p>
                          <p class="counter">
                            全部共有 <span>{{ scenicSpotTotalData.length }}</span> 處景點
                          </p>
                        </div>
                      </div>
                      <div
                        v-if="keyword"
                        class="result-info result-keyword"
                      >
                        <p class="word">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          搜尋關鍵字
                          <span>{{ keyword }}</span>
                        </p>
                        <div
                          v-if="scenicSpotData.length === 0 && resultScenicSpot === false"
                          class="display data-search"
                        >
                          <div class="txt-search">
                            <span class="material-icons">
                              error_outline
                            </span>
                            <p class="txt">
                              搜尋中...
                            </p>
                          </div>
                        </div>
                        <div
                          v-else
                          class="display"
                        >
                          <span class="material-icons">
                            chevron_right
                          </span>
                          <p
                            v-if="searchScenicSpotData.length !== 0"
                            class="show"
                          >
                            目前列出 <span>{{ scenicSpotData.length }}</span> 處景點
                          </p>
                          <p class="counter">
                            搜尋共有 <span>{{ searchScenicSpotData.length }}</span> 處景點
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      class="col-12"
                    >
                      <div class="row">
                        <div
                          v-for="s in scenicSpotData"
                          :key="s.ID"
                          class="col-xl-3 col-lg-4 col-md-6"
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
                                {{ s.Name }}
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
                      <div
                        v-if="selected !== ''"
                        class="status"
                      >
                        <a
                          v-if="scenicSpotData.length < scenicSpotTotalData.length"
                          href="#"
                          class="load-more-btn"
                          @click.prevent="loadMoreScenicSpot()"
                        >
                          <span>讀取更多</span>
                        </a>
                      </div>
                      <div
                        v-if="keyword !== ''"
                        class="status"
                      >
                        <a
                          v-if="scenicSpotData.length < searchScenicSpotData.length"
                          href="#"
                          class="load-more-btn"
                          @click.prevent="loadMoreScenicSpot()"
                        >
                          <span>讀取更多</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane
                name="restaurant"
              >
                <span
                  slot="label"
                  class="label"
                >
                  <span class="material-icons">
                    restaurant
                  </span>
                  餐飲
                </span>
                <div class="tab-content">
                  <div class="row">
                    <div class="col-12">
                      <div
                        v-if="selected"
                        class="result-info result-selected"
                      >
                        <p class="city">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          探索城市
                          <span>{{ nowCityName[0].CityName }}</span>
                        </p>
                        <div class="display">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          <p class="show">
                            目前列出 <span>{{ restaurantData.length }}</span> 間餐廳
                          </p>
                          <p class="counter">
                            全部共有 <span>{{ restaurantTotalData.length }}</span> 間餐廳
                          </p>
                        </div>
                      </div>
                      <div
                        v-if="keyword"
                        class="result-info result-keyword"
                      >
                        <p class="word">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          搜尋關鍵字
                          <span>{{ keyword }}</span>
                        </p>
                        <div
                          v-if="restaurantData.length === 0 && resultRestaurant === false"
                          class="display data-search"
                        >
                          <div class="txt-search">
                            <span class="material-icons">
                              error_outline
                            </span>
                            <p class="txt">
                              搜尋中...
                            </p>
                          </div>
                        </div>
                        <div
                          v-else
                          class="display"
                        >
                          <span class="material-icons">
                            chevron_right
                          </span>
                          <p
                            v-if="searchRestaurantData.length !== 0"
                            class="show"
                          >
                            目前列出 <span>{{ restaurantData.length }}</span> 間餐廳
                          </p>
                          <p class="counter">
                            搜尋共有 <span>{{ searchRestaurantData.length }}</span> 間餐廳
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="row">
                        <div
                          v-for="r in restaurantData"
                          :key="r.ID"
                          class="col-xl-3 col-lg-4 col-md-6"
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
                                {{ r.Name }}
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
                      <div
                        v-if="selected !== ''"
                        class="status"
                      >
                        <a
                          v-if="restaurantData.length < restaurantTotalData.length"
                          href="#"
                          class="load-more-btn"
                          @click.prevent="loadMoreRestaurant()"
                        >
                          <span>讀取更多</span>
                        </a>
                      </div>
                      <div
                        v-if="keyword !== ''"
                        class="status"
                      >
                        <a
                          v-if="restaurantData.length < searchRestaurantData.length"
                          href="#"
                          class="load-more-btn"
                          @click.prevent="loadMoreRestaurant()"
                        >
                          <span>讀取更多</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane
                name="hotel"
              >
                <span
                  slot="label"
                  class="label"
                >
                  <span class="material-icons">
                    local_hotel
                  </span>
                  旅宿
                </span>
                <div class="tab-content">
                  <div class="row">
                    <div class="col-12">
                      <div
                        v-if="selected"
                        class="result-info result-selected"
                      >
                        <p class="city">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          探索城市
                          <span>{{ nowCityName[0].CityName }}</span>
                        </p>
                        <div class="display">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          <p class="show">
                            目前列出 <span>{{ hotelData.length }}</span> 間旅宿
                          </p>
                          <p class="counter">
                            全部共有 <span>{{ hotelTotalData.length }}</span> 間旅宿
                          </p>
                        </div>
                      </div>
                      <div
                        v-if="keyword"
                        class="result-info result-keyword"
                      >
                        <p class="word">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          搜尋關鍵字
                          <span>{{ keyword }}</span>
                        </p>
                        <div
                          v-if="hotelData.length === 0 && resultHotel === false"
                          class="display data-search"
                        >
                          <div class="txt-search">
                            <span class="material-icons">
                              error_outline
                            </span>
                            <p class="txt">
                              搜尋中...
                            </p>
                          </div>
                        </div>
                        <div
                          v-else
                          class="display"
                        >
                          <span class="material-icons">
                            chevron_right
                          </span>
                          <p
                            v-if="searchHotelData.length !== 0"
                            class="show"
                          >
                            目前列出 <span>{{ hotelData.length }}</span> 間旅宿
                          </p>
                          <p class="counter">
                            搜尋共有 <span>{{ searchHotelData.length }}</span> 間旅宿
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="row">
                        <div
                          v-for="h in hotelData"
                          :key="h.ID"
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
                                {{ h.Name }}
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
                      <div
                        v-if="selected !== ''"
                        class="status"
                      >
                        <a
                          v-if="hotelData.length < hotelTotalData.length"
                          href="#"
                          class="load-more-btn"
                          @click.prevent="loadMoreHotel()"
                        >
                          <span>讀取更多</span>
                        </a>
                      </div>
                      <div
                        v-if="keyword !== ''"
                        class="status"
                      >
                        <a
                          v-if="hotelData.length < searchHotelData.length"
                          href="#"
                          class="load-more-btn"
                          @click.prevent="loadMoreHotel()"
                        >
                          <span>讀取更多</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
            <div
              v-if="searchResult === 0 && searchFailed === false && keyword === '' && selected === ''"
              class="content-wrap no-content"
            >
              <div class="txt-info">
                <span class="material-icons">
                  error_outline
                </span>
                <p class="txt">
                  <span>請選擇一個城市</span>
                  <span>輸入關鍵字搜尋</span>
                </p>
              </div>
            </div>
            <div
              v-if="keyword !== '' && searchFailed === true && searchResult >= 3"
              class="content-wrap no-content"
            >
              <div class="txt-info">
                <span class="material-icons">
                  error_outline
                </span>
                <p class="txt no-search">
                  找不到關鍵字 "{{ keyword }}" 資料，請重新輸入!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-dialog
        :title="currentItem.Name"
        :visible.sync="visibleScenicSpot"
        :destroy-on-close="true"
      >
        <div class="content">
          <div class="thumb">
            <img
              v-if="!currentItem.Picture.hasOwnProperty('PictureUrl1')"
              src="@/assets/images/no_picture_scenic_spot.jpg"
              alt="Picture"
            >
            <img
              v-else
              :src="currentItem.Picture.PictureUrl1"
            >
          </div>
          <p class="desc">
            {{ currentItem.DescriptionDetail }}
          </p>
          <ul class="info">
            <li v-if="currentItem.Phone">
              <span class="material-icons">
                call
              </span>{{ currentItem.Phone }}
            </li>
            <li v-if="currentItem.WebsiteUrl">
              <span class="material-icons">
                public
              </span>
              <a
                :href="currentItem.WebsiteUrl"
                target="_blank"
                class="website"
              > {{ currentItem.WebsiteUrl }}</a>
            </li>
            <li v-if="currentItem.Position">
              <span class="material-icons">
                place
              </span>
              <a
                :href="`https://www.google.com/maps/dir/${currentItem.Position.PositionLat},${currentItem.Position.PositionLon}`"
                class="map"
                target="_blank"
              >Google Map</a>
            </li>
          </ul>
        </div>
      </el-dialog>
      <el-dialog
        :title="currentItem.Name"
        :visible.sync="visibleRestaurant"
        :destroy-on-close="true"
      >
        <div class="content">
          <div class="thumb">
            <img
              v-if="!currentItem.Picture.hasOwnProperty('PictureUrl1')"
              src="@/assets/images/no_picture_restaurant.jpg"
              alt="Picture"
            >
            <img
              v-else
              :src="currentItem.Picture.PictureUrl1"
            >
          </div>
          <p class="desc">
            {{ currentItem.Description }}
          </p>
          <ul class="info">
            <li v-if="currentItem.Address">
              <span class="material-icons">
                storefront
              </span>{{ currentItem.Address }}
            </li>
            <li v-if="currentItem.Phone">
              <span class="material-icons">
                call
              </span>{{ currentItem.Phone }}
            </li>
            <li v-if="currentItem.OpenTime">
              <span class="material-icons">
                schedule
              </span>{{ currentItem.OpenTime }}
            </li>
            <li v-if="currentItem.ParkingInfo">
              <span class="material-icons">
                local_parking
              </span>{{ currentItem.ParkingInfo }}
            </li>
            <li v-if="currentItem.WebsiteUrl">
              <span class="material-icons">
                public
              </span>
              <a
                :href="currentItem.WebsiteUrl"
                target="_blank"
                class="website"
              > {{ currentItem.WebsiteUrl }}</a>
            </li>
            <li v-if="currentItem.Position">
              <span class="material-icons">
                place
              </span>
              <a
                :href="`https://www.google.com/maps/dir/${currentItem.Position.PositionLat},${currentItem.Position.PositionLon}`"
                class="map"
                target="_blank"
              >Google Map</a>
            </li>
          </ul>
        </div>
      </el-dialog>
      <el-dialog
        :title="currentItem.Name"
        :visible.sync="visibleHotel"
        :destroy-on-close="true"
      >
        <div class="content">
          <div class="thumb">
            <img
              v-if="!currentItem.Picture.hasOwnProperty('PictureUrl1')"
              src="@/assets/images/no_picture_hotel.jpg"
              alt="Picture"
            >
            <img
              v-else
              :src="currentItem.Picture.PictureUrl1"
            >
          </div>
          <p class="desc">
            {{ currentItem.Description }}
          </p>
          <ul class="info">
            <li v-if="currentItem.Address">
              <span class="material-icons">
                storefront
              </span>{{ currentItem.Address }}
            </li>
            <li v-if="currentItem.Phone">
              <span class="material-icons">
                call
              </span>{{ currentItem.Phone }}
            </li>
            <li v-if="currentItem.Fax">
              <span class="material-icons">
                fax
              </span>{{ currentItem.Fax }}
            </li>
            <li v-if="currentItem.Grade">
              <span class="material-icons">
                grade
              </span>{{ currentItem.Grade }}
            </li>
            <li v-if="currentItem.ParkingInfo">
              <span class="material-icons">
                local_parking
              </span>{{ currentItem.ParkingInfo }}
            </li>
            <li v-if="currentItem.ServiceInfo ">
              <span class="material-icons">
                verified
              </span>{{ currentItem.ServiceInfo }}
            </li>
            <li v-if="currentItem.WebsiteUrl">
              <span class="material-icons">
                public
              </span>
              <a
                :href="currentItem.WebsiteUrl"
                target="_blank"
                class="website"
              > {{ currentItem.WebsiteUrl }}</a>
            </li>
            <li v-if="currentItem.Position">
              <span class="material-icons">
                place
              </span>
              <a
                :href="`https://www.google.com/maps/dir/${currentItem.Position.PositionLat},${currentItem.Position.PositionLon}`"
                class="map"
                target="_blank"
              >Google Map</a>
            </li>
          </ul>
        </div>
      </el-dialog>
    </section>
    <Footer />
    <ScrollTop />
  </div>
</template>

<script>
// @ is an alias to /src
import city from '@/data/city.json'
import jsSHA from 'jssha'
import Footer from '@/components/Footer'
import ScrollTop from '@/components/ScrollTop'
import LoadingLogo from '@/components/LoadingLogo'
import $ from 'jquery'

export default {
  name: 'Home',
  components: {
    Footer,
    ScrollTop,
    LoadingLogo
  },
  data () {
    return {
      isLoading: false,
      searchFailed: false,
      cityData: city,
      selected: '',
      keyword: '',
      searchResult: 0,
      resultScenicSpot: false,
      searchScenicSpotData: [],
      scenicSpotTotalData: [],
      scenicSpotData: [],
      qtyScenicSpot: 30,
      resultRestaurant: false,
      searchRestaurantData: [],
      restaurantTotalData: [],
      restaurantData: [],
      qtyRestaurant: 30,
      resultHotel: false,
      searchHotelData: [],
      hotelTotalData: [],
      hotelData: [],
      qtyHotel: 30,
      activeName: 'scenicSpot',
      visibleScenicSpot: false,
      visibleRestaurant: false,
      visibleHotel: false,
      currentItem: {
        Name: '',
        Picture: {
          PictureUrl1: ''
        },
        Phone: '',
        WebsiteUrl: '',
        Position: {
          PositionLat: '',
          PositionLon: ''
        }
      }
    }
  },
  computed: {
    nowCityName () {
      const filterCityName = this.cityData.filter(item => {
        return item.City === this.selected
      })
      return filterCityName
    }
  },
  watch: {
    selected () {
      this.searchResult = 0
      this.searchFailed = false
      this.qtyScenicSpot = 30
      this.qtyRestaurant = 30
      this.qtyHotel = 30
      this.activeName = 'scenicSpot'
      this.scenicSpotData = []
      this.scenicSpotTotalData = []
      this.restaurantData = []
      this.restaurantTotalData = []
      this.hotelData = []
      this.hotelTotalData = []
    },
    keyword () {
      this.searchResult = 0
      this.searchFailed = false
      this.qtyScenicSpot = 30
      this.qtyRestaurant = 30
      this.qtyHotel = 30
      this.activeName = 'scenicSpot'
      this.resultScenicSpot = false
      this.scenicSpotData = []
      this.scenicSpotTotalData = []
      this.searchScenicSpotData = []
      this.resultRestaurant = false
      this.restaurantData = []
      this.restaurantTotalData = []
      this.searchRestaurantData = []
      this.resultHotel = false
      this.hotelData = []
      this.hotelTotalData = []
      this.searchHotelData = []
    }
  },
  mounted () {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  },
  methods: {
    getData () {
      if (this.selected !== '') {
        this.getScenicSpotData()
        this.getRestaurantData()
        this.getHotelData()
      }
      if (this.keyword !== '') {
        this.getSearchScenicSpotData()
        this.getSearchRestaurantData()
        this.getSearchHotelData()
      }
    },
    keywordSearch (e) {
      const reg = new RegExp(e.target.value, 'gi')
      this.keyword = reg
    },
    scrollToContent () {
      const targetTop = $('#content').offset().top
      $('html,body').animate({
        scrollTop: targetTop
      }, 600)
    },
    openScenicSpot (item) {
      this.currentItem = item
      this.visibleScenicSpot = true
    },
    openRestaurant (item) {
      this.currentItem = item
      this.visibleRestaurant = true
    },
    openHotel (item) {
      this.currentItem = item
      this.visibleHotel = true
    },
    loadMoreScenicSpot () {
      this.qtyScenicSpot = this.qtyScenicSpot + 30
      if (this.selected) this.getScenicSpotData()
      if (this.keyword) this.getSearchScenicSpotData()
    },
    loadMoreRestaurant () {
      this.qtyRestaurant = this.qtyRestaurant + 30
      if (this.selected) this.getRestaurantData()
      if (this.keyword) this.getSearchRestaurantData()
    },
    loadMoreHotel () {
      this.qtyHotel = this.qtyHotel + 30
      if (this.selected) this.getHotelData()
      if (this.keyword) this.getSearchHotelData()
    },
    getSearchScenicSpotData () {
      this.isLoading = true
      this.axios({
        method: 'get',
        url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$format=JSON',
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.scenicSpotTotalData = res.data
          this.scenicSpotTotalData.forEach(item => {
            item.Name = item.Name.replace(/_|ˍ/g, ' ')
          })
          this.searchScenicSpotData = this.scenicSpotTotalData.filter(value => value.Name.match(this.keyword))
          if (this.searchScenicSpotData.length === 0) {
            this.scrollToContent()
            this.searchResult += 1
            this.searchFailed = true
            this.resultScenicSpot = true
            this.isLoading = false
          } else {
            this.searchFailed = false
            this.isLoading = false
            this.scenicSpotData = this.searchScenicSpotData.slice(0, this.qtyScenicSpot)
            if (this.scenicSpotData.length <= 30) {
              this.scrollToContent()
            }
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getScenicSpotData () {
      this.isLoading = true
      const currentCity = this.selected
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${currentCity}?&$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.scenicSpotTotalData = res.data
          this.scenicSpotTotalData.forEach(item => {
            item.Name = item.Name.replace(/_|ˍ/g, ' ')
          })
          if (this.scenicSpotTotalData.length > 0) {
            this.isLoading = false
          }
          this.scenicSpotData = this.scenicSpotTotalData.slice(0, this.qtyScenicSpot)
          if (this.scenicSpotData.length <= 30) {
            this.scrollToContent()
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getSearchRestaurantData () {
      this.isLoading = true
      this.axios({
        method: 'get',
        url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$format=JSON',
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.restaurantTotalData = res.data
          this.restaurantTotalData.forEach(item => {
            item.Name = item.Name.replace(/_|ˍ/g, ' ')
          })
          this.searchRestaurantData = this.restaurantTotalData.filter(value => value.Name.match(this.keyword))
          if (this.searchRestaurantData.length === 0) {
            this.scrollToContent()
            this.searchResult += 1
            this.searchFailed = true
            this.resultRestaurant = TextTrackCueList
            this.isLoading = false
          } else {
            this.searchFailed = false
            this.isLoading = false
            this.restaurantData = this.searchRestaurantData.slice(0, this.qtyRestaurant)
            if (this.restaurantData.length <= 30) {
              this.scrollToContent()
            }
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getRestaurantData () {
      this.isLoading = true
      const currentCity = this.selected
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant/${currentCity}?&$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.restaurantTotalData = res.data
          this.restaurantTotalData.forEach(item => {
            item.Name = item.Name.replace(/_|ˍ/g, ' ')
          })
          if (this.restaurantTotalData.length > 0) {
            this.isLoading = false
          }
          this.restaurantData = this.restaurantTotalData.slice(0, this.qtyRestaurant)
          if (this.restaurantData.length <= 30) {
            this.scrollToContent()
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getSearchHotelData () {
      this.isLoading = true
      this.axios({
        method: 'get',
        url: 'https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel?$format=JSON',
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.hotelTotalData = res.data
          this.hotelTotalData.forEach(item => {
            item.Name = item.Name.replace(/_|ˍ/g, ' ')
          })
          this.searchHotelData = this.hotelTotalData.filter(value => value.Name.match(this.keyword))
          if (this.searchHotelData.length === 0) {
            this.scrollToContent()
            this.searchResult += 1
            this.searchFailed = true
            this.resultHotel = true
            this.isLoading = false
          } else {
            this.searchFailed = false
            this.isLoading = false
            this.hotelData = this.searchHotelData.slice(0, this.qtyHotel)
            if (this.hotelData.length <= 30) {
              this.scrollToContent()
            }
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getHotelData () {
      this.isLoading = true
      const currentCity = this.selected
      this.axios({
        method: 'get',
        url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Hotel/${currentCity}?&$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.hotelTotalData = res.data
          this.hotelTotalData.forEach(item => {
            item.Name = item.Name.replace(/_|ˍ/g, ' ')
          })
          if (this.hotelTotalData.length > 0) {
            this.isLoading = false
          }
          this.hotelData = this.hotelTotalData.slice(0, this.qtyHotel)
          if (this.hotelData.length <= 30) {
            this.scrollToContent()
          }
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    getAuthorizationHeader () {
      const AppID = process.env.VUE_APP_APPID
      const AppKey = process.env.VUE_APP_APPKEY
      const GMTString = new Date().toGMTString()
      const ShaObj = new jsSHA('SHA-1', 'TEXT')
      ShaObj.setHMACKey(AppKey, 'TEXT')
      ShaObj.update('x-date: ' + GMTString)
      const HMAC = ShaObj.getHMAC('B64')
      const Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"'
      return { Authorization: Authorization, 'X-Date': GMTString }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Icons');
@import url('https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css');
@import url("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap-grid.min.css");
@import './assets/scss/main.scss';
</style>
