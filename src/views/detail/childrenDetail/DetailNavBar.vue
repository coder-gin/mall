<template>
  <nav-bar class="nav_bar">
    <div slot="left" @click="backClick">
      <img src="~assets/images/common/back.svg" alt />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(item,index) in titles"
        :key="index"
        class="title_item"
        :class="{active:currentIndex === index}"
        @click="titleClick(index)"
      >{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    // 点击titles当前文字高亮
    titleClick (index) {
      this.currentIndex = index
      this.$emit('titleClick', index)
    },

    // 点击返回
    backClick () {
      this.$router.back()
    }
  },
}
</script>

<style scoped>
.nav_bar {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.nav_bar img {
  margin-top: 12px;
}

.title {
  display: flex;
  font-size: 14px;
}

.title_item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}
</style>