<template>
  <div>
    <ArticleForm
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ArticleForm from '../components/ArticleForm.vue'
import { actionTypes } from '@/store/modules/createArticle';
export default {
  name: "CreateArticle",
  components : {
    ArticleForm
  },    
  data() {
    return {
      initialValues: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    };
  },
  methods : {
    onSubmit(articleInput){
        this.$store.dispatch(actionTypes.createArticle, {articleInput}).then(article => {
            this.$router.push({name : 'article', params : {slug : article.slug}})
        })
    }
  },
  computed : {
    ...mapState({
        isSubmitting : state => state.createArticle.isSubmitting,
        validationErrors : state => state.createArticle.validationErrors
    })
  }
};
</script>

<style>
</style>