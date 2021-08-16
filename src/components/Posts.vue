<template>
  <div class="container_posts" v-if="filteredPosts.value">
      <div class="posts" v-for="post in filteredPosts.value" :key="post.id">
          <ul class="post_container">
              <li class="post_id">{{post.id}}</li>
              <li class="post_title">{{post.title}}</li>
              <li class="post_body">{{post.body}}</li>
          </ul>
      </div>
      <div class="loader" ref="visible">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
      <div class="error" v-if="error">{{error}}</div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { computed, watchEffect } from '@vue/runtime-core';
export default {
    name:'Posts', 
    props:['data', 'error', 'page','limit', 'load', 'inputField'],
    setup(props, context){
        const visible = ref()
        const filteredPosts = ref("")

    //Computed filtered Post
        watchEffect(()=>{
            if(props.data !== null){
                 filteredPosts.value = computed(()=>{
                    return props.data.filter((post)=>{
                        return(
                            post.title 
                            .toLowerCase()
                            .indexOf(props.inputField.toLowerCase()) != -1
                        )
                    })
                })
                return filteredPosts
            }
        })
        

        // Remove visibility of loader 
        function removeVisible () {
            setTimeout(() => {
                visible.value.classList.remove('visible')
            }, 500);
        }
        
        //Scroll event firing loading CSS and increasing limit of fetched data
        window.addEventListener('scroll', () =>{
            const {scrollHeight, scrollTop, clientHeight} = document.documentElement;

            if(scrollTop + clientHeight >= scrollHeight) {
            visible.value.classList.add('visible')
            context.emit('change-limit', 5)
            props.load()
            removeVisible()
            }

        })

        return {visible, filteredPosts}
    }
}
</script>

<style>
.container_posts{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
}
.posts{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30Vw;
    height: 12rem;
    background-color: var(--secondary);
    margin: 2rem;
    position:relative;
    
    font-size: 14px;
    text-align: left;

    border-radius: 13px;
}
.post_container{
    list-style: none;
}
.post_id{
    position: absolute;
    top: -15px;
    left: -14px;
    background-color: var(--secondary);
    padding: 12px 18px;
    border-radius: 100px;
    border: 1px solid var(--fonts);
    color: var(--fonts);
}
.post_title{
    margin: 0 20px;
    font-size: 22px;
}
.post_body{
    margin: 20px;
}

li{
    margin-bottom: 15px;
    color: var(--fonts);
}
.loader{
    display: flex;
    position: fixed;
    width: 50px;
    height: 50px;
    bottom: 10px;
    opacity: 0;
    transition: all .3s;
}
.visible{
    opacity: 1;
}
.circle{
    background-color: var(--fonts);
    height: 10px;
    width: 10px;
    margin: 5px;
    border-radius: 50%;
    animation: bounce .5s ease-in infinite;
}
.circle:nth-of-type(2){
    animation-delay: .1s;
}
.circle:nth-of-type(3){
    animation-delay: .2s;
}

@keyframes bounce {
    0%,
    100% {
        transform: translateY(0);
    }
        50%{
            transform: translateY(-10px);
        }
}
</style>