export const actions = {
  async nuxtServerInit ({ commit }, { req, app }) {
    // 获取位置信息
    const { status, data: { province, city } } = await app.$axios.get('/geo/getPosition')
    commit('geo/setPosition', status === 200 ? { city, province } : { city: '', province: '' })

    // 获取菜单信息
    const { status: status2, data: { menu } } = await app.$axios.get('/geo/menu')
    commit('home/setMenu', status2 === 200 ? menu : [])

    // 获取热门景点
    const { status: status3, data: { result } } = await app.$axios.get('/search/hotPlace', {
      params: {
        city: app.store.state.geo.position.city.replace('市', '')
      }
    })
    commit('home/setHotPlace', status3 === 200 ? result : [])
  }
}
