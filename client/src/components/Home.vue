<template>
<div>
  <div class="max-w-md mx-auto px-6 py-24">
    <h1 class="shake text-grey-darkest text-3xl font-light text-center mb-4">Learn something new</h1>
    <p class="text-grey-dark text-lg font-semibold text-center mb-8">Discover and share engaging technology talks for inspiration.</p>
  </div>
  <div>
    <ul v-for="post in getPosts" :key="post._id">
      <li>{{ post.title }}</li>
      <li>{{post.videoUrl}}</li>
    </ul>
  </div>

</div>
</template>

<script>
import { gql } from 'apollo-boost'
export default {
  name: 'home',
  apollo: {
    getPosts: {
      query: gql `
        query {
          getPosts{
          _id
          title
          videoUrl
          host
          }
        }
      `
    }
  }

}
</script>


