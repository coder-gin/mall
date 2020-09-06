<template>
  <swiper class="detail_swiper">
    <swiper-item v-for="(item,index) in detailBanner" :key="index">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    detailBanner: {
      type: Array,
      default () {
        return []
      }
    }
  },
}
</script>

<style scoped>
.detail_swiper {
  height: 300px;
  overflow: hidden;
}
</style>