<template>
  <div id="app">
    <loading color="#3986f7" :active.sync="isLoading">
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
                  <img src="@/assets/images/logo.svg" alt="logo" />
                  <h2>
                    Explore
                    <br />
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
                  <option value="" selected>
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
                />
                <button
                  type="button"
                  class="search-btn"
                  :class="{ disable: selected === '' && keyword === '' }"
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

    <section id="content" class="content-wrap">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <el-tabs
              v-if="
                scenicSpotTotalData.length !== 0 ||
                  restaurantTotalData.length !== 0 ||
                  hotelTotalData.length !== 0
              "
              v-model="activeName"
              type="card"
            >
              <!-- 風景區 -->
              <el-tab-pane name="scenicSpot">
                <span slot="label" class="label">
                  <span class="material-icons">
                    camera_alt
                  </span>
                  風景區
                </span>
                <div class="tab-content">
                  <div class="row">
                    <div class="col-12">
                      <!-- 選擇城市顯示結果 -->
                      <div v-if="selected" class="result-info result-selected">
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
                            全部共有
                            <span>{{ scenicSpotTotalData.length }}</span> 處景點
                          </p>
                        </div>
                      </div>
                      <!-- 關鍵字查詢顯示結果 -->
                      <div v-if="keyword" class="result-info result-keyword">
                        <p class="word">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          搜尋關鍵字
                          <span>{{ keyword }}</span>
                        </p>
                        <div
                          v-if="
                            scenicSpotData.length === 0 &&
                              resultScenicSpot === false
                          "
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
                        <div v-else class="display">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          <p class="counter">
                            搜尋共有
                            <span>{{ searchScenicSpotData.length }}</span>
                            處景點
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="col-12">
                      <ScenicSpotContent
                        :scenic-spot-total-pages="scenicSpotTotalPages"
                        @update-current-item="openScenicSpot"
                      />
                      <!-- selected 分頁 -->
                      <div v-if="selected !== ''" class="status">
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
                      <div v-if="keyword !== ''" class="status">
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
              <el-tab-pane name="restaurant">
                <span slot="label" class="label">
                  <span class="material-icons">
                    restaurant
                  </span>
                  餐飲
                </span>
                <div class="tab-content">
                  <div class="row">
                    <div class="col-12">
                      <!-- 選擇城市顯示結果 -->
                      <div v-if="selected" class="result-info result-selected">
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
                            全部共有
                            <span>{{ restaurantTotalData.length }}</span> 間餐廳
                          </p>
                        </div>
                      </div>
                      <!-- 關鍵字查詢顯示結果 -->
                      <div v-if="keyword" class="result-info result-keyword">
                        <p class="word">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          搜尋關鍵字
                          <span>{{ keyword }}</span>
                        </p>
                        <div
                          v-if="
                            restaurantData.length === 0 &&
                              resultRestaurant === false
                          "
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
                        <div v-else class="display">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          <p class="counter">
                            搜尋共有
                            <span>{{ searchRestaurantData.length }}</span>
                            間餐廳
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
                      <div v-if="selected !== ''" class="status">
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
                      <div v-if="keyword !== ''" class="status">
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
              <el-tab-pane name="hotel">
                <span slot="label" class="label">
                  <span class="material-icons">
                    local_hotel
                  </span>
                  旅宿
                </span>
                <div class="tab-content">
                  <div class="row">
                    <div class="col-12">
                      <!-- 選擇城市顯示結果 -->
                      <div v-if="selected" class="result-info result-selected">
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
                            全部共有
                            <span>{{ hotelTotalData.length }}</span> 間旅宿
                          </p>
                        </div>
                      </div>
                      <!-- 關鍵字查詢顯示結果 -->
                      <div v-if="keyword" class="result-info result-keyword">
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
                        <div v-else class="display">
                          <span class="material-icons">
                            chevron_right
                          </span>
                          <p class="counter">
                            搜尋共有
                            <span>{{ searchHotelData.length }}</span> 間旅宿
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
                      <div v-if="selected !== ''" class="status">
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
                      <div v-if="keyword !== ''" class="status">
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
              v-if="
                searchResult === 0 &&
                  searchFailed === false &&
                  keyword === '' &&
                  selected === ''
              "
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
              v-if="
                keyword !== '' && searchFailed === true && searchResult >= 3
              "
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
            />
            <img v-else :src="currentItem.Picture.PictureUrl1" />
          </div>
          <p class="desc">
            {{ currentItem.DescriptionDetail }}
          </p>
          <ul class="info">
            <li v-if="currentItem.Phone">
              <span class="material-icons"> call </span>{{ currentItem.Phone }}
            </li>
            <li v-if="currentItem.WebsiteUrl">
              <span class="material-icons">
                public
              </span>
              <a :href="currentItem.WebsiteUrl" target="_blank" class="website">
                {{ currentItem.WebsiteUrl }}</a
              >
            </li>
            <li v-if="currentItem.Position">
              <span class="material-icons">
                place
              </span>
              <a
                :href="
                  `https://www.google.com/maps/dir/${currentItem.Position.PositionLat},${currentItem.Position.PositionLon}`
                "
                class="map"
                target="_blank"
                >Google Map</a
              >
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
            />
            <img v-else :src="currentItem.Picture.PictureUrl1" />
          </div>
          <p class="desc">
            {{ currentItem.Description }}
          </p>
          <ul class="info">
            <li v-if="currentItem.Address">
              <span class="material-icons"> storefront </span
              >{{ currentItem.Address }}
            </li>
            <li v-if="currentItem.Phone">
              <span class="material-icons"> call </span>{{ currentItem.Phone }}
            </li>
            <li v-if="currentItem.OpenTime">
              <span class="material-icons"> schedule </span
              >{{ currentItem.OpenTime }}
            </li>
            <li v-if="currentItem.ParkingInfo">
              <span class="material-icons"> local_parking </span
              >{{ currentItem.ParkingInfo }}
            </li>
            <li v-if="currentItem.WebsiteUrl">
              <span class="material-icons">
                public
              </span>
              <a :href="currentItem.WebsiteUrl" target="_blank" class="website">
                {{ currentItem.WebsiteUrl }}</a
              >
            </li>
            <li v-if="currentItem.Position">
              <span class="material-icons">
                place
              </span>
              <a
                :href="
                  `https://www.google.com/maps/dir/${currentItem.Position.PositionLat},${currentItem.Position.PositionLon}`
                "
                class="map"
                target="_blank"
                >Google Map</a
              >
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
            />
            <img v-else :src="currentItem.Picture.PictureUrl1" />
          </div>
          <p class="desc">
            {{ currentItem.Description }}
          </p>
          <ul class="info">
            <li v-if="currentItem.Address">
              <span class="material-icons"> storefront </span
              >{{ currentItem.Address }}
            </li>
            <li v-if="currentItem.Phone">
              <span class="material-icons"> call </span>{{ currentItem.Phone }}
            </li>
            <li v-if="currentItem.Fax">
              <span class="material-icons"> fax </span>{{ currentItem.Fax }}
            </li>
            <li v-if="currentItem.Grade">
              <span class="material-icons"> grade </span>{{ currentItem.Grade }}
            </li>
            <li v-if="currentItem.ParkingInfo">
              <span class="material-icons"> local_parking </span
              >{{ currentItem.ParkingInfo }}
            </li>
            <li v-if="currentItem.ServiceInfo">
              <span class="material-icons"> verified </span
              >{{ currentItem.ServiceInfo }}
            </li>
            <li v-if="currentItem.WebsiteUrl">
              <span class="material-icons">
                public
              </span>
              <a :href="currentItem.WebsiteUrl" target="_blank" class="website">
                {{ currentItem.WebsiteUrl }}</a
              >
            </li>
            <li v-if="currentItem.Position">
              <span class="material-icons">
                place
              </span>
              <a
                :href="
                  `https://www.google.com/maps/dir/${currentItem.Position.PositionLat},${currentItem.Position.PositionLon}`
                "
                class="map"
                target="_blank"
                >Google Map</a
              >
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

