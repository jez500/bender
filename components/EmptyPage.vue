<template>
  <div class="app-empty-page">
    <h2>It looks a bit empty here</h2>
    <p class="app-empty-page__lead">Add a link to start building your dashboard</p>
    <div>
      <o-button tag="NuxtLink" :to="`/page/${page}/add-link`">Add your first link</o-button>
    </div>
    <p class="app-empty-page__sub">or <NuxtLink :to="`/import?page=${page}`">import Homer YAML</NuxtLink></p>
  </div>
</template>

<script>
export default {
  name: "EmptyPage",
  props: {
    page: {
      type: String,
      default: 'default',
    },
  },
}
</script>
