<template>
    <div class="text-center">
        <div class="mb-5">
            <h1 class="text-2xl">404</h1>
            <h3>Page not found</h3>
    
            <h3 class="text-red-500" v-show="error">Error: {{ error }}</h3>
        </div>


        <router-link
            class="p-2 mt-3 md:mr-2 border-2 rounded text-green-500 border-green-500 hover:text-white hover:bg-green-500"
            :to="{ name: 'home' }">Back to Todo List</router-link>

    </div>
</template>


<script setup>

import { inject } from 'vue';

const error = inject("error")


console.log(error.value)

</script>