import Vue from 'vue'
import Vuex from 'vuex'
import { defaultClient as apolloClient } from './main'
import {
  SIGNIN_USER,
} from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    signinUser: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          console.log(data.signinUser)
        })
        .catch(err => {
          console.error(err)
        })
    },
  },
  getters:{

  }
})
