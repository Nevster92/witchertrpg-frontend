<script setup lang="ts">
import { getCampaignById } from "@/api/campaignAPI";
import type { Campaign } from "@/api/types";
import { createClient } from "@/api/wsAPI";
import { ref } from "vue";
import { useRoute } from "vue-router";
import { attributes } from "@/utils/stringRepo";

const route = useRoute();
const roomId: string = route.params.id as any;
const campaignRef = ref<Campaign>();
const message = ref<string>("");
const abillityRef = ref<string>("");

getCampaignById(roomId).then((resoult) => {
  campaignRef.value = resoult;
});

const chatContainerRef = ref<string[]>([]);

let stompClient = createClient(roomId);
var access_token = localStorage.getItem("cookie");
var header = {
  "X-Authorization": "Bearer " + access_token,
};

stompClient.connect(
  header,
  function () {
    stompClient.subscribe("/topic/room/" + roomId, function (greeting) {
      chatContainerRef.value.push(JSON.parse(greeting.body));
      console.log(JSON.parse(greeting.body));
    });
  },
  (error) => {
    console.log("ERROR!");
    console.log(error);
  }
);

function sendMessage() {
  stompClient.send(
    "/app/" + roomId + "/room_message",
    JSON.stringify({ name: message.value })
  );
}
function sendAbillityRoll(a: string) {
  console.log(a);
  stompClient.send(
    "/app/" + roomId + "/roll_attribute",
    JSON.stringify({
      characterId: campaignRef.value?.characterId,
      abillityString: a,
    })
  );
}
</script>

<template>
  <v-card
    class="align-center ma-16 pa-3"
    color="white"
    variant="outlined"
    width="800"
    height="800"
    :title="campaignRef?.title"
  >
    <v-card-text>
      <a v-for="line in chatContainerRef"> {{ line }} <br /> </a>
    </v-card-text>

    <v-text-field v-model="message"></v-text-field>
    <v-btn @click="sendMessage">KÜLDÉS</v-btn>
    <v-autocomplete
      v-model="abillityRef"
      label="Abillity check"
      :items="attributes"
    ></v-autocomplete>
    <v-btn @click="sendAbillityRoll(abillityRef)">Roll</v-btn>
  </v-card>
</template>
