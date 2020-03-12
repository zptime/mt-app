<template>
  <el-row class="page-product">
    <el-col :span="19">
      <crumbs :keyword="keyword" />
      <categroy
        :types="types"
        :areas="areas"
      />
      <list :list="list" />
    </el-col>
    <el-col :span="5">
      <amap
        v-if="point.length"
        :width="230"
        :height="290"
        :point="point"
      />
    </el-col>
  </el-row>
</template>

<script>
import Crumbs from '@/components/products/crumbs.vue'
import Categroy from '@/components/products/categroy.vue'
import List from '@/components/products/list.vue'
import Amap from '@/components/public/map.vue'
export default {
  components: {
    Crumbs,
    Categroy,
    List,
    Amap
  },
  async asyncData ({ query, $axios, store }) {
    const keyword = query.keyword
    const city = store.state.geo.position.city
    // 通过关键字搜索产品列表
    const { status, data: { count, pois } } = await $axios.get('/search/resultsByKeywords', {
      params: {
        keyword,
        city
      }
    })

    // 获取分类和区域列表
    const { status: status2, data: { areas, types } } = await $axios.get('/category/crumbs', {
      params: {
        city
      }
    })

    if (status === 200 && count > 0 && status2 === 200) {
      return {
        list: pois.filter(item => item.photos.length).map((item) => {
          return {
            type: item.type, // 分类
            img: item.photos[0].url, // 图片
            name: item.name, // 名称
            comment: Math.floor(Math.random() * 10000), // 评论
            rate: Number(item.biz_ext.rating), // 评分
            price: Number(item.biz_ext.cost), // 价格
            scene: item.tag, // 描述
            tel: item.tel, // 电话
            status: '可订明日', // 状态
            location: item.location, // 位置
            module: item.type.split(';')[0] // 子类型
          }
        }),
        keyword,
        areas: areas.filter(item => item.type !== '').slice(0, 5),
        types: types.filter(item => item.type !== '').slice(0, 5),
        point: (pois.find(item => item.location).location || '').split(',')
      }
    } else {
      return {}
    }
  },
  data () {
    return {
      list: [],
      types: [],
      areas: [],
      keyword: '',
      point: []
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/products/index.scss";
</style>
