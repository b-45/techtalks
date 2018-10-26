<template>
  <div class="min-h-screen bg-grey-lightest font-sans antialiased leading-tight">
    <!-- Navbar -->
    <div class="flex justify-between items-center p-4 border-b">
      <div class="flex items-center">
          <font-awesome-icon icon="video" size="lg" class="mr-2 opacity-50" />
        <router-link to="/" tag="span" style="cursor: pointer">
          <span class="font-bold text-grey-darkest">techtalks</span>
        </router-link>
      </div>

    <!-- search bar -->
      <div>
        <input type="text" placeholder="Search" class="border border-grey-light py-2 px-2 w-128">
        <button class="border-t border-r border-b border-grey-light py-2 px-6 text-grey-darkest">
          <font-awesome-icon icon="search" /></button>
      </div>

    <!-- toolbar links -->
      <div class="flex items-center">
        <div v-for="item in navItems" :key="item.title">
          <router-link :to="item.link">
            <button :to="item.link" class="mr-6 rounded px-1 py-1 hover:bg-grey-light">
              <font-awesome-icon :icon="item.icon" size="md" class="text-grey-darkest"/>
            </button>
          </router-link>
        </div>
        <button v-if="user" class="mr-6 rounded px-1 py-1 hover:bg-grey-light" @click="handleSignoutUser">
          <font-awesome-icon icon="sign-out-alt" size="lg" class="text-grey-darkest"/>
        </button>
      </div>
    </div>

  <!-- app content -->
    <main>
      <div class="container mt-4 mx-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'App',
    methods: {
       handleSignoutUser() {
        this.$store.dispatch('signoutUser')
      }
    },
    computed: {
      ...mapGetters(['user']),
      navItems() {
        let items =  [{
            icon: "plus",
            title: 'Create Post',
            link: '/post/add'
          },
          {
            icon: "sign-in-alt",
            title: 'Sign In',
            link: '/signin'
          },
          {
            icon: "user-plus",
            title: 'Sign Up',
            link: '/signup'
          }
        ]
        if(this.user){
          items = [
            {
              icon: "plus",
              title: 'Create Post',
              link: '/post/add'
            },
            {
              icon: "user",
              title: 'Profile',
              link: '/profile'
            },
          ]
        }
        return items
      }
    }
  }
</script>

<style>
  @import 'assets/styles/tailwind.postcss';
</style>