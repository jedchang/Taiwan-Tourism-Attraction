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
              <!-- 風景區 -->
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
                      <!-- 選擇城市顯示結果 -->
                      <div
                        v-if="selected"
                        class="result-info result-selected"
                      >
                        <p class="city">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          <span class="title">探索城市</span>
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
                      <!-- 關鍵字查詢顯示結果 -->
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
                      <ScenicSpotContent
                        :scenic-spot-total-pages="scenicSpotTotalPages"
                        @update-current-item="openScenicSpot"
                      />
                      <!-- selected 分頁 -->
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
                      <!-- keyword 分頁 -->
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

              <!-- 餐飲 -->
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
                      <!-- 選擇城市顯示結果 -->
                      <div
                        v-if="selected"
                        class="result-info result-selected"
                      >
                        <p class="city">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          <span class="title">探索城市</span>
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
                      <!-- 關鍵字查詢顯示結果 -->
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
                      <RestaurantContent
                        :restaurant-total-pages="restaurantTotalPages"
                        @update-current-item="openRestaurant"
                      />
                      <!-- selected 分頁 -->
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
                      <!-- keyword 分頁 -->
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

              <!-- 旅宿 -->
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
                      <!-- 選擇城市顯示結果 -->
                      <div
                        v-if="selected"
                        class="result-info result-selected"
                      >
                        <p class="city">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          <span class="title">探索城市</span>
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
                      <!-- 關鍵字查詢顯示結果 -->
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
                      <HotelContent
                        :hotel-total-pages="hotelTotalPages"
                        @update-current-item="openHotel"
                      />
                      <!-- selected 分頁 -->
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
                      <!-- keyword 分頁 -->
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

            <!-- 都沒有選擇城市/關鍵字時顯示 -->
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

            <!-- 找不到關鍵字資料 -->
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
      <!-- dialog scenicSpot -->
      <el-dialog
        :title="currentItem.ScenicSpotName"
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
      <!-- dialog restaurant -->
      <el-dialog
        :title="currentItem.RestaurantName"
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
      <!-- dialog hotel -->
      <el-dialog
        :title="currentItem.HotelName"
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
import ScenicSpotContent from '@/components/ScenicSpotContent'
import RestaurantContent from '@/components/RestaurantContent'
import HotelContent from '@/components/HotelContent'
import Footer from '@/components/Footer'
import ScrollTop from '@/components/ScrollTop'
import LoadingLogo from '@/components/LoadingLogo'
import $ from 'jquery'

