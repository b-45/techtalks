import Vue from 'vue'
import Vuex from 'vuex'
import { defaultClient as apolloClient } from './main'
import router from './router'
import {
  SIGNIN_USER,
  GET_CURRENT_USER
} from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false
  },
  mutations: {
    setLoading: (state, payload) => {
      state.loading = payload
    },
    setUser: (state, payload) => {
      state.user = payload
    },
    clearUser: state => (state.user = null),

  },
  actions: {
    getCurrentUser: ({ commit }) => {
      commit('setLoading', true)
      apolloClient.query({
          query: GET_CURRENT_USER
        }) 
        .then(({ data }) => {
          commit('setLoading', false)
          // Add user data to state
          commit('setUser', data.getCurrentUser)
        })
        .catch((err) => {
           console.error(err)
        })
    },
    signinUser: ({ commit }, payload) => {
      //clear token
      localStorage.setItem("token", "")
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          localStorage.setItem('token', data.signinUser.token)
          // reload page
          router.go()
        })
        .catch(err => {
          console.error(err)
        })
    },
    signoutUser: async ({ commit }) => {
      // clear user in state
      commit('clearUser')
      // remove token in localstorage
      localStorage.setItem('token', '')
      // reset session
      //console.dir(apolloClient)
      await apolloClient.resetStore()
      // redirect home 
      router.push('/')
    }
  },
  getters:{
    user: state => state.user,
    loading: state => state.loading
  }
})
