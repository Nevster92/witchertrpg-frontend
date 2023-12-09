<script setup lang="ts">
import { answer, createClient } from "@/api/wsAPI";
import SockJS from "sockjs-client/dist/sockjs.min.js";
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const address: string = route.params.address as any;

const uzenetek = ref("");
let stompClient = createClient(address);

let uzenet = "";

var access_token = localStorage.getItem("cookie");
var header = {
  "X-Authorization": "Bearer " + access_token,
};

stompClient.connect(
  header,
  function () {
    stompClient.subscribe("/topic/room/" + address, function (greeting) {
      // uzenetek.value = JSON.parse(greeting.body);
      uzenetek.value = JSON.parse(greeting.body);
      console.log(JSON.parse(greeting.body));
    });
  },
  (error) => {
    console.log(error);
  }
);

function kiir() {
  console.log(uzenet);
  stompClient.send(
    "/app/" + address + "/room_message",
    JSON.stringify({ name: uzenet })
  );
}

function test() {
  console.log(address);
}
</script>

<template>
  <div class="container">
    Üzenet:
    <h1>{{ uzenetek }}</h1>

    <!--   <input v-model="uzenet" /> -->
    <v-text-field v-model="uzenet"></v-text-field>

    <v-btn @click="kiir">KÜLDÉS</v-btn>
    <v-btn @click="test">TEST</v-btn>

    <v-text-field label="csatorna" v-model="address"></v-text-field>
  </div>
</template>

<style>
.container {
  color: white;
  width: 250px;
}
</style>
