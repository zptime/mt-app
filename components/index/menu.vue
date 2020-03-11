<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item, index) in menu" :key="index" @mouseenter="mouseenter">
        <i :class="item.type" />{{ item.name }} <span class="arrow" />
      </dd>
    </dl>
    <div v-if="kind" class="detail" @mouseenter="sover" @mouseleave="sout">
      <template v-for="(item, index) in curdetail.child">
        <h4 :key="index">
          {{ item.title }}
        </h4>
        <span v-for="v in item.child" :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      kind: '' // 当前选中分类
    //   menu: [{ // 菜单数据
    //     type: 'food',
    //     name: '美食',
    //     child: [{
    //       title: '美食',
    //       child: ['代金券', '甜点饮品', '火锅', '自助餐', '小吃快餐', '日韩料理']
    //     }]
    //   }, {
    //     type: 'takeout',
    //     name: '外卖',
    //     child: [{
    //       title: '外卖',
    //       child: ['美团外卖']
    //     }]
    //   }, {
    //     type: 'hotel',
    //     name: '酒店',
    //     child: [{
    //       title: '酒店星级',
    //       child: ['经济型', '舒适/三星', '高档/四星', '豪华/五星']
    //     }]
    //   }]
    }
  },
  computed: {
    curdetail () {
      return this.menu.filter(item => item.type === this.kind)[0]
    },
    menu () {
      return this.$store.state.home.menu
    }
  },
  methods: {
    // 离开一级菜单
    mouseleave () {
      this._timer = setTimeout(() => {
        this.kind = ''
      }, 150)
    },
    // 一级菜单分类进入
    mouseenter (e) {
      this.kind = e.target.querySelector('i').className
    },
    // 进入二级菜单
    sover () {
      // 离开一级，进入二级，二级菜单不消失
      clearTimeout(this._timer)
    },
    // 离开二级菜单
    sout () {
      this.kind = ''
    }
  }
};
</script>

<style lang="scss">
</style>
