<template>
  <div class="link-list">
    <component
      :is="draggableWrapper"
      id="first"
      data-source="juju"
      :list="valueMutable"
      draggable=".link-list-group"
      handle=".link-list-group__header"
      group="a"
      class="list-page"
      :class="{'list-empty': valueMutable.length === 0}"
      @end="updated"
    >
      <div v-for="group in valueMutable" :key="group.id" class="link-list-group">
        <div class="link-list-group__header">
          <FontAwesomeIcon v-if="group.icon" :icon="group.icon" />
          <h3 v-text="group.title" />
          <NuxtLink v-if="mutable" :to="`/page/${page}/edit-group?id=${group.id}`" class="link-list-group__edit">
            <FontAwesomeIcon icon="fas fa-pen" />
          </NuxtLink>
        </div>

        <component
          :is="draggableWrapper"
          id="first"
          data-source="juju"
          :list="group.items"
          draggable=".item"
          group="b"
          class="list-group"
          :class="{'list-empty': group.items.length === 0}"
          @end="updated"
        >
          <div
            v-for="element in group.items"
            :key="element.id"
            class="list-group-item item"
          >
            <LinkListItem :item="element" :group="group.id" :config="config" />
          </div>

        </component>

        <div v-if="group.items.length === 0 && mutable" class="list-group__actions">
            <span class="list-group__delete" @click="deleteGroup(group.id)">
              <o-tooltip label="Delete group">
                <FontAwesomeIcon icon="fas fa-trash" />
              </o-tooltip>
            </span>
        </div>

      </div>
    </component>

  </div>
</template>

<script>
import { findIndex } from "lodash";
import draggable from "vuedraggable";
import LinkListItem from "./LinkListItem";

export default {
  name: "LinkList",
  components: {
    LinkListItem,
    draggable
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    config: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      valueMutable: this.value,
      page: this.$route.params.slug || 'default'
    }
  },
  computed: {
    mutable() {
      return ! this.config.disableEdit
    },
    draggableWrapper() {
      return this.mutable ? 'draggable' : 'div'
    }
  },
  methods: {
    updated() {
      this.$emit('input', this.valueMutable)
    },
    deleteGroup(groupId) {
      const groupIdx = findIndex(this.valueMutable, {id: groupId})
      this.valueMutable.splice(groupIdx, 1)
      this.updated()
    }
  }

}
</script>
