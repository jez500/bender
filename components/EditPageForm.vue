<template>
  <div>
    <h2>Add page</h2>
    <p class="title-lead">Add a new page of links</p>

    <o-field label="Page title">
      <o-input v-model="valueMutable.title" required />
    </o-field>

    <o-field v-if="! isDefaultPage" label="Page slug" message="Used for the new page url. Only use letters, numbers and hyphens.">
      <o-input v-model="valueMutable.slug" pattern="^[a-z](-?[a-z])*$" required />
    </o-field>

    <o-field v-if="! isDefaultPage" label="Menu order" message="Position in the menu">
      <o-input v-model="valueMutable.order" type="number" required />
    </o-field>

    <IconSelector v-model="valueMutable.icon" label="Link icon" />

    <div class="form-actions">
      <o-button @click.prevent="save">Save page</o-button>
      <o-button v-if="page && page !== 'default'" variant="danger" @click.prevent="deletePage">Delete page</o-button>
    </div>

  </div>
</template>

<script>
import { pick } from "lodash"
import config from "../mixins/config";
import IconSelector from "./IconSelector";

export default {
  name: "EditPageForm",
  components: {IconSelector},
  mixins: [config],
  data() {
    return {
      page: this.$route.params.slug || '',
      valueMutable: {
        title: '',
        slug: '',
        icon: '',
        order: 1
      },
    }
  },
  computed: {
    isDefaultPage() {
      return this.page && this.page === 'default'
    }
  },
  mounted() {
    if (this.page) {
      this.valueMutable = this.config.pages[this.page]
    } else {
      this.valueMutable.order = Object.keys(this.config.pages).length + 1
    }
  },
  methods: {
    save() {
      if (! this.valueMutable.slug || ! this.valueMutable.title) return alert('Title and slug are required')

      if (! this.page) {
        this.setPageData()
      } else {
        // Get existing items and remove page incase slug changed.
        const items = this.config.pages[this.page].items || []
        // Rename key as slug might have changed.
        delete Object.assign(this.config.pages, {[this.valueMutable.slug]: this.config.pages[this.page] })[this.page];
        this.setPageData(items)
      }

      this.saveAndBack(this.valueMutable.slug)
    },
    deletePage() {
      if (confirm('Delete this page and all the links on it?')) {
        delete(this.config.pages[this.page]);
        this.saveAndBack(`default`)
      }
    },
    setPageData(linkItems = []) {
      this.config.pages[this.valueMutable.slug] = {
        ...pick(this.valueMutable, ['title', 'slug', 'icon', 'order']),
        items: linkItems
      };
    }
  }
}
</script>
