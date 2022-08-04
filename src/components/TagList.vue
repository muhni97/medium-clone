<template>
  <div>
    <ul class="tag-list">
        <li v-for="tag in tags" :key="tag" class="tag-default tag-pill tag-outline">
        {{tag}}</li>
    </ul>
  </div>
</template>

<script>
export default {
    name : 'TagList',
    props : {
        tags : {
            type: Array,
            required : true
        }
    }
}
</script>

<style>

</style>