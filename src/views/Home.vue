<template>
  <div class="home">
    <div class="header">
      <div class="address_map">
        <i class="fa fa-map-marker"></i>
        <span>{{ address }}</span>
        <i class="fa fa-sort-desc"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    address() {
      return this.$store.getters.address
    },
  },
}
</script>

<style>
.home {
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
}
.header,
.search_wrap {
  background-color: #009eef;
  padding: 10px 16px;
}
.header .address_map {
  color: #fff;
  font-weight: bold;
}
.address_map i {
  margin: 0 3px;
  font-size: 18px;
}
.address_map span {
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
  top: -3px;
}
</style>
