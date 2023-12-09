<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import { registration } from "@/api/userAPI";

const username = ref<string>("");
const password = ref<string>("");
const passwordCheck = ref<string>("");
const email = ref<string>("");

const valid = ref<boolean>(false);

function goToLogin() {
  router.push({ name: "login" });
}
async function sendRegistration() {
  if (password.value != passwordCheck.value) {
    valid.value = !valid.value;
  }
  try {
    await registration({
      username: username.value,
      password: password.value,
      email: email.value,
    }).then(() => {
      router.push({ name: "login" });
    });
  } catch (error) {
    valid.value = !valid.value;
  }
}
</script>

<template>
  <body class="login">
    <v-card
      color="white"
      variant="outlined"
      class="login-form"
      @keyup.enter="sendRegistration"
    >
      <v-card-title> Registration</v-card-title>
      <v-card-text>
        Username:
        <v-text-field v-model="username" label="Username"></v-text-field>
        Password:
        <v-text-field v-model="password" label="Password"></v-text-field>
        Password again:
        <v-text-field v-model="passwordCheck" label="Password"></v-text-field>
        Email:
        <v-text-field v-model="email" label="Email address"></v-text-field>
        <p v-if="valid" class="alert-invalid-credentials">
          Invalid Username or Password!
        </p>
      </v-card-text>

      <a class="d-flex">
        <v-card-actions>
          <v-btn @click="sendRegistration"> Register </v-btn>
        </v-card-actions>

        <v-card-actions>
          <v-btn @click="goToLogin"> Login </v-btn>
        </v-card-actions>
      </a>
    </v-card>
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
