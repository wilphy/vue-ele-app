<template>
  <div class="home">
    <div class="header">
      <div class="address-map" @click="$router.push('/address')">
        <i class="fa fa-map-marker"></i>
        <span>{{ address }}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
    </div>
    <div class="search-wrap" :class="{ fixedview: showFilter }">
      <div class="shop-search">
        <i class="fa fa-search"></i>
        搜索商家 商家名称
      </div>
    </div>

    <div id="container">
      <!-- 轮播 -->
      <mt-swipe :auto="4000" class="swiper">
        <mt-swipe-item v-for="(img, index) in swipeImgs" :key="index">
          <img :src="img" alt />
        </mt-swipe-item>
      </mt-swipe>

      <!-- 分类 -->
      <mt-swipe :auto="0" class="entries">
        <mt-swipe-item
          v-for="(entry, i) in entries"
          :key="i"
          class="entry-wrap"
        >
          <div class="foodentry" v-for="(item, index) in entry" :key="index">
            <div class="img-wrap">
              <img :src="item.image" alt />
            </div>
            <span>{{ item.name }}</span>
          </div>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 推荐商家 -->
    <div class="shoplist-title">
      <span>—</span><span>推荐商家</span><span>—</span>
    </div>

    <!-- 导航 -->
    <FilterView :filterData="filterData" @searchFixed="showFilterView" />
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "mint-ui"
import FilterView from "../components/FilterView"

export default {
  name: "home",
  components: {
    FilterView,
  },
  data() {
    return {
      swipeImgs: [], // 轮播图
      entries: [], // 分类
      filterData: null, //
      showFilter: false,
    }
  },
  computed: {
    address() {
      return this.$store.getters.address || "获取定位中..."
    },
    city() {
      return (
        this.$store.getters.location.addressComponent.city ||
        this.$store.getters.location.addressComponent.province
      )
    },
  },
  created() {
    this.getShoppingData()
  },
  methods: {
    getShoppingData() {
      //   "/api/profile/shopping"
      this.$axios("/data/profile/shopping.json").then((res) => {
        // console.log(res.data)
        this.swipeImgs = res.data.swipeImgs
        this.entries = res.data.entries
      })

      //   "/api/profile/filter"
      this.$axios("/data/profile/filter.json").then((res) => {
        console.log(res.data.filterData)
        this.filterData = res.data
      })
    },

    // 显示帅选项
    showFilterView(isShow) {
      this.showFilter = isShow
    },
  },
}
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header,
.search-wrap {
  background-color: #009eef;
  padding: 10px 16px;
}
.header .address-map {
  color: #fff;
  /* font-weight: bold; */
  font-size: 16px;
  padding: 5px 0;
}
.address-map i {
  margin: 0 3px;
  font-size: 18px;
}
.address-map span {
  display: inline-block;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.fa-map-marker {
  padding-right: 5px;
}
.fa-sort-desc {
  position: relative;
  top: -4px;
}

.search-wrap .shop-search {
  /* margin-top: 10px; */
  background-color: #fff;
  padding: 10px 0;
  border-radius: 4px;
  text-align: center;
  color: #aaa;
}
.search-wrap {
  position: sticky;
  top: 0px;
  z-index: 999;
  box-sizing: border-box;
}

/* 轮播 */
.swiper {
  height: 100px;
}
.swiper img {
  width: 100%;
  height: 100px;
}

/* 分类 */
.entries {
  background: #fff;
  height: 47.2vw;
  text-align: center;
  overflow: hidden;
}
.foodentry {
  width: 20%;
  float: left;
  position: relative;
  margin-top: 2.933333vw;
}
.foodentry .img-wrap {
  position: relative;
  display: inline-block;
  width: 12vw;
  height: 12vw;
}
.img-wrap img {
  width: 100%;
  height: 100%;
}
.foodentry span {
  display: block;
  color: #666;
  font-size: 0.32rem;
}

/* 推荐商家 */
.shoplist-title {
  display: flex;
  align-items: flex;
  justify-content: center;
  height: 9.6vw;
  line-height: 9.6vw;
  font-size: 16px;
  color: #666;
  background: #fff;
}
.shoplist-title span {
  margin: 0 10px;
}

.fixedview {
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 999;
}
</style>
