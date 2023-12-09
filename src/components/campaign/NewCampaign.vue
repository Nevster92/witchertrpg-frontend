<script setup lang="ts">
import { computed, ref } from "vue";
import type { Campaign } from "@/api/types";
import { createNewCampaign } from "@/api/campaignAPI";
import router from "@/router";

const detailsRef = ref<Campaign>({
  title: "",
  description: "",
});

const defi = defineModel<Campaign>();
function create() {
  createNewCampaign(detailsRef.value);
  router.push({
    name: "campaigns",
  });
  window.location.reload();
}

const validate = computed(() => {
  /*   if (
    detailsRef.value?.title == undefined ||
    detailsRef.value?.description == undefined ||
    detailsRef.value?.title == "" ||
    detailsRef.value?.description == ""
  ) {
    return true;
  } */
  return false;
});
</script>

<template>
  <v-card
    class="align-center ma-16 pa-3"
    color="white"
    variant="outlined"
    width="300"
    height="400"
    title="Start New Campaign"
  >
    <v-text-field label="Title" v-model="detailsRef.title"></v-text-field>
    <v-text-field
      label="Description"
      v-model="detailsRef.description"
    ></v-text-field>

    <v-btn color="blue" @click="create">Create</v-btn>
  </v-card>
</template>
