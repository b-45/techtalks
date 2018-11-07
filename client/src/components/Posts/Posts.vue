<template>
  <ul class="list-reset">
    <li>
      <div class="flex bg-white rounded-lg select-none cursor-pointer  border-transparent border-2 hover:border-grey-light">
        <div class="mr-4 ">
          <img class="block h-24 w-32 rounded-l-lg" src="https://images.unsplash.com/photo-1530662590558-6463b5186074?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=764b3205c9644bf5860650cf20e72433&auto=format&fit=crop&w=1430&q=80"
            alt="">
        </div>
        <div class="flex flex-col justify-between">
          <span class="mt-2 text-lg font-medium text-green-darker">Eligendi soluta adipisci dicta corrupti excepturi.</span>
          <div class="flex mb-2 text-xs">
            <span class="text-grey-dark mr-4">B45</span>
            <span class="mr-4">·</span>
            <span class="mr-1 text-green-dark">86%</span>
            <span class="text-grey-dark mr-4">like-ratio</span>
            <span class="mr-4">·</span>
            <span class="text-grey-dark">5 days ago</span>
          </div>
        </div>
        <div class="flex items-center p-2">
          <span class="text-5xl mr-1 text-grey-darkest font-thin">40</span>
          <span class="text-sm text-grey">mins</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
  import {
    INFINITE_SCROLL_POSTS
  } from '../../queries.js';
  const pageSize = 2
  export default {
    name: 'Posts',
    data() {
      return {
        pageNum: 1,
        showMoreEnabled: true,
      }
    },
    apollo: {
      // execute apollo query within the post component
      infiniteScrollPosts: {
        // specify the query
        query: INFINITE_SCROLL_POSTS,
        //supply variables for query
        variables: {
          pageNum: 1,
          pageSize,
        }
      }
    },
    methods: {

    }

  }
</script>

<style scoped>

</style>