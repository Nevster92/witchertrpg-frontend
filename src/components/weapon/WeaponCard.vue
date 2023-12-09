<script setup lang="ts">
import {
  deleteWeaponFromInvenotry,
  getAllWeaponByCharacterId,
  setWeaponAttr,
  wearItem,
} from "@/api/invenotryApi";
import type { Weapon } from "@/api/types";
import { ref } from "vue";

import WeaponRowEdit from "@/components/weapon/WeaponRowEdit.vue";
import {
  mdiCogOutline,
  mdiPlus,
  mdiDelete,
  mdiArrowUpBoldOutline,
} from "@mdi/js";
import AddWeaponDialog from "./AddWeaponDialog.vue";

const props = defineProps<{
  characterId: number;
}>();

const weaponsRef = ref<Weapon[]>([]);
const editorMode = ref<boolean>(false);

try {
  getAllWeaponByCharacterId(props.characterId)
    .then((resoult) => {
      weaponsRef.value = resoult;
    })
    .catch((error) => {
      console.log("hiba a komponensben");
    });
} catch (error) {
  console.log("Something ERROR");
}

function deleteItem(weaponId: number) {
  try {
    deleteWeaponFromInvenotry(weaponId)
      .then(() => {
        weaponsRef.value = weaponsRef.value.filter(
          (weapon) => weapon.id !== weaponId
        );
      })
      .catch((error) => {
        console.log("hiba a komponensben");
      });
  } catch (error) {
    console.log("Something ERROR");
  }
}

function putItem(item: Weapon) {
  try {
    wearItem({
      characterId: props.characterId,
      bodyPart: "l_arm",
      itemId: item.id,
    });
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <v-card class="ma-3" variant="tonal" color="white">
    <v-table density="compact" theme="dark">
      <thead>
        <p>Weapons</p>
        <!--     <v-btn @click="test">TEST</v-btn> -->
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Category</th>
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
          <th class="text-left">
            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" size="22" :icon="mdiPlus"></v-icon>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Edit">
                  <AddWeaponDialog
                    :character-id="props.characterId"
                    @submit="
                      (item) => {
                        isActive.value = false;
                        weaponsRef.push(item);
                      }
                    "
                  >
                  </AddWeaponDialog>
                  <v-btn @click="isActive.value = false" color="red"
                    >Cancel</v-btn
                  >
                </v-card>
              </template>
            </v-dialog>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in weaponsRef" :key="item.name">
          <td
            v-for="(v, k) in Object.entries(item).slice(
              1,
              Object.entries(item).length - 1
            )"
          >
            {{ v[1] }}
          </td>
          <td class="d-flex">
            <v-dialog width="400">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" size="18" :icon="mdiDelete"></v-icon>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Delete">
                  <v-card-text>
                    Are you sure to delete {{ item.name }} ?
                  </v-card-text>

                  <v-card-actions>
                    <v-btn
                      color="green"
                      text="Delete"
                      @click="
                        () => {
                          isActive.value = false;
                          deleteItem(item.id);
                        }
                      "
                    ></v-btn>
                    <v-btn
                      color="red"
                      text="Cancel"
                      @click="isActive.value = false"
                    ></v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>

            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" size="18" :icon="mdiCogOutline"></v-icon>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Edit">
                  <WeaponRowEdit
                    @submit="isActive.value = false"
                    :character-id="props.characterId"
                    :item="item"
                  >
                  </WeaponRowEdit>
                  <v-btn @click="isActive.value = false" color="red"
                    >Cancel</v-btn
                  >
                </v-card>
              </template>
            </v-dialog>
            <v-icon @click="putItem(item)" :icon="mdiArrowUpBoldOutline">
            </v-icon>
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
