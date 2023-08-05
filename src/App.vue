<template>
  <nav class="grid justify-items-end lg:justify-items-center  m-4">
    <!-- Mobile hamburger menu -->
    <div class="block lg:hidden">
      <button @click="toggleMobileMenu">
        <svg class="fill-current h-7 w-7" :class="{ 'hidden': mobileMenuOpen, 'block': !mobileMenuOpen }" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
        <svg class="fill-current h-7 w-7" :class="{ 'hidden': !mobileMenuOpen, 'block': mobileMenuOpen }" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      </button>
  
    </div>
  
  
    <!-- Links -->
    <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"
    :class="{'block': mobileMenuOpen, 'hidden': !mobileMenuOpen}">
      <div class="lg:flex-grow">
        <router-link :to="{ name: 'home' }" class="rounded-md border-2 lg:border-0 border-slate-300 p-2 block mt-3 lg:mt-0 lg:inline-block">Home</router-link>
        <div class="hidden lg:inline-block mx-2 p-2">|</div>
        <router-link :to="{ name: 'about' }" class="rounded-md border-2 lg:border-0 border-slate-300 p-2 block  mt-3 lg:mt-0 lg:inline-block">About</router-link>
      </div>
    </div>
  </nav>
  <router-view />
</template>

<script setup>
import { ref, provide } from 'vue';

// Create error ref that'll be used by different components
const error = ref(null)
provide("error", error)


const mobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

</script>

<style>
nav a.router-link-exact-active {
  color: white;
  background: rgb(17, 167, 227);
  border-color: transparent;
}
</style>