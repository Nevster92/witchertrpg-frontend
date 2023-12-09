<script setup lang="ts">
import { logIn } from "@/api/userAPI";
import { ref } from "vue";
import type { logInData, loginData } from "@/api/userAPI";
import router from "@/router";

async function logInSend() {
  // TODO ellenőrzés: hossz, üres, nemmegfelelö karakter
  if (username.value != "" || password.value != "") {
    try {
      await logIn({ username: username.value, password: password.value }).then(
        () => {
          console.log("ELJUT IDE");
          router.push({ name: "dashboard" });
        }
      );
    } catch (error) {
      valid.value = true;
    }
  } else {
    valid.value = true;
  }
}

const username = ref<string>("");
const password = ref<string>("");
const valid = ref<boolean>(false);

function goToRegistration() {
  router.push({ name: "registration" });
}
</script>

<template>
  <v-card
    color="white"
    variant="outlined"
    class="login-form"
    @keyup.enter="logInSend"
  >
    <v-card-title> Login</v-card-title>
    <v-card-text>
      Username:
      <v-text-field v-model="username" label="Username"></v-text-field>
      Password:
      <v-text-field v-model="password" label="Password"></v-text-field>
      <p v-if="valid" class="alert-invalid-credentials">
        Invalid Username or Password!
      </p>
    </v-card-text>

    <a class="d-flex">
      <v-card-actions>
        <v-btn @click="logInSend"> Login </v-btn>
      </v-card-actions>

      <v-card-actions>
        <v-btn @click="goToRegistration"> Registration </v-btn>
      </v-card-actions>
    </a>
  </v-card>
</template>

<style>
.login-form {
  position: absolute;
  width: 30%;
  height: 30%;
}
.alert-invalid-credentials {
  color: red;
}
</style>
