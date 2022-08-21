<template>
  <o-field :label="label" class="icon-selector">
    <FontAwesomeIcon
      class="icon-selector__icon"
      :icon="code"
    />
    <o-autocomplete
      v-model="valueMutable"
      :data="data"
      placeholder="robot"
      field="code"
      :loading="isFetching"
      check-infinite-scroll
      :debounce-typing="500"
      class="icon-selector__field"
      clearable
      expanded
      @typing="getAsyncData"
      @select="optionSelected"
    >
      <template slot-scope="props">
        <div class="icon-selector__option">
            <FontAwesomeIcon :icon="props.option.code"></FontAwesomeIcon>
            {{ props.option.name }}
        </div>
      </template>

    </o-autocomplete>
  </o-field>
</template>

<script>
require('../plugins/fontawesome')

const DEFAULT_ICON = 'fas fa-magnifying-glass'

export default {
  name: "IconSelector",
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Icon'
    }
  },
  data() {
    return {
      valueMutable: '',
      data: [],
      selected: null,
      isFetching: false,
      name: '',
      page: 1,
      totalPages: 1,
      icon: '',
      iconPack: 'fas',
      code: DEFAULT_ICON,
    }
  },
  created() {
    this.valueMutable = this.value
  },
  mounted() {
    this.setIconFromCode(this.valueMutable)
  },
  methods: {
    optionSelected(option) {
      this.code = option?.code || ''
      this.setIconFromCode(this.code)
      this.$emit('input', this.code)
    },
    getAsyncData(name) {
      this.$emit('input', name)
      this.data = []
      if (! name) return
      this.isFetching = true

      fetch(`/icon?search=${name}`)
        .then(response => response.json())
        .then(data => {
          data.forEach(item => this.data.push(item))
        })
        .catch(error => {
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    },
    iconParts(iconCode) {
      const codeParts = iconCode.split(' ')
      return {
        prefix: codeParts[0] || 'fas',
        icon: (codeParts[1] ? codeParts[1].replace('fa-', '') : ''),
      }
    },
    setIconFromCode(iconCode) {
      const icon = iconCode || DEFAULT_ICON
      const codeParts = this.iconParts(icon)
      this.iconPack = codeParts.prefix;
      this.icon = codeParts.icon
    }
  }
}
</script>
