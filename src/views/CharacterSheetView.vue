<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref } from "vue";
import type { CharAttributes, Character } from "@/api/types";
import { getCharacterById } from "@/api/characterRawAPI";
import { charFormater } from "@/api/characterApi";
import AttributeSlot from "@/components/AttributeSlot.vue";
import WeaponCard from "@/components/weapon/WeaponCard.vue";
import ArmorCard from "@/components/armor/ArmorCard.vue";
import WearingCard from "@/components/wearing/WearingCard.vue";

const route = useRoute();
const id: number = route.params.id as any;

const characterRef = ref<CharAttributes>();
const characterRawRef = ref<Character>();

getCharacterById(id).then((character) => {
  characterRawRef.value = character;
  characterRef.value = charFormater(character);
});
</script>

<template>
  <div class="d-flex flex-wrap">
    <div class="attribute-box d-flex flex-wrap">
      <v-card
        v-for="(attrGroup, key) in characterRef"
        class="ma-3 align-self-start"
        variant="tonal"
        max-width="344"
        color="white"
        width="200"
      >
        <v-card-item>
          <div class="text-h5 mb-1">{{ key }}</div>
          <AttributeSlot
            v-for="(value, key) in attrGroup"
            :characterId="characterRef?.general.id"
            :attributePair="{ attrKey: key, attrValue: value }"
          >
          </AttributeSlot>
        </v-card-item>
      </v-card>
    </div>
  </div>

  <div class="wearing">
    <p class="title">Wearing</p>
    <WearingCard :characterId="id"></WearingCard>
  </div>

  <div class="inventory">
    <p class="title">Inventory</p>
    <WeaponCard :character-id="id"></WeaponCard>
    <ArmorCard :character-id="id"></ArmorCard>
  </div>
</template>
<style>
.attribute-box {
  width: 800px;
}
.inventory {
  border-style: solid;
  border-width: 2px;
  border-color: azure;
}
.title {
  text-align: center;
  color: white;
  font-size: x-large;
}
.wearing {
  border-style: solid;
  border-width: 2px;
  border-color: azure;
}
</style>
