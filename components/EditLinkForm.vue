<template>
    <div :key="loaded" class="container edit-link-form">

      <h2 v-text="title" />

      <div class="form-wrapper">

        <o-field v-if="groups.length > 0" label="Group">
          <o-select v-model="valueMutable.group" required expanded>
            <option v-for="group in groups" :key="group.id" :value="group.id" v-text="group.title" />
            <option :value="newGroupId">Add new group</option>
          </o-select>
        </o-field>

        <template v-if="valueMutable.group === newGroupId">
          <o-field label="New group title">
            <o-input v-model="valueMutable.newGroup" required />
          </o-field>
          <IconSelector v-model="valueMutable.newGroupIcon" label="New group icon" />
        </template>

        <o-field label="Title">
          <o-input v-model="valueMutable.title" required />
        </o-field>

        <o-field label="Sub title">
          <o-input v-model="valueMutable.subTitle" />
        </o-field>

        <o-field label="Url">
          <o-input v-model="valueMutable.href" required />
        </o-field>

        <div class="field">
          <o-checkbox v-model="valueMutable.newWindow">Open in a new window</o-checkbox>
        </div>

        <o-tabs v-if="iconType" v-model="iconType">

          <o-tab-item value="icon" label="Icon">

            <IconSelector v-model="valueMutable.icon" label="Icon" />

            <div class="field">
              <o-checkbox v-model="valueMutable.overrideIconColor">Override icon colour</o-checkbox>
            </div>

            <o-field v-if="valueMutable.overrideIconColor" label="Icon colour">
              <o-input v-model="valueMutable.iconColor" type="color" />
            </o-field>

          </o-tab-item>

          <o-tab-item value="image" label="Image">

            <ImageSelector v-model="valueMutable.image" label="Image" message="If an image is set it will use this instead of an icon" />

          </o-tab-item>

        </o-tabs>

        <div class="form-actions">
          <o-button @click.prevent="save">Save link</o-button>
          <o-button v-if="editId" variant="danger" @click.prevent="deleteLink">Delete link</o-button>
        </div>

      </div>

    </div>
</template>

<script>
import { map, pick, findIndex, find, zipObject } from "lodash";
import IconSelector from "../components/IconSelector";
import config from "../mixins/config";
import ImageSelector from "./ImageSelector";

export default {
  name: 'EditLinkForm',
  components: {
    ImageSelector,
    IconSelector
  },
  mixins: [config],
  props: {
    page: {
      type: String,
      default: 'default',
    },
  },
  data() {
    return {
      editId: false,
      valueMutable: {
        group: '',
        newGroup: '',
        newGroupIcon: '',
        title: '',
        href: '',
        icon: '',
        image: '',
        newWindow: false,
        overrideIconColor: false,
        iconColor: ''
      },
      newGroupId: '__NEW_ID__',
      iconType: '',
      linkProps: ['title', 'href', 'icon', 'iconColor', 'subTitle', 'image', 'newWindow'],
    }
  },
  computed: {
    groups() {
      return map(this.config.pages[this.page].items, group => ({id: group.id, title: group.title}))
    },
    title() {
      return this.editId ? 'Edit link' : 'Add new link';
    },
  },
  mounted() {
    // Load from url query.
    if (this.$route.query.id) {
      this.editId = zipObject(['group', 'link'], this.$route.query.id.split('-'))
      const group = find(this.config.pages[this.page].items, {id: this.editId.group})
      const link = find(group.items, {id: this.editId.link})

      this.valueMutable = {
        ...this.valueMutable,
        ...link,
        group: this.editId.group,
        overrideIconColor: !! link.iconColor,
      }

      this.iconType = this.valueMutable.image ? 'image' : 'icon'
    }
    // If no groups, default to new group.
    if (this.loaded && this.groups.length === 0) {
      this.valueMutable.group = this.newGroupId
    }
    // Default icon type.
    if (! this.iconType) {
      this.iconType = 'icon'
    }
  },
  methods: {
    save() {
      if (! this.validate()) return alert('Group, title and link url are required');

      const newLink = pick(this.valueMutable, this.linkProps)
      newLink.id = this.editId ? this.editId.link : `link_${Date.now()}`;
      let groupId = this.valueMutable.group;

      if (! this.valueMutable.overrideIconColor) {
        newLink.iconColor = ''
      }

      // Create a new group if required.
      if (groupId === this.newGroupId) {
        groupId = `group_${Date.now()}`
        this.config.pages[this.page].items.push({
          title: this.valueMutable.newGroup,
          icon: this.valueMutable.newGroupIcon,
          id: groupId,
          items: [],
        })
      }

      // Either update or add a new link.
      const groupIdx = this.groupIndex(groupId)
      if (this.editId) {
        const linkIdx = this.linkIndex(groupId, this.editId.link)
        this.config.pages[this.page].items[groupIdx].items.splice(linkIdx, 1, newLink)
      } else {
        this.config.pages[this.page].items[groupIdx].items.push(newLink)
      }

      this.saveAndBack(this.page)
    },
    deleteLink() {
      if (this.editId) {
        const groupIdx = this.groupIndex(this.editId.group)
        const linkIdx = this.linkIndex(this.editId.group, this.editId.link)
        this.config.pages[this.page].items[groupIdx].items.splice(linkIdx, 1)
        return this.saveAndBack(this.page)
      }
      alert('Not editing a link')
    },
    groupIndex(groupId) {
      return findIndex(this.config.pages[this.page].items, {id: groupId})
    },
    linkIndex(groupId, linkId) {
      const groupIdx = this.groupIndex(groupId)
      return findIndex(this.config.pages[this.page].items[groupIdx].items, {id: linkId})
    },
    validate() {
      return !! (this.valueMutable.group && this.valueMutable.title && this.valueMutable.href)
    }
  },
}
</script>