// ---------------------------------------------------------------
// TDX 觀光資料 V2.1（取代舊版 /api/basic/v2/Tourism/...）
//   景點 Attraction / 餐飲 Restaurant / 旅宿 Hotel
//   回傳格式：{ value: [...] }，單頁最多 500 筆
//   篩選用 $filter：城市用縣市代碼 PostalAddress/CityCode，關鍵字用 contains(名稱,'字')
// ---------------------------------------------------------------
const API_BASE =
  'https://tdx.transportdata.tw/api/tourism/service/odata/V2/Tourism'

// 三種資料在 V2.1 與舊格式的欄位對照（normalize 用）
const TYPES = {
  scenicSpot: {
    idKey: 'AttractionID',
    idField: 'ScenicSpotID', // 子元件 :key 使用的舊欄位
    classesKey: 'AttractionClasses',
    classKey: 'AttractionClass',
    nameKey: 'AttractionName',
    nameField: 'ScenicSpotName' // 模板使用的舊欄位
  },
  restaurant: {
    idKey: 'RestaurantID',
    idField: 'RestaurantID',
    classesKey: 'CuisineClasses',
    classKey: 'CuisineClass',
    nameKey: 'RestaurantName',
    nameField: 'RestaurantName'
  },
  hotel: {
    idKey: 'HotelID',
    idField: 'HotelID',
    classesKey: 'HotelClasses',
    classKey: 'HotelClass',
    nameKey: 'HotelName',
    nameField: 'HotelName'
  }
}

