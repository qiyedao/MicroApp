<script setup lang="ts"></script>

<template>
  <div class="app-layout">
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src="./assets/vite.svg" class="logo" alt="Vite logo" />
      </a>
      <a href="https://vuejs.org/" target="_blank">
        <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
      </a>
    </div>
    <router-link to="/">index----</router-link>
    <div></div>
    <router-link to="/hello?vue=1">hello----</router-link>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
.app-layout {
  padding: 20px;
}
</style>
