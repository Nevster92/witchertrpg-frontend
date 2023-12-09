<script setup lang="ts">
import { updateUser, type registrationData, getUserData } from "@/api/userAPI";
import { ref } from "vue";

const emailRef = ref();
const usernameRef = ref();
// const emailRef = ref();
// const usernameRef = ref();
const passwordRef = ref();
const passwordCheckRef = ref();

function passwordRule() {
  if (passwordRef.value == passwordCheckRef.value) {
    return true;
  }
  return "Passwords must be the same!";
}

getUserData().then((res) => {
  emailRef.value = res.email;
  usernameRef.value = res.username;
});

function update() {
  updateUser({
    username: usernameRef,
    password: passwordRef,
    email: emailRef,
  }).then((resoult) => {
    console.log(resoult);
  });
}
</script>

<template>
  <v-card
    class="d-flex flex-column ma-16 pa-3"
    color="white"
    variant="outlined"
    min-width="400px"
    title="User details:"
  >
    <v-text-field v-model="emailRef" label="Email" required></v-text-field>
    <v-text-field
      v-model="usernameRef"
      label="Username"
      required
    ></v-text-field>
    <v-text-field
      v-model="passwordRef"
      label="Password"
      type="password"
      required
    ></v-text-field>
    <v-text-field
      v-model="passwordCheckRef"
      label="Passworg again"
      type="password"
      :rules="[passwordRule]"
      required
    ></v-text-field>
    <div class="d-flex justify-center">
      <v-btn @click="update" color="green"> Save </v-btn>
    </div>
  </v-card>
</template>
