<template>
   <div class="min-h-screen p-8">
    <div class="max-w-sm mx-auto">
        <form class="card border-t-4 border-t-purple" @submit.prevent="submit">

    <div class="flex border-b-2 mb-6 text-grey-darkest">
      <div class="pr-3 self-center  ">
        <svg class="fill-current" width="36" height="36" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" enable-background="new 0 0 100 100" xml:space="preserve">
          <g>
            <path d="M50.002,23.304c-7.803,0-14.152,6.348-14.152,14.15s6.35,14.15,14.152,14.15c7.802,0,14.149-6.348,14.149-14.15   S57.804,23.304,50.002,23.304z" />
            <path d="M50,5C25.187,5,5,25.188,5,50c0,24.813,20.187,45,45,45s45-20.187,45-45C95,25.188,74.813,5,50,5z M77.914,79.549v-0.883   c0-14.387-10.956-23.683-27.912-23.683c-16.959,0-27.916,9.296-27.916,23.683v0.883C14.234,72.128,9.321,61.63,9.321,50   C9.321,27.569,27.569,9.321,50,9.321S90.679,27.569,90.679,50C90.679,61.63,85.766,72.128,77.914,79.549z" />
          </g>
        </svg>
      </div>
      <div class="self-center py-4">
        <h2>Sign Up</h2>
      </div>
    </div>

    <div>
      <h3 class=" text-grey-darkest mb-6">Profile</h3>
    </div>

    <div class="flex flex-wrap border-b-2 mb-6 ">

      <div class="w-1/2 mb-6 pr-1">
        <label for="first_name" class="form-label">FIRST NAME</label>
        <input id="first_name" v-model="firstName" class="form-input" placeholder="Jane">
      </div>

      <div class="w-1/2">
        <label for="last_name" class="form-label">LAST NAME</label>
        <input id="last_name" v-model="lastName" class="form-input" placeholder="Doe">
      </div>

      <div class="w-full mb-8">
        <label for="email" class="form-label">EMAIL</label>
        <input id="email" v-model="email" class="form-input" placeholder="jane@example.com">
      </div>

    </div>

    <div class="border-b-2 mb-6 text-grey-darkest">
      <div>
        <h3 class="mb-8">Account</h3>
      </div>

      <div class="flex flex-wrap mb-2">
        <div class="w-full mb-8">
          <label for="username" class="form-label">USERNAME</label>
          <input id="username" v-model="username" class="form-input" placeholder="elongated_musk">
        </div>

        <div class="w-1/2 mb-6 pr-1">
          <label for="password" class="form-label">PASSWORD</label>
          <input id="password" v-model="password" class="form-input" placeholder=".........">
        </div>

        <div class="w-1/2">
          <label for="confirm_password" class="form-label">PASSWORD (CONFIRM)</label>
          <input id="confirm_password" v-model="confirmPassword" class="form-input" placeholder=".........">
        </div>

      </div>

    
    </div>
    <div class="text-right">
      <button class="bg-purple hover:bg-purple-dark text-white py-2 px-4 rounded text-xs">SUBMIT</button>
    </div>

  </form>
    </div>
  </div>
</template>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>