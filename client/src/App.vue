<template>
  <section class="min-h-screen bg-grey-lightest font-sans antialiased leading-tight">
    <!-- Navbar -->
    <nav class="flex justify-between items-center flex-wrap p-4 border-b">
      <div class="flex items-centers">
        <font-awesome-icon icon="video" size="lg" class="mr-2 text-grey-darkest" />
        <router-link to="/" tag="span" style="cursor: pointer">
          <span class="font-bold text-grey-darkest">techtalks</span>
        </router-link>
      </div>

      <!-- search bar -->
      <div class="xs:hidden md:block lg:block">
        <input type="text" placeholder="Search" class="block lg:w-128 bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-2 leading-tight focus:outline-none focus:bg-white focus:border-grey">
      </div>

      <!-- toolbar links -->
      <div class="flex items-center">
        <div v-for="item in navItems" :key="item.title">
          <router-link :to="item.link">
            <button :to="item.link" class="mr-6 rounded px-1 py-1 hover:bg-grey-light">
              <font-awesome-icon :icon="item.icon" class="text-grey-darkest" />
            </button>
          </router-link>
        </div>
        <router-link to="/profile">
          <button v-if="user" class="mr-6 rounded px-1 py-1 hover:bg-grey-light">
            <font-awesome-icon icon="user" class="text-grey-darkest" />
            <el-badge v-if="userFavorites.length" :value="userFavorites.length" :class="{'bounce': badgeAnimated}"></el-badge>
          </button>
        </router-link>
        <button v-if="user" class="mr-6 rounded px-1 py-1 hover:bg-grey-light" @click="handleSignoutUser">
          <font-awesome-icon icon="sign-out-alt" class="text-grey-darkest" />
        </button>
      </div>
    </nav>

    <!-- app content -->
    <router-view />

  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      badgeAnimated: false
    };
  },
  watch: {
    user(newValue, oldValue) {
      if (oldValue === null) {
        this.$notify({
          title: "Welcome",
          message: "You are signed in!",
          position: "bottom-right",
          type: "success"
        });
      }
    },
    authError(value) {
      if (value) {
        this.$notify({
          title: "Welcome",
          message: this.authError.message.replace(
            "Context creation failed:",
            ""
          ),
          position: "bottom-right",
          type: "success"
        });
      }
    },
    userFavorites(value) {
      // if user favorites value changed at all
      if (value) {
        this.badgeAnimated = true;
        setTimeout(() => (this.badgeAnimated = false), 1000);
      }
    }
  },
  methods: {
    handleSignoutUser() {
      this.$store.dispatch("signoutUser");
    }
  },
  computed: {
    ...mapGetters(["authError", "user", "userFavorites"]),
    navItems() {
      let items = [
        {
          icon: "plus",
          title: "Create Post",
          link: "/post/add"
        },
        {
          icon: "sign-in-alt",
          title: "Sign In",
          link: "/signin"
        },
        {
          icon: "user-plus",
          title: "Sign Up",
          link: "/signup"
        }
      ];
      if (this.user) {
        items = [
          {
            icon: "plus",
            title: "Create Post",
            link: "/post/add"
          }
          // {
          //   icon: "user",
          //   title: "Profile",
          //   link: "/profile"
          // }
        ];
      }
      return items;
    }
  }
};
</script>

<style>
@import "assets/styles/tailwind.postcss";

.bounce {
  animation: bounce 1s both;
}

@keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  40%,
  43% {
    transform: translate3d(0, -20px, 0);
  }

  70% {
    transform: translate3d(0, -10px, 0);
  }

  90% {
    transform: translate3d(0, -4px, 0);
  }
}
</style>