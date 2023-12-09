<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from "vue-router";
import { mdiPlusCircleOutline } from "@mdi/js";
import { ref } from "vue";
import type { Character } from "@/api/types";
import { getAllCharacters } from "@/api/characterRawAPI";
import { useCharacterStore } from "@/store/characterStore";
import CharacterCard from "@/components/CharacterCard.vue";
import router from "@/router";

const characterStore = useCharacterStore();

getAllCharacters().then((characters) => {
  characterStore.setAllCharacters(characters);
});

function goToCreateCharacter() {
  router.push({ name: "charactercreation" });
}
</script>

<template>
  <v-card
    class="d-flex justify-center align-center ma-16"
    color="white"
    variant="outlined"
    width="300"
    height="400"
  >
    <v-btn
      @click="goToCreateCharacter"
      color="black"
      size="150"
      :icon="mdiPlusCircleOutline"
    >
      <v-icon size="130" :icon="mdiPlusCircleOutline"></v-icon>
    </v-btn>
  </v-card>

  <div v-for="item in characterStore.getCharacterCards">
    <CharacterCard :card-data="item"> </CharacterCard>
  </div>
</template>

<style></style>
@/api/characterRawAPI
