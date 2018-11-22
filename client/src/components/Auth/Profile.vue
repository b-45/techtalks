<template>
  <div class="max-w-md mx-auto px-6 py-8">
    <!-- User detail card -->
    <div class="flex justify-between bg-grey-darker rounded-sm select-none shadow border-transparent mb-12">
      <!-- image -->
      <div class="w-1/4 xs:hidden md:block lg:block">
        <img class="block h-full w-full rounded-l-sm" :src="user.avatar">

      </div>
      <!-- title -->
      <div class="flex flex-col flex-1 justify-between ml-2 ">
        <div class="mt-2">
          <span class="font-semibold text-white ">{{user.username}}</span>
        </div>
        <div class="">
          <span class="text-white text-sm ">Favorites: {{user.favorites.length}}</span>
        </div>
        <div class="mb-2">
          <span class="text-white text-sm ">Joined: {{formatJoinDate(user.joinDate)}}</span>
        </div>
      </div>
    </div>

    <!-- favorited posts by user -->
    <div v-if="!userFavorites.length">
      <p class="text-lg font-medium text-center shake">You currently have no favorites. Please go add some</p>
    </div>
    <div v-else class="mt-4">

      <div>
        <p class="text-center text-lg font-medium mb-2">Favorited: <span>{{userFavorites.length}}</span></p>

        <ul class="list-reset">
          <li class=" flex justify-between items-center bg-white rounded-sm select-none cursor-pointer shadow border-2 border-transparent hover:border-grey-light focus:outline-none focus:border-grey-light mb-4" v-for="favorites in userFavorites" :key="favorites._id" @click="goToPost(favorites._id)">
            <!-- image -->
            <div class="w-1/4 xs:hidden md:block lg:block">
              <img class="block h-full w-full rounded-l-sm" :src="favorites.thumbnail">
            </div>
            <!-- title -->
            <div class="flex flex-col flex-1 justify-between w-1/2 ml-2">
              <div class="mt-2">
                <span class="font-medium text-grey-darker trunc">{{favorites.title}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import moment from "moment";

export default {
  name: "Profile",
  computed: {
    ...mapGetters(["user", "userFavorites"])
  },
  methods: {
    formatJoinDate(date) {
      return moment(new Date(date)).format("ll");
    },
    goToPost(postId) {
      this.$router.push(`/posts/${postId}`);
    }
  }
};
</script>
