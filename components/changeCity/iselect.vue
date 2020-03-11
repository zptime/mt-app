<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select v-model="pvalue" placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <!-- disabled：省为空时，城市不可选 -->
    <el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <span class="name" style="margin-left:50px;">直接搜索:</span>
    <el-autocomplete
      v-model="input"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入城市中文或拼音"
      @select="handleSelect"
    />
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data () {
    return {
      province: [], // 省
      pvalue: '',
      city: [], // 省对应的市
      cvalue: '',
      input: '', // 输入框 城市（远程搜索）
      cities: [] // 全国城市
    };
  },
  watch: {
    async pvalue (newPvalue) {
      // 获取省份下的城市列表
      const { status, data: { city } } = await this.$axios.get(`/geo/province/${newPvalue}`);
      if (status === 200) {
        this.city = city.map((item) => {
          return {
            value: item.id,
            label: item.name
          };
        });
        // 重新赋值后，上次选择数据清空
        this.cvalue = '';
      }
    }
  },
  async mounted () {
    // 获取省份数据
    const { status, data: { province } } = await this.$axios.get('/geo/province');
    if (status === 200) {
      this.province = province.map((item) => {
        return {
          value: item.id,
          label: item.name
        };
      });
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function (query, cb) {
      const self = this;
      if (self.cities.length) {
        // 过滤搜索
        cb(self.cities.filter(item => item.value.includes(query)));
      } else {
        const { status, data: { city } } = await self.$axios.get('/geo/city');
        console.log(city)
        if (status === 200) {
          self.cities = city.map((item) => {
            return {
              value: item.name
            };
          });
          cb(self.cities.filter(item => item.value.includes(query)));
        } else {
          cb()
        }
      }
    }, 200),
    handleSelect (item) {
      window.location.href = 'https://wh.meituan.com/'
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/changeCity/iselect.scss";
</style>
