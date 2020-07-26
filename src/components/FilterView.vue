<template>
  <div :class="{ open: isSort }" @click.self="hideView">
    <!-- 导航 -->
    <div v-if="filterData" class="filter-wrap">
      <aside class="filter">
        <div
          class="filter-nav"
          v-for="(item, index) in filterData.navTab"
          :key="index"
          :class="{ 'filter-bold': currentFilter == index }"
          @click="filterSort(index)"
        >
          <span>{{ item.name }}</span>
          <i v-if="item.icon" :class="'fa fa-' + item.icon"></i>
        </div>
      </aside>
    </div>
    <!-- 排序 -->
    <section class="filter-extend" v-if="isSort">
      <ul>
        <li
          v-for="(item, index) in filterData.sortBy"
          :key="index"
          @click="selectSort(item, index)"
        >
          <span :class="{ selectName: currentSort == index }">{{
            item.name
          }}</span>
          <i v-show="currentSort == index" class="fa fa-check"></i>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "FilterView",
  data() {
    return {
      currentFilter: 0,
      isSort: false,
      currentSort: 0,
    };
  },
  computed: {
    edit() {
      let edit = false;
      this.filterData.screenBy.forEach((screen) => {
        screen.data.forEach((item) => {
          if (item.select) {
            edit = true;
          }
        });
      });
      return edit;
    },
  },
  props: {
    filterData: Object,
  },
  methods: {
    filterSort(index) {
      this.currentFilter = index;
      switch (index) {
        case 0:
          this.isSort = true;
          this.$emit("searchFixed", true);
          break;
        case 1:
          this.$emit("update", {
            condition: this.filterData.navTab[1].condition,
          });
          this.hideView();
          break;
        case 2:
          this.$emit("update", {
            condition: this.filterData.navTab[2].condition,
          });
          this.hideView();
          break;
        default:
          this.hideView();
          break;
      }
    },
    hideView() {
      this.isSort = false;
      this.$emit("searchFixed", false);
    },
    selectSort(item, index) {
      this.currentSort = index;
      this.filterData.navTab[0].name = this.filterData.sortBy[index].name;
      this.hideView();

      // 更新数据
      this.$emit("update", { condition: item.code });
    },
  },
};
</script>

<style scoped>
.filter-wrap {
  background: #fff;
  position: sticky;
  top: 54px;
  z-index: 10;
}
.filter {
  position: relative;
  border-bottom: 1px solid #ddd;
  line-height: 10.4vw;
  z-index: 101;
  height: 10.666667vw;
  display: flex;
  justify-content: space-around;
}
.filter-nav {
  flex: 1;
  text-align: center;
  color: #666;
  font-size: 0.8333rem;
}
.filter-nav i {
  width: 1.6vw;
  height: 0.8vw;
  margin-left: 1.333333vw;
  margin-bottom: 0.533333vw;
  fill: #333;
  will-change: transform;
}

.filter-bold {
  font-weight: 600;
  color: #333;
}

.open {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.3s ease-in-out;
  z-index: 3;
}

.filter-extend {
  background-color: #fff;
  color: #333;
  padding-top: 2.133333vw;
  position: absolute;
  width: 100%;
  z-index: 4;
  left: 0;
  top: 24.533333vw;
}
.filter-extend li {
  position: relative;
  padding-left: 5.333333vw;
  line-height: 10.666667vw;
  overflow: hidden;
}
.fa-check {
  float: right;
  color: #009eef;
  margin-right: 3.733333vw;
  line-height: 10.666667vw;
}

.selectName {
  color: #009eef;
}
/* 筛选 */
.filter-sort {
  background: #fff;
  padding: 0 2.666667vw;
  line-height: normal;
}
</style>
