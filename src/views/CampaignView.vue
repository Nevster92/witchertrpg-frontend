<script setup lang="ts">
import {
  deleteCampaign,
  getAllCampaignsAsDm,
  getAllCampaignsAsPlayer,
} from "@/api/campaignAPI";
import type { Campaign } from "@/api/types";
import CampaignCard from "@/components/CampaignCard.vue";
import { ref } from "vue";
import NewCampaign from "@/components/campaign/NewCampaign.vue";
import JoinCampaign from "@/components/campaign/JoinCampaign.vue";
import router from "@/router";

//TODO lekérem a kampányok listáját.
const dmCampaignsRef = ref<Campaign[]>([]);
const playerCampaignsRef = ref<Campaign[]>([]);

getAllCampaignsAsDm()
  .then((resoult) => {
    dmCampaignsRef.value = resoult;
  })
  .catch((error) => {
    console.log("hiba a komponensben");
  });

getAllCampaignsAsPlayer()
  .then((resoult) => {
    playerCampaignsRef.value = resoult;
  })
  .catch((error) => {
    console.log("hiba a komponensben");
  });

function delCampaign(campaignId: number) {
  deleteCampaign(campaignId)
    .then((resoult) => {
      console.log(resoult);
    })
    .catch((error) => {
      console.log("hiba a komponensben");
    });
  window.location.reload();
}
</script>

<template>
  <JoinCampaign></JoinCampaign>
  <NewCampaign></NewCampaign>

  <div v-for="item in dmCampaignsRef">
    <CampaignCard :card-data="item" :is-player="false">
      <template #actions>
        <v-btn @click="delCampaign(item.id)" color="red">Delete</v-btn>
        <v-btn
          @click="
            () => {
              router.push({
                name: 'room',
                params: { id: item.id },
              });
            }
          "
          color="blue"
          >Enter</v-btn
        >
      </template>
    </CampaignCard>
  </div>

  <div v-for="item in playerCampaignsRef">
    <CampaignCard :card-data="item" :is-player="true">
      <template #actions>
        <v-btn
          @click="
            () => {
              router.push({
                name: 'room',
                params: { id: item.id },
              });
            }
          "
          color="blue"
          >Enter</v-btn
        >
      </template>
    </CampaignCard>
  </div>
</template>
