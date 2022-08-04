<template>
  <div>
   <ul class="pagination">
    <li class="page-item" v-for="page in pages" :key="page" :class="{active: currentPage === page}">
        <router-link :to="{path: url, query : {page : page}}" class="page-link">
        {{page}}
        </router-link>
    </li>
   </ul>
  </div>
</template>

<script>
import {range} from '@/helpers/utils'
export default {
  name: "PaginationPage",
  props: {
    total: {
      type: Number,
      required: true,
    },
    limit: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  computed : {
    pages(){
        const pagesCount = Math.ceil(this.total / this.limit)
        return range(1, pagesCount)
    },
  },

};
</script>

<style>
</style>