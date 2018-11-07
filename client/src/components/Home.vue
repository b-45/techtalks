<template>
    <div class="max-w-md mx-auto px-6 py-8">
      <!-- <h1 class="shake text-grey-darkest text-3xl font-light text-center mb-4">Learn something new</h1> -->
      <p class=" shake text-grey-dark text-lg text-center mb-12 font-medium">Discover and share engaging technology talks for inspiration.</p>
    <Posts></Posts>
  </div>
</template>

<script>
import Posts from '@/components/Posts/Posts.vue';
export default {
  name: 'home',
  components: { Posts }

}
</script>


