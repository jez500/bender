<template>
  <AppLayout v-if="loaded" :config="config">

    <div v-if="config.pages" class="container">

      <LinkList v-if="pageLinks.length > 0" :value="pageLinks" :config="config" @input="updated"></LinkList>

      <EmptyPage v-else />

    </div>

  </AppLayout>
</template>

<script>
import page from "../mixins/page";

export default {
  name: 'IndexPage',
  mixins: [page],
}
</script>
