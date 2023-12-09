<script setup lang="ts">
import { addWeaponToInv, getAllWeapons } from "@/api/invenotryApi";
import type { Weapon } from "@/api/types";
import { ref } from "vue";

const weaponListRef = ref<Weapon[]>([]);
const props = defineProps<{
  characterId: number;
}>();
const emit = defineEmits<{
  (e: "submit", item: Weapon): void;
}>();

try {
  getAllWeapons()
    .then((resoult) => {
      weaponListRef.value = resoult;
    })
    .catch((error) => {
      console.log("hiba a komponensben");
    });
} catch (error) {
  console.log("Something ERROR");
}

function addItem(item: Weapon) {
  try {
    addWeaponToInv(item, props.characterId)
      .then((resoult) => {
        emit("submit", item);
      })
      .catch((error) => {
        console.log("hiba a komponensben");
      });
  } catch (error) {
    console.log("Something ERROR");
  }
}
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">Name</th>
        <th class="text-left">Type</th>
        <th class="text-left">WA</th>
        <th class="text-left">Avail.</th>
        <th class="text-left">DMG</th>
        <th class="text-left">Rel.</th>
        <th class="text-left">Hands</th>
        <th class="text-left">Range</th>
        <th class="text-left">Effect</th>
        <th class="text-left">Conc.</th>
        <th class="text-left">EN</th>
        <th class="text-left">Weight</th>
        <th class="text-left">Cost</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in weaponListRef" :key="item.name">
        <td><v-btn @click="addItem(item)" color="green">Add</v-btn></td>
        <td
          v-for="(v, k) in Object.entries(item).slice(
            1,
            Object.entries(item).length - 1
          )"
        >
          {{ v[1] }}
        </td>
      </tr>
    </tbody>
  </v-table>
</template>
