<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";
import { mdiAccount, mdiSwordCross, mdiCampfire, mdiLogout } from "@mdi/js";

const isOpen = ref<boolean>(false);

function logOutSend() {
  localStorage.setItem("cookie", "");

  router.push("/");
}

function update() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        expand-on-hover
        rail
        width="200"
        class="gray"
        theme="dark"
        permanent
        @update:rail="update"
      >
        <v-list color="transparent">
          <v-list-item>
            <v-icon v-show="!isOpen" :icon="mdiAccount"></v-icon>
            <v-btn
              block
              v-show="isOpen"
              @click="
                () => {
                  router.push({ name: 'account' });
                }
              "
              ><v-icon :icon="mdiAccount"></v-icon> Account
            </v-btn>
          </v-list-item>

          <v-list-item>
            <v-icon v-show="!isOpen" :icon="mdiSwordCross"></v-icon>
            <v-btn
              block
              v-show="isOpen"
              @click="
                () => {
                  router.push({ name: 'characters' });
                }
              "
            >
              <v-icon :icon="mdiSwordCross"></v-icon> Characters
            </v-btn>
          </v-list-item>

          <v-list-item>
            <v-icon v-show="!isOpen" :icon="mdiCampfire"></v-icon>
            <v-btn
              block
              v-show="isOpen"
              @click="
                () => {
                  router.push({ name: 'campaigns' });
                }
              "
              ><v-icon :icon="mdiCampfire"></v-icon> Campaigns
            </v-btn>
          </v-list-item>
        </v-list>

        <template v-slot:append>
          <div class="pa-2">
            <v-icon v-show="!isOpen" :icon="mdiLogout"></v-icon>
            <v-btn @click="logOutSend" block v-show="isOpen"
              ><v-icon :icon="mdiLogout"></v-icon> Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-main class="main d-flex align-content-start flex-wrap">
        <RouterView name="inside"> </RouterView>
      </v-main>
    </v-layout>
  </v-card>
</template>
<style>
.main {
  background-color: black;
}
</style>
