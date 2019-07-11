export const state = () => {
  return {
    title: ''
  }
}

export const mutations = {
  CHANGE_TITLE(state, payload) {
    state.title = payload
  }
}
