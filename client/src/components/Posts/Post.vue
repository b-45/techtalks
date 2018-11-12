<template>
  <div class="max-w-lg mx-auto" v-if="getPost">
    <div class="flex justify-center items-center mt-10 mb-2">
      <iframe :src="getVideo" width="960" height="500"></iframe>
    </div>
    <div>
      <h3 class="">{{getPost.title}}</h3>
    </div>
  </div>
</template>
<script>
import { GET_POST } from "../../queries.js";
export default {
  name: "Post",
  props: ["postId"],
  computed: {
    getVideo() {
      return `https://www.youtube.com/embed/${this.getPost.videoId}`;
    }
  },
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

