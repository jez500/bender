<template>
  <div class="app-layout">

    <div v-if="config.title">

      <div class="app-header">

        <div class="app-brand">
          <div class="container island">
            <NuxtLink to="/" class="app-brand__inner">
              <div class="app-brand__icon">
                <FontAwesomeIcon :icon="config.titleIcon" size="3x" />
              </div>
              <div class="app-brand__title">
                <span v-if="config.titlePrefix">{{ config.titlePrefix }}</span>
                <h1>{{ config.title }}</h1>
              </div>
            </NuxtLink>
          </div>
        </div>

        <div class="app-nav" :class="{'menu-open': menuOpen}">
          <nav class="container island">
            <div class="app-nav__inner">
              <ul class="app-nav__menu">
                <li v-for="link in appLinks" :key="link.label">
                  <NuxtLink :to="link.href" :class="{'active' : isActive(link.slug)}">
                    <FontAwesomeIcon v-if="link.icon" :icon="link.icon" />
                    {{ link.label }}
                  </NuxtLink>
                </li>
              </ul>
              <ul class="app-nav__actions">

                <li class="app-nav__mobile-menu">
                  <button @click.prevent="menuOpen = !menuOpen">
                    <FontAwesomeIcon icon="fas fa-bars" />
                  </button>
                </li>

                <li v-if="onPage && mutable">
                  <NuxtLink :to="`/page/${page}/edit-page`">
                    <o-tooltip label="Edit this page">
                      <FontAwesomeIcon icon="fas fa-pen" />
                    </o-tooltip>
                  </NuxtLink>
                </li>

                <li v-if="mutable">
                  <o-dropdown aria-role="list">
                    <template slot="trigger">
                      <o-tooltip label="Add link or page">
                        <button>
                          <FontAwesomeIcon icon="plus" />
                        </button>
                      </o-tooltip>
                    </template>

                    <o-dropdown-item aria-role="listitem">
                      <NuxtLink :to="`/page/${page}/add-link`">Add link</NuxtLink>
                    </o-dropdown-item>
                    <o-dropdown-item aria-role="listitem">
                      <NuxtLink to="/add-page">Add page</NuxtLink>
                    </o-dropdown-item>
                  </o-dropdown>
                </li>

                <li>
                  <NuxtLink to="/settings">
                    <o-tooltip label="Settings">
                      <FontAwesomeIcon icon="fas fa-gear" />
                    </o-tooltip>
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>

      </div>

      <div class="container island">
        <slot />
      </div>

    </div>

    <div v-else class="app-loading">
      <p>Loading...</p>
    </div>

  </div>
</template>

<script>
import { map, orderBy } from "lodash";

export default {
  name: "AppLayout",
  props: {
    config: {
      type: Object,
      default: () => ({
        title: '',
        subTitle: '',
        theme: 'auto',
        disableEdit: false,
      })
    }
  },
  data() {
    return {
      menuOpen: false,
      page: this.$route.params.slug || 'default',
      onPage: !! this.$route.params.slug || this.$route.fullPath === '/',
      appLinks: [],
      actionLinks: [
        {href: '/add', label: 'Add link', icon: 'fas fa-plus'},
        {href: '/settings', label: 'Settings', icon: 'fas fa-gear'},
      ]
    }
  },
  computed: {
    mutable() {
      return ! this.config.disableEdit
    },
  },
  mounted() {
    this.appLinks = map(orderBy(this.config.pages, 'order'), (item) => (
      {href: (item.slug === 'default' ? '/' : `/page/${item.slug}`), label: item.title, icon: item.icon, slug: item.slug}
    ))
    document.body.className = '';
    document.body.classList.add(`theme--${this.config.theme}`);
  },
  methods: {
    isActive(slug) {
      return this.onPage && this.page === slug
    }
  }
}
</script>
