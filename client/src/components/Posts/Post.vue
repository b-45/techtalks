<template>
  <div v-if="getPost">
    <h1>{{getPost.title}}</h1>
  </div>
</template>
<script>
import { GET_POST } from "../../queries.js";
export default {
  name: "Post",
  props: ["postId"],
  apollo: {
    getPost: {
      query: GET_POST,
      variables() {
        return {
          postId: this.postId
        };
      }
    }
  }
};
</script>

