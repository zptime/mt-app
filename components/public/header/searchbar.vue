<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img
          src="https://s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png"
          alt=""
        >
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          />
          <button class="el-button el-button-primary">
            <i class="el-icon-search" />
          </button>
          <dl v-if="isHotPlace" class="hotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in hotPlace" :key="index">
              {{ item.name }}
            </dd>
          </dl>
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item, index) in searchList" :key="index">
              {{ item.name }}
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <a v-for="(item, index) in hotPlace" :key="index" href="#">{{ item.name }}</a>
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">
              美团外卖
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">
              美团酒店
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">
              猫眼电影
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">
              民宿、公寓
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">
              商家入驻
            </nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund" />
            <p class="txt">
              随时退
            </p>
          </li>
          <li>
            <i class="single" />
            <p class="txt">
              不满意免单
            </p>
          </li>
          <li>
            <i class="overdue" />
            <p class="txt">
              过期退
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  data () {
    return {
      search: '', // 输入框的值
      isFocus: false, // 输入框的聚焦状态
      // hotPlace: ['火锅', '火锅', '火锅'],
      searchList: []
    };
  },
  computed: {
    city () {
      return this.$store.state.geo.position.city
    },
    hotPlace () {
      return this.$store.state.home.hotPlace.slice(0, 5)
    },
    isHotPlace () {
      return this.isFocus && !this.search;
    },
    isSearchList () {
      return this.isFocus && this.search;
    }
  },
  methods: {
    focus () {
      this.isFocus = true;
    },
    blur () {
      // 点击blur之前，热门搜索悬浮框已经消失了，导致链接点击无效。  添加延时
      // this.isFocus = false
      setTimeout(() => {
        this.isFocus = false;
      }, 200);
    },
    // 输入数据变化时， 搜索列表数据随之变化
    // 实时监控，输入一下查询一下，影响效率，采用lodash的延时函数
    input: _.debounce(async function () {
      const self = this
      const city = self.city.replace('市', '');
      self.searchList = [];
      const {
        status,
        data: { top }
      } = await self.$axios.get('/search/top', {
        params: {
          input: self.search,
          city
        }
      });
      if (status === 200) {
        self.searchList = top.slice(0, 10);
      } else {
        self.searchList = [];
      }
    }, 300)
  }
};
</script>

<style lang="scss"></style>
