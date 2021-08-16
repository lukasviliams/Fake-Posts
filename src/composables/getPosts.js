import { ref } from '@vue/reactivity';

const  getPosts = () =>{
    const limit = ref(5)
    const page = ref(1)
    const data = ref(null)
    const error = ref(null)

    const load = async function () {
        try {
            const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit.value}&_page=${page.value}`)
            if(res.ok) {
                // console.log(res);
                data.value = await res.json()
                // console.log(data.value);
            } else {
                throw Error (console.log(`response is not ok check your internet connection`));
            }
        } catch(err) {
            err.message = error.value
            console.log(error);
        }

    }
    return{limit, page,data, load}
}

export default getPosts