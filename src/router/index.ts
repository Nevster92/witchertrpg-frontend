import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import WebsocketProvider from "@/components/WebsocketProvider.vue";
import Dashboard from "@/views/Dashboard.vue";
import Characters from "@/views/Characters.vue";
import Registration from "@/views/Registration.vue";
import CharacterCreationView from "@/views/CharacterCreationView.vue";
import BasicApi from "@/components/BasicApi.vue";
import CampaignView from "@/views/CampaignView.vue";
import WsProvider from "@/components/websocket/WsProvider.vue";
import { isValideToken } from "@/api/utils";
import CharacterSheetView from "@/views/CharacterSheetView.vue";
import CampaignRoomView from "@/views/CampaignRoomView.vue";
import AccountView from "@/views/AccountView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
    },
    {
      path: "/websocket",
      name: "websocket",
      component: WebsocketProvider,
    },
    {
      path: "/basicapi",
      name: "basicapi",
      component: BasicApi,
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration,
    },

    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      beforeEnter: async (to, from, next) => {
        (await isValideToken()) ? next() : next({ name: "login" });
      },
      children: [
        {
          name: "characters",
          path: "characters",
          components: { inside: Characters },
        },
        {
          name: "account",
          path: "account",
          components: { inside: AccountView },
        },
        {
          name: "charactersheet",
          path: "charactersheet/:id",
          components: { inside: CharacterSheetView },
        },
        {
          name: "charactercreation",
          path: "charactercreation",
          components: { inside: CharacterCreationView },
        },
        {
          name: "ws",
          path: "ws/:address",
          components: { inside: WsProvider },
        },
        {
          name: "campaigns",
          path: "campaigns",
          components: { inside: CampaignView },
        },
        {
          name: "room",
          path: "room/:id",
          components: { inside: CampaignRoomView },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "login" }, // Irányítás az ismeretlen útvonalak esetén a /login útvonalra
    },
  ],
});

export default router;
