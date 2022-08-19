<template>
  <AppLayout v-if="loaded" :config="config">

    <div class="container">

      <h2>Edit group</h2>

      <div class="form-wrapper">

        <o-field label="New group title">
          <o-input v-model="valueMutable.title" required />
        </o-field>

        <IconSelector v-model="valueMutable.icon" label="Group icon" />

        <div class="form-actions">
          <o-button @click.prevent="save">Save link</o-button>
        </div>

      </div>

    </div>

  </AppLayout>
</template>

<script>
import { findIndex, find } from "lodash";
import AppLayout from "../../../components/layouts/AppLayout";
import IconSelector from "../../../components/IconSelector";
import config from "../../../mixins/config";

export default {
  name: 'EditGroup',
  components: {
    IconSelector,
    AppLayout
  },
  mixins: [config],
  data() {
    return {
      editId: false,
      valueMutable: {
        title: '',
        icon: '',
      },
      newGroupId: '__NEW_ID__',
      page: this.$route.params.slug || 'default'
    }
  },
  watch: {
    loaded(val) {
      if (!val) return
      this.loadExisting()
    }
  },
  methods: {
    loadExisting() {
      if (this.loaded && this.$route.query.id) {
        this.editId = this.$route.query.id
        this.valueMutable = find(this.config.pages[this.page].items, {id: this.editId})
      }
    },
    save() {
      const groupIdx = this.groupIndex(this.editId)
      this.config.pages[this.page][groupIdx] = this.valueMutable

      this.saveAndBack(this.page)
    },
    groupIndex(groupId) {
      return findIndex(this.config.pages[this.page], {id: groupId})
    },
  },
}
</script>
