<template>
  <div>
    
  </div>
</template>

<script>
import { INFINITE_SCROLL_POSTS } from '../../queries.js';
const pageSize = 2
  export default {
    name: 'Posts',
    data() {
      return {
        pageNum: 1,
        showMoreEnabled:true,

      }
    },
    // apollo: {
    //   // execute apollo query within the post component
    //   infiniteScrollPosts: {
    //     // specify the query
    //     query: INFINITE_SCROLL_POSTS, 
    //     //supply variables for query
    //     variables: {  
    //       pageNum: 1,
    //       pageSize,
    //     }
    //   }
    // },
    methods: {
      
    }
    
  }
</script>

<style scoped>

</style>