<script setup lang="ts">
import {
  dropItem,
  getAllWearedArmor,
  getAllWearedWeapons,
} from "@/api/invenotryApi";
import type { Armor, Weapon } from "@/api/types";
import { ref } from "vue";
import { mdiArrowDownBoldOutline } from "@mdi/js";

const props = defineProps<{
  characterId: number;
}>();

const weaponsRef = ref<Weapon[]>([]);
const armorsRef = ref<Armor[]>([]);

getAllWearedWeapons(props.characterId)
  .then((resoult) => {
    weaponsRef.value = resoult;
  })
  .catch((error) => {
    console.log("hiba a komponensben");
  });

getAllWearedArmor(props.characterId)
  .then((resoult) => {
    armorsRef.value = resoult;
  })
  .catch((error) => {
    console.log("hiba a komponensben");
  });

function dropThisItem(bodyPart: string) {
  dropItem(props.characterId, bodyPart);
}
</script>

<template>
  <div class="d-flex">
    <v-row align="center" class="first-row">
      <v-col>
        <v-sheet :width="200" color="white" rounded class="pa-2 ma-2">
          <p>Left Hand</p>
          {{ weaponsRef[0]?.name }}
          <v-icon
            @click="dropThisItem('l_arm')"
            :icon="mdiArrowDownBoldOutline"
          ></v-icon>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-sheet :width="150" color="white" rounded class="pa-2 ma-2">
          <p>Head</p>
          {{ armorsRef?.find((e) => e.category == "head")?.name }}
          <v-icon
            @click="dropThisItem('head')"
            :icon="mdiArrowDownBoldOutline"
          ></v-icon>
        </v-sheet>
        <v-sheet color="white" rounded class="pa-2 ma-2">
          <p>Torso</p>
          {{ armorsRef?.find((e) => e.category == "torso")?.name }}
          <v-icon
            @click="dropThisItem('torso')"
            :icon="mdiArrowDownBoldOutline"
          ></v-icon>
        </v-sheet>
        <v-sheet color="white" rounded class="pa-2 ma-2">
          <p>Legs</p>
          {{ armorsRef?.find((e) => e.category == "legs")?.name }}
          <v-icon
            @click="dropThisItem('legs')"
            :icon="mdiArrowDownBoldOutline"
          ></v-icon>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col>
        <v-sheet color="white" :width="200" rounded class="pa-2 ma-2">
          <p>Right Hand</p>
          {{ weaponsRef[1]?.name }}
          <v-icon
            @click="dropThisItem('r_arm')"
            :icon="mdiArrowDownBoldOutline"
          ></v-icon>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<style>
.first-row {
  margin-top: 12px;
}
</style>