export default {
  name: 'Home',
  components: {
    ScenicSpotContent,
    RestaurantContent,
    HotelContent,
    Footer,
    ScrollTop,
    LoadingLogo
  },
  data () {
    return {
      isLoading: false,
      searchFailed: false,
      cityData: city,
      selected: '', // 不能設為 null，不然 option 預設內容不會顯示
      keyword: '',
      searchResult: 0, // 判斷找不到資料 (景點找不到+1、餐廳找不到+1、旅宿找不到+1)
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
          PictureUrl1: '' // 要先定義，不然會報錯
        },
        Phone: '',
        WebsiteUrl: '',
        Position: {
          PositionLat: '',
          PositionLon: ''
        }
      },
      pageValue: false, // 只有一頁就隱藏分頁 = true
      scenicSpotCurrentPage: 1, // scenicSpot 初始頁
      scenicSpotPagesize: 32, // scenicSpot 每頁的數量
      scenicSpotTotalPages: [], // scenicSpot 頁面全部數量
      searchScenicSpotCurrentPage: 1, // search-scenicSpot 初始頁
      searchScenicSpotPagesize: 32, // search-scenicSpot 每頁的數量
      searchScenicSpotTotalPages: [], // search-scenicSpot 頁面全部數量
      restaurantCurrentPage: 1,
      restaurantPagesize: 32,
      restaurantTotalPages: [],
      searchRestaurantCurrentPage: 1,
      searchRestaurantPagesize: 32,
      searchRestaurantTotalPages: [],
      hotelCurrentPage: 1,
      hotelPagesize: 32,
      hotelTotalPages: [],
      searchHotelCurrentPage: 1,
      searchHotelPagesize: 32,
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
      // 當重新選擇地區時，數量重設
      this.pageValue = false
      this.scenicSpotCurrentPage = 1
      this.scenicSpotPagesize = 32
      this.scenicSpotTotalPages = []
      this.searchScenicSpotCurrentPage = 1
      this.searchScenicSpotPagesize = 32
      this.searchScenicSpotTotalPages = []
      this.restaurantCurrentPage = 1
      this.restaurantPagesize = 32
      this.restaurantTotalPages = []
      this.searchRestaurantCurrentPage = 1
      this.searchRestaurantPagesize = 32
      this.searchRestaurantTotalPages = []
      this.hotelCurrentPage = 1
      this.hotelPagesize = 32
      this.hotelTotalPages = []
      this.searchHotelCurrentPage = 1
      this.searchHotelPagesize = 32
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
      // 當重新輸入關鍵字時，數量重設
      this.pageValue = false
      this.scenicSpotCurrentPage = 1
      this.scenicSpotPagesize = 32
      this.scenicSpotTotalPages = []
      this.searchScenicSpotCurrentPage = 1
      this.searchScenicSpotPagesize = 32
      this.searchScenicSpotTotalPages = []
      this.restaurantCurrentPage = 1
      this.restaurantPagesize = 32
      this.restaurantTotalPages = []
      this.searchRestaurantCurrentPage = 1
      this.searchRestaurantPagesize = 32
      this.searchRestaurantTotalPages = []
      this.hotelCurrentPage = 1
      this.hotelPagesize = 32
      this.hotelTotalPages = []
      this.searchHotelCurrentPage = 1
      this.searchHotelPagesize = 32
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
    // 初始化 API 驗證
    this.getAuthorizationHeader()
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  },
  methods: {
    // scenicSpotCurrentPage 改變觸發
    scenicSpotCurrentChange (currentPage) {
      this.isLoading = true
      this.scrollToTabs()
      this.scenicSpotCurrentPage = currentPage
      this.searchScenicSpotCurrentPage = currentPage
      setTimeout(() => {
        this.getScenicSpotPages()
        this.isLoading = false
      }, 1000)
    },
    restaurantCurrentChange (currentPage) {
      this.isLoading = true
      this.scrollToTabs()
      this.restaurantCurrentPage = currentPage
      this.searchRestaurantCurrentPage = currentPage
      setTimeout(() => {
        this.getRestaurantPages()
        this.isLoading = false
      }, 1000)
    },
    hotelCurrentChange (currentPage) {
      this.isLoading = true
      this.scrollToTabs()
      this.hotelCurrentPage = currentPage
      this.searchHotelCurrentPage = currentPage
      setTimeout(() => {
        this.getHotelPages()
        this.isLoading = false
      }, 1000)
    },
    // scenicSpotTotalData 中取得每頁顯示筆數範圍
    getScenicSpotPages () {
      if (this.selected !== '') {
        const start = (this.scenicSpotCurrentPage - 1) * this.scenicSpotPagesize
        let end = start + this.scenicSpotPagesize
        // 如果搜尋筆數小於等於最少 32 筆，就顯示 searchScenicSpotData 長度，只有一頁就隱藏分頁
        if (this.scenicSpotTotalData.length <= 32) {
          end = this.scenicSpotTotalData.length
          this.pageValue = true
        }
        // 依照目前所在頁面動態取得數量範圍
        this.scenicSpotTotalPages = this.scenicSpotTotalData.slice(start, end)
      } else if (this.keyword !== '') {
        const start = (this.searchScenicSpotCurrentPage - 1) * this.searchScenicSpotPagesize
        let end = start + this.searchScenicSpotPagesize
        if (this.searchScenicSpotData.length <= 32) {
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
        if (this.restaurantTotalData.length <= 32) {
          end = this.restaurantTotalData.length
          this.pageValue = true
        }
        this.restaurantTotalPages = this.restaurantTotalData.slice(start, end)
      } else if (this.keyword !== '') {
        const start = (this.searchRestaurantCurrentPage - 1) * this.searchRestaurantPagesize
        let end = start + this.searchRestaurantPagesize
        if (this.searchRestaurantData.length <= 32) {
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
        if (this.hotelTotalData.length <= 32) {
          end = this.hotelTotalData.length
          this.pageValue = true
        }
        this.hotelTotalPages = this.hotelTotalData.slice(start, end)
      } else if (this.keyword !== '') {
        const start = (this.searchHotelCurrentPage - 1) * this.searchHotelPagesize
        let end = start + this.searchHotelPagesize
        if (this.searchHotelData.length <= 32) {
          end = this.searchHotelData.length
          this.pageValue = true
        }
        this.hotelTotalPages = this.searchHotelData.slice(start, end)
      }
    },
    getData () {
      // 執行前先清空 pagination
      this.pageValue = true
      this.scenicSpotTotalData = []
      this.searchScenicSpotData = []
      this.restaurantTotalData = []
      this.searchRestaurantData = []
      this.hotelTotalData = []
      this.searchHotelData = []

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
      const reg = new RegExp(e.target.value, 'gi') // 全域 (Global) 比對並忽略大小寫 (Ignore case)
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
        url: 'https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?$format=JSON',
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.scenicSpotTotalData = res.data
          this.scenicSpotTotalData.forEach(item => {
            // 去除名字上的下底線 "_"
            item.ScenicSpotName = item.ScenicSpotName.replace(/_|ˍ/g, ' ')
          })
          // 比對關鍵字，只要有 return 就要有值去接它
          this.searchScenicSpotData = this.scenicSpotTotalData.filter(value => value.ScenicSpotName.match(this.keyword))
          if (this.searchScenicSpotData.length === 0) {
            console.log('this.searchScenicSpotData.length === 0')
            this.scrollToContent()
            this.searchResult += 1
            this.searchFailed = true // 搜尋不到資料
            this.resultScenicSpot = true // 紀錄 ScenicSpot 沒有搜尋到資料
            this.isLoading = false
          } else {
            // 取得 ScenicSpot 分頁資訊
            this.scenicSpotData = this.searchScenicSpotData
            this.getScenicSpotPages()
            this.scrollToContent()
            this.searchFailed = false
            this.isLoading = false
          }
        })
        .catch(err => {
        // 需加上 response 才能傳送失敗結果
          console.log(err.response)
        })
    },
    getScenicSpotData () {
      this.isLoading = true
      const currentCity = this.selected
      this.axios({
        method: 'get',
        url: `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/${currentCity}?&$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.scenicSpotTotalData = res.data
          this.scenicSpotTotalData.forEach(item => {
            // 去除名字上的下底線 "_、ˍ"
            item.ScenicSpotName = item.ScenicSpotName.replace(/_|ˍ/g, ' ')
          })
          // 當資料完成後，再取消讀取畫面
          if (this.scenicSpotTotalData.length > 0) {
            // 取得 ScenicSpot 分頁資訊
            this.getScenicSpotPages()
            this.isLoading = false
          }
          this.scrollToContent()
        })
        .catch(err => {
        // 需加上 response 才能傳送失敗結果
          console.log(err.response)
        })
    },
    getSearchRestaurantData () {
      this.isLoading = true
      this.axios({
        method: 'get',
        url: 'https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant?$format=JSON',
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.restaurantTotalData = res.data
          this.restaurantTotalData.forEach(item => {
            item.RestaurantName = item.RestaurantName.replace(/_|ˍ/g, ' ')
          })
          this.searchRestaurantData = this.restaurantTotalData.filter(value => value.RestaurantName.match(this.keyword))
          if (this.searchRestaurantData.length === 0) {
            this.scrollToContent()
            this.searchResult += 1
            this.searchFailed = true
            this.resultRestaurant = true // 紀錄 Restaurant 沒有搜尋到資料
            this.isLoading = false
          } else {
            // 取得 restaurant 分頁資訊
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
        url: `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${currentCity}?&$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.restaurantTotalData = res.data
          this.restaurantTotalData.forEach(item => {
            item.RestaurantName = item.RestaurantName.replace(/_|ˍ/g, ' ')
          })
          if (this.restaurantTotalData.length > 0) {
            // 取得 restaurant 分頁資訊
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
        url: 'https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel?$format=JSON',
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.hotelTotalData = res.data
          this.hotelTotalData.forEach(item => {
            item.HotelName = item.HotelName.replace(/_|ˍ/g, ' ')
          })
          this.searchHotelData = this.hotelTotalData.filter(value => value.HotelName.match(this.keyword))
          if (this.searchHotelData.length === 0) {
            this.scrollToContent()
            this.searchResult += 1
            this.searchFailed = true
            this.resultHotel = true // 紀錄 Hotel 沒有搜尋到資料
            this.isLoading = false
          } else {
            // 取得 hotel 分頁資訊
            this.hotelData = this.searchHotelData
            this.getHotelPages()
            this.scrollToContent()
            this.searchFailed = false
            this.isLoading = false
          }
        })
        .catch(err => {
        // 需加上 response 才能傳送失敗結果
          console.log(err.response)
        })
    },
    getHotelData () {
      this.isLoading = true
      const currentCity = this.selected
      this.axios({
        method: 'get',
        url: `https://tdx.transportdata.tw/api/basic/v2/Tourism/Hotel/${currentCity}?&$format=JSON`,
        headers: this.getAuthorizationHeader()
      })
        .then(res => {
          this.hotelTotalData = res.data
          this.hotelTotalData.forEach(item => {
            item.HotelName = item.HotelName.replace(/_|ˍ/g, ' ')
          })
          if (this.hotelTotalData.length > 0) {
            // 取得 hotel 分頁資訊
            this.getHotelPages()
            this.isLoading = false
          }
          this.scrollToContent()
        })
        .catch(err => {
          console.log(err.response)
        })
    },
    // API 驗證
    getAuthorizationHeader () {
      const parameter = {
        grant_type: 'client_credentials',
        client_id: process.env.VUE_APP_CLIENTID,
        client_secret: process.env.VUE_APP_CLIENTSECRET
      }
      this.axios({
        method: 'POST',
        url: process.env.VUE_APP_AUTHURL,
        dataType: 'JSON',
        data: this.$qs.stringify(parameter), // 需搭配 qs 才能順利將 content-type 改為 application/x-www-form-urlencoded
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          this.axios.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`
          // 取得 API 資料
          // this.getGeometry()
          // this.getRouteName()
          // this.getEstimatedTimeOfArrival()
          // this.getStopOfRoute()
        })
        .catch(err => {
          console.log(err)
        })
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
