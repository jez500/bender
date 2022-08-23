<template>
  <AppLayout v-if="loaded" :config="config">
    <div>
      <h2>Import from Homer YAML</h2>
      <o-field label="Paste YAML here">
        <o-input v-model="yaml" type="textarea" />
      </o-field>
      <div class="form-actions">
        <o-button @click.prevent="convert">Parse</o-button>
      </div>

      <div v-if="mapped.title" style="margin-top: 2rem">
        <h3>{{ linkCount }} links in {{ groupCount }} groups found</h3>
        <br />
        <o-field label="Import to this page">
          <o-select v-model="page" expanded>
            <option v-for="option in pages" :key="option.value" :value="option.value" v-text="option.label" />
          </o-select>
        </o-field>
        <p>
          NOTE: Importing will replace all links on this page. It is advised you
          backup config.json before proceeding. Any images should be copied to
          static/images.
        </p>
        <div class="form-actions">
          <o-button @click.prevent="save">Import links</o-button>
        </div>

      </div>
    </div>
  </AppLayout>
</template>

<script>
import { cloneDeep, get } from "lodash"
import AppLayout from "../components/layouts/AppLayout";
import config from "../mixins/config";
const yaml = require('js-yaml');

export default {
  name: "ImportYaml",
  components: {AppLayout},
  mixins: [config],
  data() {
    return {
      page: this.$route.query.page || 'default',
      yaml: '',
      parsed: {},
      mapped: {},
      linkCount: 0,
      groupCount: 0,
    }
  },
  computed: {
    pages() {
      return Object.values(this.config.pages).map(page => ({value: page.slug, label: page.title}))
    }
  },
  methods: {
    convert() {
      try {
        this.parsed = yaml.load(this.yaml)
        this.mapConfig()
      } catch (e) {
        alert('Failed to parse YAML, possibly invalid')
      }
    },
    getVal(key, fallback = null) {
      return get(this.parsed, key)
    },
    mapConfig() {
      this.mapped = cloneDeep(this.config)
      this.linkCount = 0
      this.groupCount = 0

      const groups = [];
      this.getVal('services', []).forEach((group, groupIdx) => {
        const newGroup = {
          id: `group_${groupIdx}_${Date.now()}`,
          title: get(group, 'name'),
          icon: get(group, 'icon'),
          items: [],
        }
        this.groupCount++;

        get(group, 'items', []).forEach((item, itemIdx) => {
          newGroup.items.push({
            id: `link_${itemIdx}_${Date.now()}`,
            title: get(item, 'name', ''),
            subTitle: get(item, 'subtitle', ''),
            image: get(item, 'logo', '').split('/').at(-1),
            icon: get(item, 'icon', ''),
            href: get(item, 'url', ''),
          })
          this.linkCount++
        })

        groups.push(newGroup)
      })

      this.mapped.pages[this.page].items = groups
    },
    save() {
      this.config = cloneDeep(this.mapped)
      this.saveAndBack(this.page)
    }
  }
}
</script>