// ---------------------------------------------------------------
// 類型代碼 → 中文名稱
// 來源：交通部觀光署《觀光資料標準 V2.1》附錄二
//   景點 AttractionClassEnum / 餐飲 CuisineClassEnum / 旅宿 HotelClassEnum
// 備註：餐飲代碼 6~95、117~199、205~253 為保留代碼，不在表內
// ---------------------------------------------------------------
const CLASS_MAP = {
  scenicSpot: {
    1: '文化類',
    2: '生態類',
    3: '文化資產類',
    4: '宗教廟宇類',
    5: '藝術類',
    6: '商圈商店類',
    7: '國家公園類',
    8: '國家風景區類',
    9: '休閒農業類',
    10: '溫泉類',
    11: '自然風景類',
    12: '遊憩類',
    13: '體育健身類',
    14: '觀光工廠類',
    15: '都會公園類',
    16: '森林遊樂區類',
    17: '平地森林園區類',
    18: '國家自然公園類',
    19: '公園綠地類',
    20: '觀光遊樂業類',
    21: '原住民文化類',
    22: '客家文化類',
    23: '交通場站類',
    24: '水域環境類',
    25: '藝文場館類',
    26: '生態場館類',
    27: '娛樂場館類',
    254: '其他'
  },
  restaurant: {
    1: '台灣小吃/台菜',
    2: '中式料理',
    3: '港式料理',
    4: '日式料理',
    5: '韓式料理',
    96: '南亞料理',
    97: '東南亞料理',
    98: '美式/歐式料理',
    99: '其他異國料理',
    100: '夜市小吃',
    101: '甜點冰品',
    102: '麵包糕點',
    103: '非酒精飲品',
    104: '酒類飲品',
    105: '燒烤/鐵板燒',
    106: '火鍋',
    107: '海鮮',
    108: '牛排',
    109: '速食',
    110: '連鎖餐飲',
    111: '吃到飽',
    112: '便當/自助餐',
    113: '牛肉麵',
    114: '粥品',
    115: '地方特產',
    116: '伴手禮/禮盒',
    200: '純素飲食',
    201: '素食飲食',
    202: '清真飲食',
    203: '無麩質飲食',
    204: '健康飲食',
    254: '其他'
  },
  hotel: {
    1: '國際觀光旅館',
    2: '一般觀光旅館',
    3: '一般旅館',
    4: '民宿',
    9: '其他'
  }
}

// 縣市別代碼（來源：觀光資料標準 V2.1 附錄二 CityCodeEnum），名稱統一用「臺」
const CITY_CODE = {
  臺北市: '63000',
  高雄市: '64000',
  新北市: '65000',
  臺中市: '66000',
  臺南市: '67000',
  桃園市: '68000',
  宜蘭縣: '10002',
  新竹縣: '10004',
  苗栗縣: '10005',
  彰化縣: '10007',
  南投縣: '10008',
  雲林縣: '10009',
  嘉義縣: '10010',
  屏東縣: '10013',
  臺東縣: '10014',
  花蓮縣: '10015',
  澎湖縣: '10016',
  基隆市: '10017',
  新竹市: '10018',
  嘉義市: '10020',
  連江縣: '09007',
  金門縣: '09020'
}

