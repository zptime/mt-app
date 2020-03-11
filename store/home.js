export const state = () => ({
  menu: [], // 菜单
  hotPlace: [] // 热门景点
})

export const mutations = {
  setMenu (state, val) {
    state.menu = val
  },
  setHotPlace (state, val) {
    state.hotPlace = val
  }
}

export const actions = {
  setMenu: ({ commit }, menu) => {
    commit('setMenu', menu)
  },
  setHotPlace: ({ commit }, hotPlace) => {
    commit('setHotPlace', hotPlace)
  }
}
