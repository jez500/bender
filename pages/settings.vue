<template>
  <AppLayout v-if="loaded" :key="settingsKey" :config="config">
    <div class="container">
      <h2>Settings</h2>

      <div class="form-wrapper">

        <o-field label="Title prefix">
          <o-input v-model="config.titlePrefix"></o-input>
        </o-field>

        <o-field label="Title">
          <o-input v-model="config.title"></o-input>
        </o-field>

        <IconSelector v-model="config.titleIcon" label="Title icon" />

        <o-field label="Theme">
          <o-select v-model="config.theme" required expanded>
            <option v-for="theme in themes" :key="theme.value" :value="theme.value" v-text="theme.label" />
          </o-select>
        </o-field>


        <div class="field">
          <o-checkbox v-model="config.disableEdit">Disable edit mode, hiding edit buttons and preventing drag and drop</o-checkbox>
        </div>

        <div class="form-actions">
          <o-button @click.prevent="save">Save changes</o-button>
        </div>

      </div>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "../components/layouts/AppLayout";
import config from "../mixins/config";
import IconSelector from "../components/IconSelector";

export default {
  name: 'IndexPage',
  components: {
    IconSelector,
    AppLayout
  },
  mixins: [config],
  data() {
    return {
      settingsKey: null,
      themes: [
        {value: 'auto', label: 'Auto'},
        {value: 'light', label: 'Light'},
        {value: 'dark', label: 'Dark'},
      ]
    }
  },
  methods: {
    save() {
      this.saveConfig(this.config);
      this.settingsKey = Date.now();
      this.$router.push('/');
    }
  }
}
</script>
