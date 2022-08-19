<template>
  <div class="app-empty-page">
    <h2>It looks a bit empty here</h2>
    <p>Add a link to start building your dashboard</p>
    <div>
      <o-button tag="NuxtLink" :to="`/page/${page}/add-link`">Add your first link</o-button>
    </div>
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
