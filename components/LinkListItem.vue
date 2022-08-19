<template>
  <div class="link-list-item">
    <a :href="item.href" class="link-list-item__link">
      <span class="link-list-item__icon" :style="iconStyle">
        <img v-if="item.image" :src="`/images/${item.image}`" />
        <FontAwesomeIcon v-else-if="icon" :icon="icon" />
      </span>
      <span class="link-list-item__content">
        <strong class="link-list-item__title">{{ item.title }}</strong>
        <span class="link-list-item__sub-title">{{ item.subTitle }}</span>
      </span>
    </a>
    <NuxtLink :to="`/page/${page}/edit-link?id=${group}-${item.id}`" class="link-list-item__edit">
      <o-tooltip label="Edit link">
        <FontAwesomeIcon icon="fas fa-pen" />
      </o-tooltip>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "LinkListItem",
  props: {
    item: {
      type: Object,
      required: true,
    },
    group: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      page: this.$route.params.slug || 'default'
    }
  },
  computed: {
    icon() {
      return this.item.icon || 'fa-solid fa-tablet-screen-button'
    },
    iconStyle() {
      return this.item.iconColor ? {color: this.item.iconColor} : {}
    }
  }
}
</script>
