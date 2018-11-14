<template>
  <div class="max-w-lg mx-auto" v-if="getPost">
    <div class="flex justify-center items-center mt-6 mb-4">
      <iframe :src="getVideo" width="960" height="500"></iframe>
    </div>
    <div class="flex">
      <div>
        <span class="mr-4 font-medium text-grey-darker trunc">{{getPost.title}}</span>
      </div>
      <button @click="handleLikeToggle" class="text-grey-dark cursor-pointer">
        <font-awesome-icon icon="heart" class="text-grey-light" :style="checkIfPostLiked(getPost._id) ? { color: 'tomato' } : { color: 'grey' } " />
        <span class="ml-3 font-weight-thin">{{getPost.likes}} LIKES</span>
      </button>
    </div>
  </div>
</template>
<script>
import { GET_POST, LIKE_POST, UNLIKE_POST } from "../../queries.js";
import { mapGetters } from "vuex";
export default {
  name: "Post",
  props: ["postId"],
  data() {
    return {
      postLiked: false
    };
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
  },
  computed: {
    ...mapGetters(["user", "userFavorites"]),
    getVideo() {
      return `https://www.youtube.com/embed/${this.getPost.videoId}`;
    }
  },
  methods: {
    checkIfPostLiked(postId) {
      // check if user favorites includes post with id of 'postId'
      if (
        this.userFavorites &&
        this.userFavorites.some(fave => fave._id === postId)
      ) {
        this.postLiked = true;
        return true;
      } else {
        this.postLiked = false;
        return false;
      }
    },
    handleLikeToggle() {
      if (this.postLiked) {
        this.handleUnlikePost();
      } else {
        this.handleLikePost();
      }
    },
    handleLikePost() {
      const variables = {
        postId: this.postId,
        username: this.user.username
      };
      this.$apollo
        .mutate({
          mutation: LIKE_POST,
          variables,
          update: (cache, { data: { likePost } }) => {
            const data = cache.readQuery({
              query: GET_POST,
              variables: { postId: this.postId }
            });
            data.getPost.likes += 1;
            cache.writeQuery({
              query: GET_POST,
              variables: { postId: this.postId },
              data
            });
          }
        })
        .then(({ data }) => {
          // console.log("user", this.user);
          // console.log("like post", data.likePost);
          const updatedUser = {
            ...this.user,
            favorites: data.likePost.favorites
          };
          this.$store.commit("setUser", updatedUser);
        })
        .catch(err => console.error(err));
    },
    handleUnlikePost() {
      const variables = {
        postId: this.postId,
        username: this.user.username
      };
      this.$apollo
        .mutate({
          mutation: UNLIKE_POST,
          variables,
          update: (cache, { data: { unlikePost } }) => {
            const data = cache.readQuery({
              query: GET_POST,
              variables: { postId: this.postId }
            });
            data.getPost.likes -= 1;
            cache.writeQuery({
              query: GET_POST,
              variables: { postId: this.postId },
              data
            });
          }
        })
        .then(({ data }) => {
          const updatedUser = {
            ...this.user,
            favorites: data.unlikePost.favorites
          };
          this.$store.commit("setUser", updatedUser);
        })
        .catch(err => console.error(err));
    }
  }
};
</script>

