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
                <p>探索您的生活，旅行您想去的地方，立即開始行動吧!</p>
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
              v-if="scenicSpotTotalData.length !== 0 || restaurantTotalData.length !== 0 || hotelTotalData.length !== 0"
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
                          v-for="s in scenicSpotTotalPages"
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
                        <el-pagination
                          background
                          layout="prev, pager, next"
                          :hide-on-single-page="pageValue"
                          :current-page="scenicSpotCurrentPage"
                          :page-size="scenicSpotPagesize"
                          :total="scenicSpotTotalData.length"
                          @current-change="scenicSpotCurrentChange"
                        />
                      </div>
                      <div
                        v-if="keyword !== ''"
                        class="status"
                      >
                        <el-pagination
                          background
                          layout="prev, pager, next"
                          :hide-on-single-page="pageValue"
                          :current-page="searchScenicSpotCurrentPage"
                          :page-size="searchScenicSpotPagesize"
                          :total="searchScenicSpotData.length"
                          @current-change="scenicSpotCurrentChange"
                        />
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
                          <p class="counter">
                            搜尋共有 <span>{{ searchRestaurantData.length }}</span> 間餐廳
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="row">
                        <div
                          v-for="r in restaurantTotalPages"
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
                        <el-pagination
                          background
                          layout="prev, pager, next"
                          :hide-on-single-page="pageValue"
                          :current-page="restaurantCurrentPage"
                          :page-size="restaurantPagesize"
                          :total="restaurantTotalData.length"
                          @current-change="restaurantCurrentChange"
                        />
                      </div>
                      <div
                        v-if="keyword !== ''"
                        class="status"
                      >
                        <el-pagination
                          background
                          layout="prev, pager, next"
                          :hide-on-single-page="pageValue"
                          :current-page="searchRestaurantCurrentPage"
                          :page-size="searchRestaurantPagesize"
                          :total="searchRestaurantData.length"
                          @current-change="restaurantCurrentChange"
                        />
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
                          <p class="counter">
                            搜尋共有 <span>{{ searchHotelData.length }}</span> 間旅宿
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="row">
                        <div
                          v-for="h in hotelTotalPages"
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
                        <el-pagination
                          background
                          layout="prev, pager, next"
                          :hide-on-single-page="pageValue"
                          :current-page="hotelCurrentPage"
                          :page-size="hotelPagesize"
                          :total="hotelTotalData.length"
                          @current-change="hotelCurrentChange"
                        />
                      </div>
                      <div
                        v-if="keyword !== ''"
                        class="status"
                      >
                        <el-pagination
                          background
                          layout="prev, pager, next"
                          :hide-on-single-page="pageValue"
                          :current-page="searchHotelCurrentPage"
                          :page-size="searchHotelPagesize"
                          :total="searchHotelData.length"
                          @current-change="hotelCurrentChange"
                        />
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
    <ScrollTop
      :scenic-spot-total-data="scenicSpotTotalData"
      :restaurant-total-data="restaurantTotalData"
      :hotel-total-data="hotelTotalData"
    />
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
      resultRestaurant: false,
      searchRestaurantData: [],
      restaurantTotalData: [],
      restaurantData: [],
      resultHotel: false,
      searchHotelData: [],
      hotelTotalData: [],
      hotelData: [],
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
      },
      pageValue: false,
      scenicSpotCurrentPage: 1,
      scenicSpotPagesize: 30,
      scenicSpotTotalPages: [],
      searchScenicSpotCurrentPage: 1,
      searchScenicSpotPagesize: 30,
      searchScenicSpotTotalPages: [],
      restaurantCurrentPage: 1,
      restaurantPagesize: 30,
      restaurantTotalPages: [],
      searchRestaurantCurrentPage: 1,
      searchRestaurantPagesize: 30,
      searchRestaurantTotalPages: [],
      hotelCurrentPage: 1,
      hotelPagesize: 30,
      hotelTotalPages: [],
      searchHotelCurrentPage: 1,
      searchHotelPagesize: 30,
      searchHotelTotalPages: []
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
      this.pageValue = false
      this.scenicSpotCurrentPage = 1
      this.scenicSpotPagesize = 30
      this.scenicSpotTotalPages = []
      this.searchScenicSpotCurrentPage = 1
      this.searchScenicSpotPagesize = 30
      this.searchScenicSpotTotalPages = []
      this.restaurantCurrentPage = 1
      this.restaurantPagesize = 30
      this.restaurantTotalPages = []
      this.searchRestaurantCurrentPage = 1
      this.searchRestaurantPagesize = 30
      this.searchRestaurantTotalPages = []
      this.hotelCurrentPage = 1
      this.hotelPagesize = 30
      this.hotelTotalPages = []
      this.searchHotelCurrentPage = 1
      this.searchHotelPagesize = 30
      this.searchHotelTotalPages = []
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
      this.pageValue = false
      this.scenicSpotCurrentPage = 1
      this.scenicSpotPagesize = 30
      this.scenicSpotTotalPages = []
      this.searchScenicSpotCurrentPage = 1
      this.searchScenicSpotPagesize = 30
      this.searchScenicSpotTotalPages = []
      this.restaurantCurrentPage = 1
      this.restaurantPagesize = 30
      this.restaurantTotalPages = []
      this.searchRestaurantCurrentPage = 1
      this.searchRestaurantPagesize = 30
      this.searchRestaurantTotalPages = []
      this.hotelCurrentPage = 1
      this.hotelPagesize = 30
      this.hotelTotalPages = []
      this.searchHotelCurrentPage = 1
      this.searchHotelPagesize = 30
      this.searchHotelTotalPages = []
      this.activeName = 'scenicSpot'
      this.scenicSpotData = []
      this.scenicSpotTotalData = []
      this.restaurantData = []
      this.restaurantTotalData = []
      this.hotelData = []
      this.hotelTotalData = []
    }
  },
  mounted () {
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  },
  methods: {
    scenicSpotCurrentChange (currentPage) {
      this.isLoading = true
      this.scrollToTabs()
      this.scenicSpotCurrentPage = currentPage
      setTimeout(() => {
        this.getScenicSpotPages()
        this.isLoading = false
      }, 1000)
    },
    restaurantCurrentChange (currentPage) {
      this.isLoading = true
      this.scrollToTabs()
      this.restaurantCurrentPage = currentPage
      setTimeout(() => {
        this.getRestaurantPages()
        this.isLoading = false
      }, 1000)
    },
    hotelCurrentChange (currentPage) {
      this.isLoading = true
      this.scrollToTabs()
      this.hotelCurrentPage = currentPage
      setTimeout(() => {
        this.getHotelPages()
        this.isLoading = false
      }, 1000)
    },
    getScenicSpotPages () {
      if (this.selected !== '') {
        const start = (this.scenicSpotCurrentPage - 1) * this.scenicSpotPagesize
        let end = start + this.scenicSpotPagesize
        if (this.scenicSpotTotalData.length <= 30) {
          end = this.scenicSpotTotalData.length
          this.pageValue = true
        }
        this.scenicSpotTotalPages = this.scenicSpotTotalData.slice(start, end)
      } else if (this.keyword !== '') {
        const start = (this.searchScenicSpotCurrentPage - 1) * this.searchScenicSpotPagesize
        let end = start + this.searchScenicSpotPagesize
        if (this.searchScenicSpotData.length <= 30) {
          end = this.searchScenicSpotData.length
          this.pageValue = true
        }
        this.scenicSpotTotalPages = this.searchScenicSpotData.slice(start, end)
      }
    },
    getRestaurantPages () {
      if (this.selected !== '') {
        const start = (this.restaurantCurrentPage - 1) * this.restaurantPagesize
        let end = start + this.restaurantPagesize
        if (this.restaurantTotalData.length <= 30) {
          end = this.restaurantTotalData.length
          this.pageValue = true
        }
        this.restaurantTotalPages = this.restaurantTotalData.slice(start, end)
      } else if (this.keyword !== '') {
        const start = (this.searchRestaurantCurrentPage - 1) * this.searchRestaurantPagesize
        let end = start + this.searchRestaurantPagesize
        if (this.searchRestaurantData.length <= 30) {
          end = this.searchRestaurantData.length
          this.pageValue = true
        }
        this.restaurantTotalPages = this.searchRestaurantData.slice(start, end)
      }
    },
    getHotelPages () {
      if (this.selected !== '') {
        const start = (this.hotelCurrentPage - 1) * this.hotelPagesize
        let end = start + this.hotelPagesize
        if (this.hotelTotalData.length <= 30) {
          end = this.hotelTotalData.length
          this.pageValue = true
        }
        this.hotelTotalPages = this.hotelTotalData.slice(start, end)
      } else if (this.keyword !== '') {
        const start = (this.searchHotelCurrentPage - 1) * this.searchHotelPagesize
        let end = start + this.searchHotelPagesize
        if (this.searchHotelData.length <= 30) {
          end = this.searchHotelData.length
          this.pageValue = true
        }
        this.hotelTotalPages = this.searchHotelData.slice(start, end)
      }
    },
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
    scrollToTabs () {
      const targetTop = $('#content').offset().top
      window.scrollTo({ top: targetTop, behavior: 'smooth' })
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
            this.scenicSpotData = this.searchScenicSpotData
            this.getScenicSpotPages()
            this.scrollToContent()
            this.searchFailed = false
            this.isLoading = false
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
            this.getScenicSpotPages()
            this.isLoading = false
          }
          this.scrollToContent()
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
            this.resultRestaurant = true
            this.isLoading = false
          } else {
            this.restaurantData = this.searchRestaurantData
            this.getRestaurantPages()
            this.scrollToContent()
            this.searchFailed = false
            this.isLoading = false
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
            this.getRestaurantPages()
            this.isLoading = false
          }
          this.scrollToContent()
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
            this.hotelData = this.searchHotelData
            this.getHotelPages()
            this.scrollToContent()
            this.searchFailed = false
            this.isLoading = false
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
            this.getHotelPages()
            this.isLoading = false
          }
          this.scrollToContent()
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
