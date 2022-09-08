<template>
  <AppLayout v-if="loaded" :config="config">

    <div v-if="config.pages" class="container">

      <LinkList v-if="pageLinks.length > 0" :value="pageLinks" :page="page" :config="config" @input="updated"></LinkList>

      <EmptyPage v-else :page="page" />

    </div>

  </AppLayout>
</template>

<script>
import page from "../../../mixins/page";

export default {
  name: 'SubPage',
  mixins: [page],
  data() {
    return {
      page: this.$route.params.slug,
    }
  },
}
</script>
