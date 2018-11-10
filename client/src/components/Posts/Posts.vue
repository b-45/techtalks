<template>
  <ul class="list-reset" v-if="infiniteScrollPosts">
    <li class="flex justify-between bg-white rounded-sm select-none cursor-pointer shadow border-2 border-transparent hover:border-grey-light focus:outline-none focus:border-grey-light xs:pr-4 mb-4" v-for="post in infiniteScrollPosts.posts" :key="post._id">
      <!-- image -->
      <div class="w-1/6 xs:hidden md:block lg:block">
        <img class="block h-auto w-full rounded-l-sm" :src="post.thumbnail" alt="">
      </div>
      <!-- title -->
      <div class="flex flex-col justify-between w-4/6 pl-2">
        <div>
          <span class="font-medium text-grey-darker">{{post.title}}</span>
        </div>
        <div class="flex flex-wrap mb-2 text-xs ">
          <span class="text-grey-dark mr-4">{{post.createdBy.username}}</span>
          <span class="mr-4">·</span>
          <span class="mr-1 text-green-dark">{{post.likeRatio}}</span>
          <span class="text-grey-dark mr-4">like-ratio</span>
          <span class="mr-4">·</span>
          <span class="text-grey-dark">{{formatCreatedDate(post.createdDate)}}</span>
        </div>
      </div>

      <div class="flex flex-shrink items-center p-2 w-1/6 opacity-50 xs:hidden md:flex  lg:flex">
        <span class="text-4xl mr-1 text-grey-darkest font-thin">{{post.duration}}</span>
        <span class="text-sm text-grey-dark">mins</span>
      </div>
    </li>
    <button @click="showMorePosts" v-if="showMoreEnabled">Fetch More</button>

  </ul>
</template>

<script>
import { INFINITE_SCROLL_POSTS } from "../../queries.js";
import moment from "moment";
const pageSize = 2;

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
          console.log("previous result", prevResult.infiniteScrollPosts.posts);
          console.log("fetch more result", fetchMoreResult);
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
    }
  }
};
</script>

 