<template>
  <search v-model="inputField" />
  <posts :load='load' :data='data' :error='error' :page='page' @change-limit='updateLimit' :inputField='inputField'/>
</template>

<script>
import { ref } from '@vue/reactivity';
import Posts from './components/Posts.vue';
import Search from './components/Search.vue';
import getPosts from './composables/getPosts'



export default {
  name: 'App',
  components:{ Posts, Search},
  setup() {
    const {limit, page, data, error, load} = getPosts()
    const inputField = ref('')
    //initial fetch data call
    load()

    //custom emit for increasing limit number from Posts component
    const updateLimit = (num) =>{
      limit.value += num
    }

    return{limit, page,data, error, load, updateLimit, inputField, }
  }
}
</script>

