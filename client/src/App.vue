<template>
  <div class="min-h-screen bg-grey-lightest font-sans antialiased leading-tight">
    <!-- Navbar -->
    <div class="flex justify-between items-center p-4 border-b">
      <div class="flex items-center">
        <a href="">
          <font-awesome-icon icon="video" size="lg" class="mr-2 opacity-50" /></a>
        <router-link to="/" tag="span" style="cursor: pointer">
          <span class="font-bold text-lg text-grey-darkest">techtalks</span>
        </router-link>
      </div>
      <div>
        <input type="text" placeholder="Search" class="border border-grey-light py-2 px-2 w-128">
        <button class="border-t border-r border-b border-grey-light py-2 px-6 text-grey-darkest">
          <font-awesome-icon icon="search" /></button>
      </div>
      <div class="flex items-center">
      <div v-for="item in navItems" :key="item.title">
          <router-link :to="item.link">
            <button :to="item.link" class="mr-4 rounded px-1 py-1 font-normal hover:bg-grey-light">
              <font-awesome-icon :icon="item.icon" size="lg" class="text-grey-darkest mr-2"/>{{item.title}}
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <main>
      <div class="container mt-4 mx-auto">
        <router-view />
      </div>

    </main>
  </div>
</template>
<script>
  export default {
    name: 'App',
    computed: {
      navItems() {
        return [{
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
      }
    }
  }
</script>


<style>
  @import 'assets/styles/tailwind.postcss';
</style>