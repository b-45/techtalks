<template>
  <div class="min-h-screen p-8">
    <form class="max-w-sm mx-auto card border-t-4" @submit.prevent="handleSignupUser">
      <div class="flex justify-center border-b-2 mb-6 text-grey-darkest">
        <div class="mr-2">
          <font-awesome-icon icon="user" size="lg" />
        </div>
        <div class="mb-4">
          <h3>Sign up here!</h3>
        </div>
      </div>

      <div class="border-b-2 mb-6 text-grey-darkest">

        <div class="flex flex-wrap mb-2">
          <div class="w-full mb-8">
            <label for="username" class="form-label">USERNAME</label>
            <input 
              id="username" 
              type="text" 
              class="form-input"
              v-model="username"
              v-validate="'required'"
              name="username" 
              > 
            <div class="text-xs text-red-dark " v-show="errors.has('username')">{{errors.first('username')}}</div>

          </div>

          <div class="w-full mb-6 pr-1">
            <label for="email" class="form-label">EMAIL</label>
            <input 
              id="email"
              type="text" 
              class="form-input"
              v-model="email"
              v-validate="'required|email'"
              name="email">
            <div class="text-xs text-red-dark " v-show="errors.has('email')">{{errors.first('email')}}</div>
          </div>
          <div class="w-full mb-8">
            <label for="password" class="form-label">PASSWORD</label>
            <input 
              id="password" 
              type="password" 
              class="form-input"
              v-model="password"
              v-validate="'required'"
              name="password"
              >
            <div class="text-xs text-red-dark " v-show="errors.has('password')">{{errors.first('password')}}</div>
 
          </div>

          <div class="w-full mb-6 pr-1">
            <label for="passwordConfirmation" class="form-label">CONFIRM PASSWORD</label>
            <input 
              id="passwordConfirmation" 
              type="password" 
              class="form-input" 
              v-model="passwordConfirmation" 
              v-validate="'required'"
              name="passwordConfrimation"   
              >
          <div class="text-xs text-red-dark " v-show="errors.has('passwordConfirmation')">{{errors.first('passwordConfirmation')}}</div>

          </div>
        </div>
      </div>
      <div class="text-center">
        <button type="submit" class="bg-purple hover:bg-purple-light text-white py-2 px-4 rounded font-semibold text-sm mb-4">SIGNUP</button>
        <p class="font-semibold">Already have an account? 
          <router-link to="/signin" class="no-underline cursor-pointer text-green"> Signin</router-link>
        </p>
      </div>

    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    name: 'Signup',
    data() {
      return {
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      }
    },
    watch: {
      user(value) {
      // if user value changes redirect to homepage
        if(value){
          this.$router.push("/")
        }
      }

    },
    methods: {
     handleSignupUser() {
        this.$validator.validateAll().then(()=> {
          this.$store.dispatch('signupUser', {
          username: this.username,
          email: this.email,
          password: this.password,
        })
    }) 
      }
    },
    computed: {
      ...mapGetters(['error', 'user'])
    }

  }
</script>

<style scoped>

</style>