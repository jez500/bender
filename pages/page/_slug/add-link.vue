<template>
  <AppLayout v-if="loaded" :config="config">
    <EditLinkForm :loaded-config="config" :page="page" />
  </AppLayout>
</template>

<script>
import AppLayout from "../../../components/layouts/AppLayout";
import config from "../../../mixins/config";
import EditLinkForm from "../../../components/EditLinkForm";

export default {
  name: 'AddLink',
  components: {
    EditLinkForm,
    AppLayout
  },
  mixins: [config],
  data() {
    return {
      page: this.$route.params.slug || 'default'
    }
  }
}
</script>
