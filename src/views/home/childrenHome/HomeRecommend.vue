<template>
  <div class="recommend">
    <div v-for="(item,index) in recommend" :key="index" class="recommend_item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommend: {
      type: Array,
      default () {
        return []
      }
    }
  },
  created () {
    // console.log(this.recommend)
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}

.recommend_item {
  flex: 1;
}

.recommend_item img {
  width: 70px;
  height: 70px;
}
</style>