<script setup lang="ts">
import { createNewCharacter } from "@/api/characterRawAPI";
import type { newCharacterAttributes } from "@/api/types";
import router from "@/router";
import { computed, ref } from "vue";

const attrRef = ref<newCharacterAttributes>({
  name: "",
  profession: "",
  race: "",
  gender: "",
  intelligence: 0,
  ref: 0,
  dex: 0,
  body: 0,
  spd: 0,
  emp: 0,
  cra: 0,
  will: 0,
  luck: 0,
});
const maxPointsRef = ref<number>(60);
const isError = ref<boolean>(false);

const spendablePointsRef = computed<number>(() => {
  let remaining =
    maxPointsRef.value -
    (attrRef.value.intelligence +
      attrRef.value.ref +
      attrRef.value.dex +
      attrRef.value.body +
      attrRef.value.spd +
      attrRef.value.emp +
      attrRef.value.cra +
      attrRef.value.will +
      attrRef.value.luck);

  return remaining;
});

const isFilled = computed<boolean>(() => {
  if (
    attrRef.value.name == "" ||
    attrRef.value.profession == "" ||
    attrRef.value.race == "" ||
    attrRef.value.gender == "" ||
    spendablePointsRef.value != 0
  ) {
    return true;
  }
  return false;
});

function createCharacter() {
  try {
    createNewCharacter(attrRef.value)
      .then(() => {
        router.push({ name: "characters" });
      })
      .catch((error) => {
        isError.value = true;
      });
  } catch (error) {
    console.log(error);
  }
}

// TODO profession-race kutyulása
</script>

<template>
  <v-card class="attr-board" color="white" variant="outlined">
    <v-container>
      <p class="text-h5">Name:</p>
      <v-text-field v-model="attrRef.name" label="Név" required></v-text-field>
      <v-divider class="border-opacity-75 divider"></v-divider>
      <p class="text-h5">Profession:</p>

      <v-radio-group v-model="attrRef.profession" inline class="d-felx">
        <v-radio label="Witcher" value="witcher"></v-radio>
        <v-radio label="Man at arms" value="man_at_arms"></v-radio>
        <v-radio label="Mage" value="mage"></v-radio>
        <v-radio label="Criminal" value="criminal"></v-radio>
        <v-radio label="Doctor" value="doctor"></v-radio>
        <v-radio label="Bard" value="bard"></v-radio>
        <v-radio label="Craftsman" value="craftsman"></v-radio>
        <v-radio label="Priest" value="priest"></v-radio>
      </v-radio-group>

      <v-divider class="border-opacity-75 divider"></v-divider>
      <p class="text-h5">Race:</p>
      <v-radio-group v-model="attrRef.race" inline class="d-felx">
        <v-radio
          :disabled="
            attrRef.profession == 'mage' || attrRef.profession == 'witcher'
              ? true
              : false
          "
          label="Human"
          value="human"
        ></v-radio>
        <v-radio
          :disabled="
            attrRef.profession == 'mage' || attrRef.profession == 'witcher'
              ? true
              : false
          "
          label="Elf"
          value="elf"
        ></v-radio>
        <v-radio
          :disabled="
            attrRef.profession == 'mage' || attrRef.profession == 'witcher'
              ? true
              : false
          "
          label="Dwarf"
          value="dwarf"
        ></v-radio>
        <v-radio
          :disabled="attrRef.profession != 'witcher' ? true : false"
          label="Witcher"
          value="witcher"
        ></v-radio>
        <v-radio
          :disabled="attrRef.profession != 'mage' ? true : false"
          label="Mage"
          value="mage"
        ></v-radio>
      </v-radio-group>

      <v-divider class="border-opacity-75 divider"></v-divider>

      <p class="text-h5">Gender:</p>
      <v-radio-group v-model="attrRef.gender" inline class="d-felx">
        <v-radio label="Male" value="male"></v-radio>
        <v-radio label="Female" value="female"></v-radio>
      </v-radio-group>
      <v-divider class="border-opacity-75 divider"></v-divider>
      <p class="text-h5">Basic Skills:</p>
      <p class="text-h5">Remaining points: {{ spendablePointsRef }}</p>

      <v-row no-gutters>
        <v-col>
          <v-text-field
            type="number"
            min="0"
            v-model.number="attrRef.intelligence"
            density="compact"
            class="attr"
          >
            <template v-slot:prepend>Intelligence:</template>
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            type="number"
            min="0"
            v-model.number="attrRef.ref"
            density="compact"
            class="attr"
          >
            <template v-slot:prepend>Reflex:</template>
          </v-text-field>
        </v-col>

        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-text-field
            type="number"
            min="0"
            v-model.number="attrRef.dex"
            density="compact"
            class="attr"
          >
            <template v-slot:prepend>Dexterity:</template>
          </v-text-field>
        </v-col>

        <v-col>
          <v-text-field
            type="number"
            min="0"
            v-model.number="attrRef.body"
            density="compact"
            class="attr"
          >
            <template v-slot:prepend>Body:</template>
          </v-text-field>
        </v-col>
        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-text-field
            type="number"
            min="0"
            v-model.number="attrRef.spd"
            density="compact"
            class="attr"
          >
            <template v-slot:prepend>Speed:</template>
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            type="number"
            min="0"
            v-model.number="attrRef.emp"
            density="compact"
            class="attr"
          >
            <template v-slot:prepend>Empathy:</template>
          </v-text-field>
        </v-col>
        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-text-field
            type="number"
            min="0"
            v-model.number="attrRef.cra"
            density="compact"
            class="attr"
          >
            <template v-slot:prepend>Craft:</template>
          </v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            type="number"
            min="0"
            v-model.number="attrRef.will"
            density="compact"
            class="attr"
          >
            <template v-slot:prepend>Willpower:</template>
          </v-text-field>
        </v-col>
        <v-responsive width="100%"></v-responsive>

        <v-col>
          <v-text-field
            type="number"
            min="0"
            v-model.number="attrRef.luck"
            density="compact"
            class="attr"
          >
            <template v-slot:prepend>Luck:</template>
          </v-text-field>
        </v-col>
      </v-row>
      <div class="d-flex align-start flex-column create-button-container">
        <v-btn :disabled="isFilled" @click="createCharacter">Create</v-btn>
        <a v-if="isError" class="error">Somethings Wrong</a>
      </div>
    </v-container>
  </v-card>
</template>
<style>
.error {
  color: red;
}
.attr-board {
  width: 60%;
  margin: 50px;
}
.divider {
  margin: 20px;
}
.attr {
  width: 170px;
}
.create-button-container {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 16px;
}
</style>
