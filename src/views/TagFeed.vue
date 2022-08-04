<template>
  <div class="home-page">
    <BannerPage />
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <feed-toggler :tag-name="tagName"/>
          <feed-page :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <popular-tags></popular-tags>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeedPage from "@/components/FeedPage.vue";
import PopularTags from "@/components/PopularTags.vue";
import BannerPage from "@/components/BannerPage.vue";
import FeedToggler from "@/components/FeedToggler";
export default {
  name: "YourFeed",
  components: {
    FeedPage,
    PopularTags,
    BannerPage,
    FeedToggler
  },
  computed : {
    tagName(){
        return this.$route.params.slug
    },
    apiUrl(){
        return `/articles?tag=${this.tagName}`
    }
  }
 
};
</script>

<style>
</style>