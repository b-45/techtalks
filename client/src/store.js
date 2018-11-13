import Vue from 'vue'
import Vuex from 'vuex'
import {
  defaultClient as apolloClient
} from './main'
import router from './router'
import {
  SIGNIN_USER,
  SIGNUP_USER,
  ADD_POST,
  GET_CURRENT_USER,
  GET_POST,
  INFINITE_SCROLL_POSTS,
} from './queries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
    loading: false,
    authError: null

  },
  mutations: {
    setLoading: (state, payload) => {
      state.loading = payload
    },
    setUser: (state, payload) => {
      state.user = payload
    },
    setError: (state, payload) => {
      state.error = payload
    },
    setAuthError: (state, payload) => {
      state.authError = payload
    },
    clearUser: state => (state.user = null),
    clearError: state => (state.error = null),

  },
  actions: {
    getCurrentUser: ({
      commit
    }) => {
      commit('setLoading', true)
      apolloClient.query({
          query: GET_CURRENT_USER
        })
        .then(({
          data
        }) => {
          commit('setLoading', false)
          // Add user data to state
          commit('setUser', data.getCurrentUser)
        })
        .catch((err) => {
          //console.error(err)
        })
    },

    addPost: ({
      commit
    }, payload) => {
      apolloClient.mutate({
        mutation: ADD_POST,
        variables: payload,
        // update: (cache, {
        //   data
        // }) => {
        //   console.log(cache, data)
        //read query from cache and update
        // const data = cache.readQuery({
        //   query: INFINITE_SCROLL_POSTS
        // })
        // create updated data
        // data.infiniteScrollPosts.unshift(addPost)
        // write updated data to query
        // cache.writeQuery({
        //   query: INFINITE_SCROLL_POSTS,
        //   data
        // })
        // }
      }).then(({
        data
      }) => {
        console.log(data.addPost)
      }).catch(err => {
        console.error(err)
      })
    },
    signinUser: ({
      commit
    }, payload) => {
      commit('clearError')
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({
          data
        }) => {
          localStorage.setItem('token', data.signinUser.token)
          // reload page
          router.go()
        })
        .catch(err => {
          commit('setError', err)
          //console.error(err)
        })
    },
    signupUser: ({
      commit
    }, payload) => {
      commit('clearError')
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({
          data
        }) => {
          localStorage.setItem('token', data.signupUser.token)
          // reload page
          router.go()
        })
        .catch(err => {
          commit('setError', err)
          //console.error(err)
        })
    },
    signoutUser: async ({
      commit
    }) => {
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
  getters: {
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error,
    authError: state => state.authError
  }
})