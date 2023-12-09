<script setup lang="ts">
import {
  deleteArmorFromInvenotry,
  getAllArmorByCharacterId,
  wearItem,
} from "@/api/invenotryApi";
import type { Armor } from "@/api/types";
import ArmorRowEdit from "@/components/armor/ArmorRowEdit.vue";
import AddArmorDialog from "@/components/armor/AddArmorDialog.vue";
import {
  mdiCogOutline,
  mdiDelete,
  mdiPlus,
  mdiArrowUpBoldOutline,
} from "@mdi/js";

import { ref } from "vue";

const props = defineProps<{
  characterId: number;
}>();

const armorRef = ref<Armor[]>([]);

try {
  getAllArmorByCharacterId(props.characterId)
    .then((resoult) => {
      armorRef.value = resoult;
    })
    .catch((error) => {
      console.log("hiba a komponensben");
    });
} catch (error) {
  console.log("Something ERROR");
}

function deleteItem(armorId: number) {
  try {
    deleteArmorFromInvenotry(armorId)
      .then(() => {
        armorRef.value = armorRef.value.filter((armor) => armor.id !== armorId);
      })
      .catch((error) => {
        console.log("hiba a komponensben");
      });
  } catch (error) {
    console.log("Something ERROR");
  }
}
function putItem(item: Armor) {
  try {
    wearItem({
      characterId: props.characterId,
      bodyPart: item.category,
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
        <p>Armors</p>
        <!--     <v-btn @click="test">TEST</v-btn> -->
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Category</th>
          <th class="text-left">SP</th>
          <th class="text-left">Avail.</th>
          <th class="text-left">AE</th>
          <th class="text-left">Effect</th>
          <th class="text-left">EV</th>
          <th class="text-left">Weight</th>
          <th class="text-left">Price</th>
          <th>
            <v-dialog width="500">
              <template v-slot:activator="{ props }">
                <v-icon v-bind="props" size="22" :icon="mdiPlus"></v-icon>
              </template>

              <template v-slot:default="{ isActive }">
                <v-card title="Edit">
                  <AddArmorDialog
                    :character-id="props.characterId"
                    @submit="
                      (item) => {
                        isActive.value = false;
                        armorRef.push(item);
                      }
                    "
                  >
                  </AddArmorDialog>
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
        <tr v-for="item in armorRef" :key="item.name">
          <td v-for="(v, k) in Object.entries(item).slice(1)">
            {{ v[1] }}
          </td>

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
              <v-icon v-bind="props" size="14" :icon="mdiCogOutline"></v-icon>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card title="Edit">
                <ArmorRowEdit
                  @submit="isActive.value = false"
                  :character-id="props.characterId"
                  :item="item"
                >
                </ArmorRowEdit>
                <v-btn @click="isActive.value = false" color="red"
                  >Cancel</v-btn
                >
              </v-card>
            </template>
          </v-dialog>
          <v-icon @click="putItem(item)" :icon="mdiArrowUpBoldOutline">
          </v-icon>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>
