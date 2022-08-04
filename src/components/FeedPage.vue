<template>
  <div>
    <LoadingPage v-if="isLoading" />
    <ErrorMessage v-if="error" />

    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, index) in feed.articles"
        :key="index"
      >
        <div class="article-met">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" alt="" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <div class="pull-xs-right">
            <AddFavorites
              :is-favorited="article.favorited"
              :article-slug="article.slug"
              :favorites-count="article.favoritesCount"
            />
          </div>
        </div>
        <router-link
          class="preview-link"
          :to="{ name: 'article', params: { slug: article.slug } }"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          <TagList :tags="article.tagList" />
        </router-link>
      </div>
      <pagination-page
        :total="feed.articlesCount"
        :limit="limit"
        :url="baseUrl"
        :current-page="currentPage"
      ></pagination-page>
    </div>
  </div>
</template>

<script>
import { stringify, parseUrl } from "query-string";
import { mapState } from "vuex";
import { actionTypes } from "@/store/modules/feed";
import PaginationPage from "@/components/PaginationPage";
import LoadingPage from "@/components/LoadingPage";
import ErrorMessage from "@/components/ErrorMessage";
import AddFavorites from "@/components/AddFavorites";
import TagList from "@/components/TagList";
import { limit } from "@/helpers/vars";
export default {
  name: "FeedPage",
  components: {
    PaginationPage,
    LoadingPage,
    ErrorMessage,
    TagList,
    AddFavorites,
  },
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.feed.isLoading,
      feed: (state) => state.feed.data,
      error: (state) => state.feed.error,
    }),
    limit() {
      return limit;
    },
    baseUrl() {
      return this.$route.path;
    },
    currentPage() {
      return Number(this.$route.query.page || 1);
    },
    offset() {
      return this.currentPage * limit - limit;
    },
  },
  mounted() {
    this.fetchFeed();
  },
  watch: {
    currentPage() {
      console.log("CurrentPage changes");
      this.fetchFeed();
    },
    apiUrl(){
      this.fetchFeed()
    },
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parseUrl.query,
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.$store.dispatch(actionTypes.getFeed, { apiUrl: apiUrlWithParams });
    },
  },
};
</script>

<style>
</style>