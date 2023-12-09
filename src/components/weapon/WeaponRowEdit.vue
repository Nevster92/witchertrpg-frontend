<script setup lang="ts">
import { ref } from "vue";
import { mdiCogOutline } from "@mdi/js";
import type { UpdateItem, Weapon } from "@/api/types";
import { setWeaponAttr } from "@/api/invenotryApi";

const props = defineProps<{
  item: Weapon;
}>();
const adat = ref<UpdateItem[]>([]);
const originalData = ref<Weapon>(props.item);
const emit = defineEmits<{
  (e: "submit"): void;
}>();

function changeAttr(attrValue, attrKey) {
  originalData.value[attrKey] = attrValue;
  for (const item of adat.value) {
    if (
      item.attribute == attrKey.replace(/[A-Z]/g, (m) => "_" + m.toLowerCase())
    ) {
      item.value = attrValue;
      return;
    }
  }
  adat.value.push({
    itemId: props.item.id,
    attribute: attrKey.replace(/[A-Z]/g, (m) => "_" + m.toLowerCase()),
    value: attrValue,
  });
  return;
}
function sendChanges() {
  for (const weapon of adat.value) {
    try {
      setWeaponAttr(weapon);
    } catch (error) {
      console.log("Something ERROR");
    }
  }
  adat.value = [];
  emit("submit");
}
</script>

<template>
  <div v-for="attr in Object.entries(originalData)">
    <v-text-field
      clearable
      :model-value="attr[1]"
      :label="attr[0]"
      @update:modelValue="
        (mod) => {
          changeAttr(mod, attr[0]);
        }
      "
    ></v-text-field>
  </div>

  <div>
    <v-btn @click="sendChanges" color="green">Send</v-btn>
  </div>
</template>
