<script setup lang="ts">
import router from "@/router";

import type { CharacterCard } from "@/api/types";

const props = defineProps<{
  cardData: CharacterCard;
}>();
</script>

<template>
  <v-card
    class="ma-16 flex-direction: column"
    color="white"
    variant="outlined"
    width="300"
    height="400"
  >
    <v-card-title>
      <p class="text-h4 text--primary">
        {{ props.cardData.name }}
      </p>
    </v-card-title>

    <v-card-text class="details">
      race: {{ props.cardData.race }} <br />
      profession: {{ props.cardData.profession }} <br />
      age: {{ props.cardData.age }} <br />
      gender: {{ props.cardData.gender }} <br />
    </v-card-text>

    <v-btn class="ma-4">Törlés</v-btn>
    <v-btn
      @click="
        () => {
          router.push({
            name: 'charactersheet',
            params: { id: props.cardData.id },
          });
        }
      "
      >Karakterlap</v-btn
    >
  </v-card>
</template>

<style>
.details {
  font-size: large;
}
</style>
