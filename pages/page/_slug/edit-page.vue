<template>
  <AppLayout v-if="loaded" :config="config">
    <EditPageForm v-if="loaded" :loaded-config="config" />
  </AppLayout>
</template>

<script>
import AppLayout from "../../../components/layouts/AppLayout";
import config from "../../../mixins/config";
import EditPageForm from "../../../components/EditPageForm";

export default {
  name: 'AddPage',
  components: {
    EditPageForm,
    AppLayout
  },
  mixins: [config],
}
</script>
