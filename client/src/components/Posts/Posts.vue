<template>
  <ul class="list-reset" v-if="infiniteScrollPosts">
    <li class="flex justify-between bg-white rounded-sm select-none cursor-pointer shadow border-2 border-transparent hover:border-grey-light focus:outline-none focus:border-grey-light  mb-4" v-for="post in infiniteScrollPosts.posts" :key="post._id" @click="goToPost(post._id)">
      <!-- image -->
      <div class="w-1/4 xs:hidden md:block lg:block">
        <img class="block h-full w-full rounded-l-sm" :src="post.thumbnail">
      </div>
      <!-- title -->
      <div class="flex flex-col flex-1 justify-between w-1/2 ml-2">
        <div class="mt-2">
          <span class="font-medium text-grey-darker trunc">{{post.title}}</span>
        </div>
        <div class="flex flex-wrap mb-2 text-xs">
          <span class="text-grey-dark mr-2">{{post.createdBy.username}}</span>
          <span class="mr-2">·</span>
          <span class="mr-1 text-green-dark">{{post.likeRatio}}</span>
          <span class="text-grey-dark mr-2">like-ratio</span>
          <span class="mr-2">·</span>
          <span class="text-grey-dark mr-2">{{formatCreatedDate(post.createdDate)}}</span>
          <span class="mr-2">·</span>
        </div>
      </div>
      <!-- duration -->
      <div class="flex justify-end items-center w-1/6 opacity-50 mr-4">
        <span class="lg:text-4xl md:text-4xl mr-1 text-grey-darkest font-thin xs:text-lg">{{post.duration}}</span>
        <span class="text-sm text-grey-dark">mins</span>
      </div>
    </li>
    <div class="text-center">
      <button class="bg-grey-light hover:bg-grey text-grey-darker font-bold py-2 px-4 rounded" @click="showMorePosts" v-if="showMoreEnabled">Fetch More</button>
    </div>
  </ul>
</template>

<script>
import { INFINITE_SCROLL_POSTS } from "../../queries.js";
import moment from "moment";
const pageSize = 4;

export default {
  name: "Posts",
  data() {
    return {
      pageNum: 1,
      showMoreEnabled: true
    };
  },
  apollo: {
    infiniteScrollPosts: {
      query: INFINITE_SCROLL_POSTS,
      variables: {
        pageNum: 1,
        pageSize
      }
    }
  },
  methods: {
    showMorePosts() {
      this.pageNum += 1;
      this.$apollo.queries.infiniteScrollPosts.fetchMore({
        variables: {
          pageNum: this.pageNum,
          pageSize
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          // console.log("previous result", prevResult.infiniteScrollPosts.posts);
          // console.log("fetch more result", fetchMoreResult);
          const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
          const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;
          this.showMoreEnabled = hasMore;

          return {
            infiniteScrollPosts: {
              __typename: prevResult.infiniteScrollPosts.__typename,
              posts: [...prevResult.infiniteScrollPosts.posts, ...newPosts],
              hasMore
            }
          };
        }
      });
    },
    formatCreatedDate(date) {
      return moment(new Date(date)).format("ll");
    },

    goToPost(postId) {
      this.$router.push(`/${postId}`);
    }
  }
};
</script>



 