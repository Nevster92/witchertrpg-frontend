<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import WebsocketProvider from "@/components/WebsocketProvider.vue";
import { mdiAccount, mdiSwordCross, mdiCampfire, mdiLogout } from "@mdi/js";
import { ref } from "vue";
import router from "./router";
</script>

<template>
  <body class="body">
    <RouterView class="all"> </RouterView>
  </body>

  <!--     <WebsocketProvider>

    </WebsocketProvider>
    <v-btn>
  Button
</v-btn> -->
</template>

<style>
.body {
  background-color: black;
  color: white;
  overflow: visible;
}
</style>
