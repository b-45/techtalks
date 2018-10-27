import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faVideo, faSignInAlt, faUserPlus, faSearch, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import FormAlert from './components/Shared/FormAlert.vue'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import { Alert} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Alert)
Vue.use(VueApollo)
Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faPlus, faVideo, faSearch, faSignInAlt, faUserPlus, faUser, faSignOutAlt)

Vue.component('form-alert', FormAlert)

// Setup ApolloClient
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
    //include auth token with request to backend
    fetchOptions: {
      credentials: 'include'
    },
    request: operation => {
      // if no token with key of 'token' in localstorage, add it
      if(!localStorage.token) {
        localStorage.setItem('token', '')
      }
      // operation adds the token to an authorization header, which is sent to backend
      operation.setContext({
        headers: {
          authorization: localStorage.getItem('token')
        }
      })
    },
    onError: ({ graphQLErrors, networkError }) => {
      if(networkError){
        console.log('[networkError]', networkError)
      }
      if(graphQLErrors) {
        for (let err of graphQLErrors){
          console.dir(err)
          if (err.name === 'AuthenticationError') {
            // set auth  error in state ( to show in snackbar)
            store.commit('setAuthError', err)
  
            //signout user (to clear token)
            store.dispatch('signoutUser')
          }
        }
      }
    }
})

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false

new Vue({
  // apolloprovider injects apollo into vue files to allow queries and mutations
  apolloProvider,
  router,
  store,
  render: h => h(App),
  created(){
    // execute getcurrentUser query - runs on every page refresh
    this.$store.dispatch('getCurrentUser')
  }
}).$mount('#app')
