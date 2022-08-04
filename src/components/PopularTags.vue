<template>
  <div>
    <LoadingPage v-if="isLoading"></LoadingPage>
    <ErrorMessage v-if="error" />

    <div class="sidebar" v-if="popularTags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
          v-for="popularTag in popularTags"
          :key="popularTag"
          :to="{ name: 'tag', params: { slug: popularTag } }"
          class="tag-default tag-pill"
        >
        {{popularTag}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/popularTags";
import LoadingPage from "@/components/LoadingPage";
import ErrorMessage from "@/components/ErrorMessage";
export default {
  name: "PopularTags",
  components : {
    LoadingPage,
    ErrorMessage
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.popularTags.isLoading,
      popularTags: (state) => state.popularTags.data,
      error: (state) => state.popularTags.error,
    }),
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags);
  },
};
</script>

<style>
</style>