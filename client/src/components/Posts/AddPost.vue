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
          <!-- title input -->
          <div class="w-full mb-8">
            <label for="username" class="form-label">TITLE</label>
            <input id="title" type="text" class="form-input" v-model="title" v-validate="'required'" name="title">
            <div class="text-xs text-red-dark " v-show="errors.has('title')">{{errors.first('title')}}</div>
          </div>

          <!-- videoUrl -->
          <div class="w-full mb-6 pr-1">
            <label for="videoUrl" class="form-label">VIDEOURL</label>
            <input id="videoUrl" type="text" class="form-input" v-model="videoUrl" v-validate="'required'" name="videoUrl">
            <div class="text-xs text-red-dark " v-show="errors.has('videoUrl')">{{errors.first('videoUrl')}}</div>
          </div>

          <!-- categories  -->
          <div class="w-full mb-8">
            <label for="categories" class="form-label">CATEGORIES</label>
            <el-select v-model="categories" multiple collapse-tags  placeholder="Select Category">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </div>
          <!-- presenter -->
          <div class="w-full mb-6 pr-1">
            <label for="presenter" class="form-label">PRESENTER</label>
            <input id="presenter" type="text" class="form-input" v-model="presenter"
              v-validate="'required'" name="presenter">
            <div class="text-xs text-red-dark " v-show="errors.has('presenter')">{{errors.first('presenter')}}</div>
          </div>
          <!-- host -->
          <div class="w-full mb-6 pr-1">
            <label for="host" class="form-label">HOST</label>
            <input id="host" type="text" class="form-input" v-model="host"
              v-validate="'required'" name="host">
            <div class="text-xs text-red-dark " v-show="errors.has('host')">{{errors.first('host')}}</div>
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
        title: '',
        videoUrl: '',
        categories: [],
        presenter:'',
        host: '',
        options: [
          {
            value: 'Option1',
            label: 'Option1'
        }, 
          {
            value: 'Option2',
            label: 'Option2'
        }, 
          {
            value: 'Option3',
            label: 'Option3'
        },
        ],
      }
    },
    computed: {
      ...mapGetters(['user'])
    },
    methods: {
      handleAddPosts(){
          this.$validator.validateAll().then(()=> {
          this.$store.dispatch('addPost', {
          title: this.title,
          videoUrl: this.videoUrl,
          categories: this.categories,
          presenter: this.presenter,
          host: this.host,
          creatorId: this.user._id
        })
        this.$router.push('/')
      }) 
      }
    }
  }
</script>
