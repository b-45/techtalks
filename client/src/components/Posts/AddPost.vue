<template>
  <div class="min-h-screen p-8">
    <form class="max-w-sm mx-auto card border-t-4" @submit.prevent="handleAddPosts" >
      <div class="flex justify-center border-b-2 mb-6 text-grey-darkest">
        <div class="mb-4">
          <h3>Add a Post</h3>
        </div>
      </div>
      <div class="border-b-2 mb-6 text-grey-darkest">
        <div class="flex flex-wrap mb-2">
       
          <!-- videoUrl -->
          <div class="w-full mb-6 pr-1">
            <label for="videoUrl" class="form-label">VIDEOURL</label>
            <input id="videoUrl" type="text" class="form-input" v-model="videoUrl" v-validate="'required'" name="videoUrl">
            <div class="text-xs text-red-dark " v-show="errors.has('videoUrl')">{{errors.first('videoUrl')}}</div>
          </div>
        </div>
      </div>
      <!-- button -->
      <div class="text-center">
        <button type="submit" class="bg-purple hover:bg-purple-light text-white py-2 px-4 rounded font-semibold text-sm mb-4">SUBMIT</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters} from 'vuex'
  export default {
    name: 'Signup',
    data() {
      return {
         videoUrl: '',  
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      handleAddPosts(){
          this.$validator.validateAll().then(()=> {
          this.$store.dispatch('addPost', {
            videoUrl: this.videoUrl,
            creatorId: this.user._id
        })
        this.$router.push('/')
      }) 
      }
    }
  }
</script>
