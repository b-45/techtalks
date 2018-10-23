<template>
  <div class="min-h-screen bg-grey-lightest font-sans antialiased leading-tight">
    <!-- Navbar -->
      <div class="flex justify-between items-center p-4">
        <div class="flex items-center">
          <a href=""><font-awesome-icon icon="video" size="lg" class="mr-2 opacity-50" /></a>
          <span class="font-bold text-xl text-grey-darkest">techtalks</span>
        </div>
        <div>
          <input type="text" placeholder="Search" class="border border-grey-light py-2 px-2 w-128">
          <button class="border-t border-r border-b border-grey-light py-2 px-6 text-grey-darkest" ><font-awesome-icon icon="search"/></button>
        </div>
        <div class="flex items-center">
         <div>
          <button v-for="item in navItems" :key="item.title" :to="item.link" class="mr-8 font-medium">
            <font-awesome-icon :icon="item.icon" size="lg" class="text-grey-darkest mr-2"/>{{item.title}}
          </button>
         </div>
        </div>
      </div>
    
    <main> 
      <div class="container mt-4 mx-auto">
        <router-view/>
      </div> 

    </main>
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    navItems(){
      return [
        {icon:"plus", title: 'Posts', link: '/posts'},
        {icon:"sign-in-alt", title: 'Sign In', link:'/signin'},
        {icon:"user-plus", title: 'Sign Up', link: '/signup'}
      ]
    }
  }
}
</script>


<style>
@import 'assets/styles/tailwind.postcss';

</style>
