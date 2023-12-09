<script setup lang="ts">
import { computed, ref } from "vue";
import type {
  Campaign,
  Character,
  CharacterCard,
  JoiningRequest,
} from "@/api/types";
import { createNewCampaign, joinCampaign } from "@/api/campaignAPI";
import router from "@/router";
import { useCharacterStore } from "@/store/characterStore";
import { getAllCharacters } from "@/api/characterRawAPI";

const characterStore = useCharacterStore();
const invitationLinkRef = ref<JoiningRequest>({
  invitationLink: undefined,
  characterId: undefined,
});
const selectedCharacterRef = ref();

getAllCharacters().then((characters) => {
  characterStore.setAllCharacters(characters);
});

function clickJoin() {
  if (
    invitationLinkRef.value.characterId != undefined &&
    invitationLinkRef.value.invitationLink != undefined
  ) {
    joinCampaign(invitationLinkRef.value)
      .then((resoult) => {
        console.log(resoult);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
    router.push({
      name: "campaigns",
    });
  }
}
function itemProps(item) {
  return {
    title: item.name,
  };
}
</script>

<template>
  <v-card
    class="align-center ma-16 pa-3"
    color="white"
    variant="outlined"
    width="300"
    height="400"
    title="Join Campaign"
  >
    <v-select
      label="Character"
      :items="characterStore.getCharacterCards"
      :item-props="itemProps"
      :item-value="(item) => item.id"
      v-model="invitationLinkRef.characterId"
    ></v-select>
    <v-text-field
      label="Invitation Link"
      v-model="invitationLinkRef.invitationLink"
    ></v-text-field>

    <v-btn color="green" @click="clickJoin">Join</v-btn>
  </v-card>
</template>
