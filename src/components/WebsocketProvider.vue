<script setup lang="ts">
import SockJS from "sockjs-client/dist/sockjs.min.js";
import { ref } from "vue";
import Stomp from "webstomp-client";

const uzenetek = ref("ezmég semmi");

let stompClient = null;

function connect() {
  var access_token = localStorage.getItem("cookie");
  const socket = new SockJS("http://localhost:8081/stomp-endpoint");

  /*    const socket = new SockJS("http://localhost:8081/stomp-endpoint", {
  headers: {
    Authorization: "Bearer " + access_token
  }
});  */

  // document.cookie = 'X-Authorization:' + access_token + '; path=/';
  var header = {
    "X-Authorization": "Bearer " + access_token,
  };
  stompClient = Stomp.over(socket);

  stompClient.connect(
    header,
    function (frame) {
      console.log("frame:");
      console.log(frame);

      stompClient.subscribe("/topic/greetings", function (greeting) {
        uzenetek.value = JSON.parse(greeting.body);
        console.log(JSON.parse(greeting.body));
      });
    },
    (error) => {
      console.log(error);
    }
  );
}

let uzenet = "";

function kiir() {
  console.log(uzenet);

  stompClient.send("/app/hello", JSON.stringify({ name: uzenet }));
}
</script>

<template>
  Üzenet:
  <h1>{{ uzenetek }}</h1>

  <button @click="connect">CONNECT</button>

  <!--   <input v-model="uzenet" /> -->
  <v-text-field v-model="uzenet"></v-text-field>

  <v-btn @click="kiir">KÜLDÉS</v-btn>
</template>
