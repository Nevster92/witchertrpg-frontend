<script setup lang="ts">
import { ref } from "vue";
import { setCharacterAttribute } from "@/api/characterRawAPI";
import { mdiCogOutline } from "@mdi/js";
import type { attrPair } from "@/api/types";

const props = defineProps<{
  attributePair: attrPair;
  characterId?: number;
}>();
const isError = ref<string>("");
const editorMode = ref<boolean>(false);

const adat = ref(props.attributePair.attrValue);

function sendChange() {
  try {
    setCharacterAttribute(
      props.characterId,
      props.attributePair.attrKey,
      adat.value
    )
      .then(() => {
        isError.value = "";
        editorMode.value = false;
      })
      .catch((error) => {
        isError.value = "Invalid input";
      });
  } catch (error) {
    console.log(error);
    console.log("Something ERROR");
  }
}
</script>

<template>
  <div class="text-subtitle-1 d-flex">
    {{ attributePair.attrKey }}:
    <a v-if="!editorMode">{{ adat }}</a>
    <v-text-field
      v-if="editorMode"
      :error-messages="isError"
      density="compact"
      @keyup.enter="sendChange()"
      class="text-subtitle-1 ma-1"
      v-model="adat"
    >
    </v-text-field>
    <v-icon
      @click="
        () => {
          editorMode = !editorMode;
        }
      "
      size="14"
      :icon="mdiCogOutline"
    ></v-icon>
  </div>
</template>
