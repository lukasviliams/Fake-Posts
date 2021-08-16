<template>
  <div class="container_heading">
      <h1 class="heading_header">Fake posts</h1>
      <div class="heading_input">
          <input 
          type="text"
          placeholder="Enter search"
          v-model="searchBar"
          @input="$emit('update:modelValue', $event.target.value)"
          >
      </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
export default {
    setup(){
        const searchBar = ref('')
        

        return{searchBar}
    }

}
</script>

<style scoped>
.container_heading{
    height: 50vh;
    width: 100vw;
    background-image: linear-gradient(rgba(0, 0, 0, 0.700),rgba(0, 0, 0, 0.700)), url('../assets/lukas-blazek-GnvurwJsKaY-unsplash.jpg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-color: rgba(0,0,0,9);
    background-attachment: fixed;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.heading_header{
    font-size: 48px;
    text-transform: uppercase;
    letter-spacing: -1px;
    background-image: linear-gradient(90deg, var(--fonts), #fff);
    background-clip: text;
    color: transparent;

    margin-bottom: 3rem;
}
.heading_input input{
    width: 50vw;
    min-width: 300px;
    padding: 12px;
    border-radius: 30px;
    outline: none;
    text-transform: uppercase;
    border: none;
}
.heading_input input:focus{
    color: var(--fonts);
    background-color: var(--secondary);
}
</style>