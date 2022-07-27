<template>
  <div id="app">
    <TopBar />
    <router-view />
  </div>
</template>

<script>
import TopBar from "./components/TopBar.vue";
import { actionTypes } from "@/store/modules/auth";

export default {
  name: "App",
  components: {
    TopBar,
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser);
  },
};
</script>
