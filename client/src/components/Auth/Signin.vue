<template>
  <div class="min-h-screen p-8">
    <form class="max-w-sm mx-auto card border-t-4 " @submit.prevent="submit">
      <div class="flex justify-center border-b-2 mb-6 text-grey-darkest">
        <div class="mr-2">
          <font-awesome-icon icon="user" size="lg" />
        </div>
        <div>
          <h3 class="mb-4">Welcome back!</h3>
        </div>
      </div>

      <div class="border-b-2 mb-6 text-grey-darkest">
        <div class="flex flex-wrap mb-2">
          <div class="w-full mb-8">
            <label for="username" class="form-label">USERNAME</label>
            <input id="username" class="form-input">
          </div>

          <div class="w-full mb-6 pr-1">
            <label for="password" class="form-label">PASSWORD</label>
            <input id="password" class="form-input">
          </div>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="bg-purple hover:bg-purple-light text-white py-2 px-4 rounded font-semibold text-sm mb-4">SIGNIN</button>
        <p class="font-semibold">Register a new acccount
          <router-link to="/signup">Signup</router-link>
        </p>
      </div>

    </form>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>