// 每次呼叫 API 前把單引號加倍，避免 OData 篩選式壞掉
const esc = s => String(s).replace(/'/g, "''")

// OData 回傳 { "@odata.nextLink": "...", value: [...] }，每頁 500 筆
const toList = data => {
  if (Array.isArray(data)) {
    return data
  }
  return data && Array.isArray(data.value) ? data.value : []
}

// 把 {Telephones: {Telephone: [...]}} / [...] / 單一物件 都轉成陣列
const asArray = (v, childKey) => {
  if (v === undefined || v === null || v === '') {
    return []
  }
  if (Array.isArray(v)) {
    return v
  }
  if (typeof v === 'object' && childKey && v[childKey] !== undefined) {
    return asArray(v[childKey])
  }
  return [v]
}

const toText = v => {
  if (v === undefined || v === null) {
    return ''
  }
  if (Array.isArray(v)) {
    return v
      .map(toText)
      .filter(Boolean)
      .join(', ')
  }
  if (typeof v === 'object') {
    return Object.values(v)
      .map(toText)
      .filter(Boolean)
      .join(' ')
  }
  return String(v)
}

// 類型代碼轉中文：查得到就轉成名稱；查不到的純數字（保留代碼等）不顯示
const toClassName = (c, type) => {
  const raw =
    c && typeof c === 'object'
      ? toText(c.ClassCode || c.Code || c.ID || c.Name || c.ClassName || c)
      : c
  const text = String(raw === undefined || raw === null ? '' : raw).trim()
  if (/^\d+$/.test(text)) {
    // "01"、"1"、1 都當成數字 1 去查
    return CLASS_MAP[type][Number(text)] || ''
  }
  return text
}

// 把 V2.1 資料轉成舊格式，讓模板與子元件不用改
const normalize = (raw, type) => {
  const cfg = TYPES[type]
  const name = raw[cfg.nameKey] || raw[cfg.nameField] || ''

  // PostalAddress: { City, CityCode, Town, TownCode, ZipCode, StreetAddress }
  const pa = raw.PostalAddress
  const cityName = pa && typeof pa === 'object' ? toText(pa.City) : ''
  const address =
    pa && typeof pa === 'object'
      ? [pa.City, pa.Town, pa.StreetAddress].filter(Boolean).join('')
      : toText(pa)

  // 電話 Telephones / Telephone: { Tel, Ext }
  const phone = asArray(raw.Telephones, 'Telephone')
    .map(t =>
      typeof t === 'object' ? toText(t.Tel) + (t.Ext ? ' #' + t.Ext : '') : t
    )
    .filter(Boolean)
    .join(', ')

  // 傳真在 Organizations 底下
  const org = asArray(raw.Organizations, 'Organization')[0] || {}
  const fax = toText(asArray(org.Faxes, 'Fax'))

  // 圖片 Images / Image: { Name, Description, URL }
  const img = asArray(raw.Images, 'Image')[0]
  const picUrl = img && typeof img === 'object' ? toText(img.URL) : ''

  // 座標已上移一層
  const lat = raw.PositionLat
  const lon = raw.PositionLon

  // 旅宿星級 HotelStars (0 代表無星級)
  const stars = Number(raw.HotelStars)
  const grade = stars > 0 ? `${stars} 星級` : ''

  const desc = toText(raw.Description)

  // 類型：V2.1 為 XxxClasses 巢狀結構，內容是類型代碼，依 CLASS_MAP 轉成中文
  // 同一筆資料若對應到相同名稱就去重
  const classes = Array.from(
    new Set(
      asArray(raw[cfg.classesKey], cfg.classKey)
        .map(c => toClassName(c, type))
        .filter(Boolean)
    )
  )

  return Object.freeze({
    ...raw,
    // 去除名字上的下底線 "_、ˍ"
    [cfg.nameField]: String(name).replace(/_|ˍ/g, ' '),
    _city: cityName,
    _cityCode: pa && typeof pa === 'object' ? toText(pa.CityCode) : '',
    // 整個 PostalAddress 攤平成文字，供 City 欄位為空時用地址比對
    _addrText: toText(pa),
    [cfg.idField]: raw[cfg.idKey],
    City: cityName, // 子元件標籤使用（V2.1 已移到 PostalAddress 底下）
    Class: classes[0] || '',
    Class1: classes[0] || '',
    Class2: classes[1] || '',
    Class3: classes[2] || '',
    Description: desc,
    DescriptionDetail: desc,
    Picture: picUrl
      ? {
          PictureUrl1: picUrl,
          PictureDescription1: toText(img.Description || img.Name)
        }
      : {},
    Phone: phone,
    Fax: fax,
    Address: address,
    OpenTime: toText(raw.ServiceTimeInfo),
    ParkingInfo: toText(raw.ParkingInfo),
    ServiceInfo: toText(raw.ServiceInfo),
    Grade: grade,
    // 官方欄位名稱是 WebsiteUrl（Swagger），保留 WebsiteURL 當備援
    WebsiteUrl: toText(raw.WebsiteUrl || raw.WebsiteURL),
    Position: lat && lon ? { PositionLat: lat, PositionLon: lon } : null
  })
}

// 取得 token 的 Promise（同時多個 API 呼叫時只會向 TDX 要一次）
let tokenPromise = null

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
  data() {
    return {
      token: null, // TDX access token
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
    nowCityName() {
      const filterCityName = this.cityData.filter(item => {
        return item.City === this.selected
      })
      return filterCityName
    }
  },
  watch: {
    selected() {
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
    keyword() {
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
  mounted() {
    // 初始化 API 驗證（先取好 token）
    this.getAuthorizationHeader()
    this.isLoading = true
    setTimeout(() => {
      this.isLoading = false
    }, 2000)
  },
  methods: {
    // scenicSpotCurrentPage 改變觸發
    scenicSpotCurrentChange(currentPage) {
      this.isLoading = true
      this.scrollToTabs()
      this.scenicSpotCurrentPage = currentPage
      this.searchScenicSpotCurrentPage = currentPage
      setTimeout(() => {
        this.getScenicSpotPages()
        this.isLoading = false
      }, 1000)
    },
    restaurantCurrentChange(currentPage) {
      this.isLoading = true
      this.scrollToTabs()
      this.restaurantCurrentPage = currentPage
      this.searchRestaurantCurrentPage = currentPage
      setTimeout(() => {
        this.getRestaurantPages()
        this.isLoading = false
      }, 1000)
    },
    hotelCurrentChange(currentPage) {
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
    getScenicSpotPages() {
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
        const start =
          (this.searchScenicSpotCurrentPage - 1) * this.searchScenicSpotPagesize
        let end = start + this.searchScenicSpotPagesize
        if (this.searchScenicSpotData.length <= 32) {
          end = this.searchScenicSpotData.length
          this.pageValue = true
        }
        this.scenicSpotTotalPages = this.searchScenicSpotData.slice(start, end)
      }
    },
    getRestaurantPages() {
      if (this.selected !== '') {
        const start = (this.restaurantCurrentPage - 1) * this.restaurantPagesize
        let end = start + this.restaurantPagesize
        if (this.restaurantTotalData.length <= 32) {
          end = this.restaurantTotalData.length
          this.pageValue = true
        }
        this.restaurantTotalPages = this.restaurantTotalData.slice(start, end)
      } else if (this.keyword !== '') {
        const start =
          (this.searchRestaurantCurrentPage - 1) * this.searchRestaurantPagesize
        let end = start + this.searchRestaurantPagesize
        if (this.searchRestaurantData.length <= 32) {
          end = this.searchRestaurantData.length
          this.pageValue = true
        }
        this.restaurantTotalPages = this.searchRestaurantData.slice(start, end)
      }
    },
    getHotelPages() {
      if (this.selected !== '') {
        const start = (this.hotelCurrentPage - 1) * this.hotelPagesize
        let end = start + this.hotelPagesize
        if (this.hotelTotalData.length <= 32) {
          end = this.hotelTotalData.length
          this.pageValue = true
        }
        this.hotelTotalPages = this.hotelTotalData.slice(start, end)
      } else if (this.keyword !== '') {
        const start =
          (this.searchHotelCurrentPage - 1) * this.searchHotelPagesize
        let end = start + this.searchHotelPagesize
        if (this.searchHotelData.length <= 32) {
          end = this.searchHotelData.length
          this.pageValue = true
        }
        this.hotelTotalPages = this.searchHotelData.slice(start, end)
      }
    },
    getData() {
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
    keywordSearch(e) {
      const reg = new RegExp(e.target.value, 'gi') // 全域 (Global) 比對並忽略大小寫 (Ignore case)
      this.keyword = reg
    },
    scrollToContent() {
      const targetTop = $('#content').offset().top
      $('html,body').animate(
        {
          scrollTop: targetTop
        },
        600
      )
    },
    scrollToTabs() {
      const targetTop = $('#content').offset().top
      window.scrollTo({ top: targetTop, behavior: 'smooth' })
    },
    openScenicSpot(item) {
      this.currentItem = item
      this.visibleScenicSpot = true
    },
    openRestaurant(item) {
      this.currentItem = item
      this.visibleRestaurant = true
    },
    openHotel(item) {
      this.currentItem = item
      this.visibleHotel = true
    },

    // ---------- 篩選條件 ----------
    // 選擇城市：用縣市代碼篩選，例如 PostalAddress/CityCode eq '66000'
    getCityFilter() {
      const cityName = (this.nowCityName[0]
        ? this.nowCityName[0].CityName
        : ''
      ).replace(/台/g, '臺')
      const code = CITY_CODE[cityName]
      return code
        ? `PostalAddress/CityCode eq '${code}'`
        : `PostalAddress/City eq '${esc(cityName)}'`
    },
    // 關鍵字：用名稱包含，例如 contains(AttractionName,'海')
    getKeywordFilter(nameKey) {
      return `contains(${nameKey},'${esc(this.keyword.trim())}')`
    },

    // ---------- 景點 Attraction ----------
    getSearchScenicSpotData() {
      this.isLoading = true
      this.getAuthorizationHeader().then(headers => {
        this.axios({
          method: 'get',
          url: `${API_BASE}/Attraction?$format=JSON&$filter=${encodeURIComponent(
            this.getKeywordFilter('AttractionName')
          )}`,
          headers
        })
          .then(res => {
            this.scenicSpotTotalData = toList(res.data).map(item =>
              normalize(item, 'scenicSpot')
            )
            this.searchScenicSpotData = this.scenicSpotTotalData
            if (this.searchScenicSpotData.length === 0) {
              this.scrollToContent()
              this.searchResult += 1
              this.searchFailed = true // 搜尋不到資料
              this.resultScenicSpot = true // 紀錄 ScenicSpot 沒有搜尋到資料
            } else {
              // 取得 ScenicSpot 分頁資訊
              this.scenicSpotData = this.searchScenicSpotData
              this.getScenicSpotPages()
              this.scrollToContent()
              this.searchFailed = false
            }
          })
          .catch(err => {
            // 需加上 response 才能傳送失敗結果
            console.log(err.response)
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    getScenicSpotData() {
      this.isLoading = true
      this.getAuthorizationHeader().then(headers => {
        this.axios({
          method: 'get',
          url: `${API_BASE}/Attraction?$format=JSON&$filter=${encodeURIComponent(
            this.getCityFilter()
          )}`,
          headers
        })
          .then(res => {
            this.scenicSpotTotalData = toList(res.data).map(item =>
              normalize(item, 'scenicSpot')
            )
            if (this.scenicSpotTotalData.length > 0) {
              // 取得 ScenicSpot 分頁資訊
              this.getScenicSpotPages()
            }
            this.scrollToContent()
          })
          .catch(err => {
            console.log(err.response)
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },

    // ---------- 餐飲 Restaurant ----------
    getSearchRestaurantData() {
      this.isLoading = true
      this.getAuthorizationHeader().then(headers => {
        this.axios({
          method: 'get',
          url: `${API_BASE}/Restaurant?$format=JSON&$filter=${encodeURIComponent(
            this.getKeywordFilter('RestaurantName')
          )}`,
          headers
        })
          .then(res => {
            this.restaurantTotalData = toList(res.data).map(item =>
              normalize(item, 'restaurant')
            )
            this.searchRestaurantData = this.restaurantTotalData
            if (this.searchRestaurantData.length === 0) {
              this.scrollToContent()
              this.searchResult += 1
              this.searchFailed = true
              this.resultRestaurant = true // 紀錄 Restaurant 沒有搜尋到資料
            } else {
              // 取得 restaurant 分頁資訊
              this.restaurantData = this.searchRestaurantData
              this.getRestaurantPages()
              this.scrollToContent()
              this.searchFailed = false
            }
          })
          .catch(err => {
            console.log(err.response)
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    getRestaurantData() {
      this.isLoading = true
      this.getAuthorizationHeader().then(headers => {
        this.axios({
          method: 'get',
          url: `${API_BASE}/Restaurant?$format=JSON&$filter=${encodeURIComponent(
            this.getCityFilter()
          )}`,
          headers
        })
          .then(res => {
            this.restaurantTotalData = toList(res.data).map(item =>
              normalize(item, 'restaurant')
            )
            if (this.restaurantTotalData.length > 0) {
              // 取得 restaurant 分頁資訊
              this.getRestaurantPages()
            }
            this.scrollToContent()
          })
          .catch(err => {
            console.log(err.response)
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },

    // ---------- 旅宿 Hotel ----------
    getSearchHotelData() {
      this.isLoading = true
      this.getAuthorizationHeader().then(headers => {
        this.axios({
          method: 'get',
          url: `${API_BASE}/Hotel?$format=JSON&$filter=${encodeURIComponent(
            this.getKeywordFilter('HotelName')
          )}`,
          headers
        })
          .then(res => {
            this.hotelTotalData = toList(res.data).map(item =>
              normalize(item, 'hotel')
            )
            this.searchHotelData = this.hotelTotalData
            if (this.searchHotelData.length === 0) {
              this.scrollToContent()
              this.searchResult += 1
              this.searchFailed = true
              this.resultHotel = true // 紀錄 Hotel 沒有搜尋到資料
            } else {
              // 取得 hotel 分頁資訊
              this.hotelData = this.searchHotelData
              this.getHotelPages()
              this.scrollToContent()
              this.searchFailed = false
            }
          })
          .catch(err => {
            // 需加上 response 才能傳送失敗結果
            console.log(err.response)
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },
    getHotelData() {
      this.isLoading = true
      this.getAuthorizationHeader().then(headers => {
        this.axios({
          method: 'get',
          url: `${API_BASE}/Hotel?$format=JSON&$filter=${encodeURIComponent(
            this.getCityFilter()
          )}`,
          headers
        })
          .then(res => {
            this.hotelTotalData = toList(res.data).map(item =>
              normalize(item, 'hotel')
            )
            if (this.hotelTotalData.length > 0) {
              // 取得 hotel 分頁資訊
              this.getHotelPages()
            }
            this.scrollToContent()
          })
          .catch(err => {
            console.log(err.response)
          })
          .finally(() => {
            this.isLoading = false
          })
      })
    },

    // ---------- API 驗證 ----------
    // 取得 token（只向 TDX 要一次），回傳可直接放進 axios headers 的物件
    getAuthorizationHeader() {
      if (!tokenPromise) {
        const parameter = {
          grant_type: 'client_credentials',
          client_id: process.env.VUE_APP_CLIENTID,
          client_secret: process.env.VUE_APP_CLIENTSECRET
        }
        tokenPromise = this.axios({
          method: 'POST',
          url: process.env.VUE_APP_AUTHURL,
          data: this.$qs.stringify(parameter), // 需搭配 qs 才能順利將 content-type 改為 application/x-www-form-urlencoded
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }).then(res => res.data.access_token)
      }
      return tokenPromise
        .then(token => {
          this.token = token
          this.axios.defaults.headers.common.Authorization = `Bearer ${token}`
          return { Authorization: `Bearer ${token}` }
        })
        .catch(err => {
          console.log('token 取得失敗', err)
          tokenPromise = null // 下次再重新取得
          return {}
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
@import url('https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.1.3/css/bootstrap-grid.min.css');
@import './assets/scss/main.scss';
</style>
