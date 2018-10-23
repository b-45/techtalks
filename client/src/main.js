import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faVideo, faSignInAlt, faUserPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

library.add(faPlus, faVideo, faSearch, faSignInAlt, faUserPlus)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueApollo)

// Setup ApolloClient
const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

const apolloProvider = new VueApollo({ defaultClient });

Vue.config.productionTip = false

new Vue({
  // apolloprovider injects apollo into vue files to allow queries and mutations
  provide: apolloProvider.provide(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
