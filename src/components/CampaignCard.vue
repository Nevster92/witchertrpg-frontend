<script setup lang="ts">
import router from "@/router";

import type { Campaign, CampaignCard } from "@/api/types";

const props = defineProps<{
  cardData: Campaign;
  isPlayer: boolean;
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
        {{ props.cardData.title }}
      </p>
    </v-card-title>

    <v-card-text class="details">
      As: <a v-if="isPlayer">player</a> <a v-else>DM</a> <br />
      Decription: <br />{{ props.cardData.description }} <br />
      <a v-if="!isPlayer">Invitation link: {{ cardData.invitationLink }}</a>
    </v-card-text>
    <slot name="actions"> </slot>
  </v-card>
</template>

<style>
.details {
  font-size: large;
}
</style>
