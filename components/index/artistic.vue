<template>
  <div>
    <el-row v-for="(list, index) in lists" :key="index" class="m-istyle">
      <dl @mouseover="over($event, index)">
        <dt>{{ list.name }}</dt>
        <dd v-for="(v, idx) in list.child" :key="idx" :kind="v.type" :class="{ active: list.childType === v.type }">
          {{ v.title }}
        </dd>
      </dl>
      <ul class="ibody">
        <li v-for="(item, ind) in curList(list)" :key="ind">
          <el-card>
            <img :src="item.img" alt="" class="image">
            <ul class="cbody" :body-style="{ padding: '0px' }" shadow="never">
              <li class="title">
                {{ item.title }}
              </li>
              <li class="pos">
                {{ item.pos }}
              </li>
              <li class="price">
                ￥<em>{{ item.price }}</em><span>/起</span>
              </li>
            </ul>
          </el-card>
        </li>
      </ul>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      lists: [{
        type: 'style',
        name: '有格调',
        childType: 'all',
        child: [{
          title: '全部',
          type: 'all',
          child: [{
            img: 'https://p1.meituan.net/msmerchant/08adfc2c365fe2ff08e4db1c0155bdf1189139.jpg@552w_312h_1e_1c',
            title: '哈根达斯（东方广场店）',
            pos: '花火蛋糕冰淇淋1个，约700克，圆',
            price: '258'
          }, {
            img: 'https://p0.meituan.net/bbia/aee3f14e9a33c138f7e7c473e51766a392274.jpg@552w_312h_1e_1c',
            title: '麦香城蛋糕（永大路北分店）',
            pos: '8英寸幸福时光水果生日蛋糕，不止带来美味 还有爱和幸福1个，约8英寸，任选1',
            price: '87'
          }, {
            img: 'https://p1.meituan.net/msmerchant/10d8740ef9c0a997014f89aa44ecbe9c362546.jpg@552w_312h_1e_1c',
            title: '大董（王府井店）',
            pos: '明炉醋椒鳜鱼套餐，建议4人使用',
            price: '抢光了'
          }, {
            img: 'https://p1.meituan.net/msmerchant/ff6e19e76c5d4eb43fe6ab10f79902d7279349.jpg@552w_312h_1e_1c',
            title: '幸福西饼生日蛋糕（西直门店）',
            pos: '【蛋糕】S四重奏/榴芒双拼/鲜果嘉年华/榴莲香雪（4选1）1个，约2磅，方形',
            price: '188'
          }]
        }, {
          title: '约会聚餐',
          type: 'part',
          child: [{
            img: 'https://p1.meituan.net/msmerchant/08adfc2c365fe2ff08e4db1c0155bdf1189139.jpg@552w_312h_1e_1c',
            title: '哈根达斯（东方广场店）',
            pos: '花火蛋糕冰淇淋1个，约700克，圆',
            price: '258'
          }]
        }, {
          title: '丽人SPA',
          type: 'spa',
          child: [{
            img: 'https://p0.meituan.net/bbia/aee3f14e9a33c138f7e7c473e51766a392274.jpg@552w_312h_1e_1c',
            title: '麦香城蛋糕（永大路北分店）',
            pos: '8英寸幸福时光水果生日蛋糕，不止带来美味 还有爱和幸福1个，约8英寸，任选1',
            price: '87'
          }]
        }, {
          title: '品质出游',
          type: 'travel',
          child: [{
            img: 'https://p1.meituan.net/msmerchant/10d8740ef9c0a997014f89aa44ecbe9c362546.jpg@552w_312h_1e_1c',
            title: '大董（王府井店）',
            pos: '明炉醋椒鳜鱼套餐，建议4人使用',
            price: '抢光了'
          }]
        }]
      }]
    }
  },
  methods: {
    over (e, index) {
      const dom = e.target
      const tag = dom.tagName.toLowerCase()
      if (tag === 'dd') {
        const list = JSON.parse(JSON.stringify(this.lists[index]))
        list.childType = dom.getAttribute('kind')
        this.$set(this.lists, index, list)
      }
    },
    curList (list) {
      const cur = list.child.filter(item => item.type === list.childType)[0]
      return cur.child
    }
  }
}
</script>

<style lang="scss">
    @import "@/assets/css/index/artistic.scss";
</style>
