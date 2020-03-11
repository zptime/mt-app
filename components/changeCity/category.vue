<template>
  <div class="">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd
        v-for="item in list"
        :key="item"
      >
        <a :href="'#city-'+item">{{ item }}</a>
      </dd>
    </dl>
    <dl
      v-for="item in block"
      :key="item.title"
      class="m-categroy-section"
    >
      <dt :id="'city-'+item.title">
        {{ item.title }}
      </dt>
      <dd>
        <span
          v-for="c in item.city"
          :key="c"
        >{{ c }}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin'
export default {
  data () {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block: []
    }
  },
  async mounted () {
    const self = this;
    const blocks = []
    const { status, data: { city } } = await self.$axios.get('/geo/city');
    if (status === 200) {
      let p
      let c
      const d = {}
      city.forEach((item) => {
        // js-pinyin：强大的拼音库，将汉字转为拼音
        p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0, 1) // 获取全拼->转为小写->取第一个字母
        c = p.charCodeAt(0) // 获取首字母的code值，用于排序A-Z
        if (c > 96 && c < 123) { // a-97, A-65, z-122, Z-90   a-z(97-122), A-Z(65-90)
          if (!d[p]) {
            d[p] = []
          }
          d[p].push(item.name)
        }
      })
      // 以key-balue形式遍历对象
      for (const [k, v] of Object.entries(d)) {
        blocks.push({
          title: k.toUpperCase(), // 首字母转为大写
          city: v
        })
      }
      // 实现A-Z排序
      blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      self.block = blocks
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/categroy.scss";
</style>
