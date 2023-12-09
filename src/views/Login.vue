<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import background_logo from "@/assets/background_logo.jpeg";
import LoginForm from "@/components/LoginForm.vue";
</script>

<template>
  <body class="login">
    <LoginForm> </LoginForm>
  </body>
</template>

<style>
.text {
  color: white;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;

  background-image: url("@/assets/background_logo.jpeg");
  background-position: center;
  background-size: cover;
}
</style>
