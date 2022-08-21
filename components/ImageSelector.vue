<template>
  <o-field :label="label" :message="message" class="image-selector">
    <div class="image-selector__image">
      <img v-if="image" :src="`/images/${image}`" />
    </div>
    <o-autocomplete
      v-model="valueMutable"
      :data="data"
      placeholder="filename"
      field="file"
      :loading="isFetching"
      :icon="icon"
      icon-pack="fas"
      check-infinite-scroll
      :debounce-typing="500"
      clearable
      expanded
      class="image-selector__field"
      @typing="getAsyncData"
      @select="optionSelected"
    >
      <template slot-scope="props">
        <div class="image-selector__option">
          <img :src="`/images/${props.option.file}`" /><span>{{ props.option.file }}</span>
        </div>
      </template>

    </o-autocomplete>
  </o-field>
</template>

<script>
const DEFAULT_ICON = 'magnifying-glass'
export default {
  name: "ImageSelector",
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'Icon'
    },
    message: {
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
      image: '',
    }
  },
  computed: {
    icon() {
      return this.image ? 'none' : DEFAULT_ICON
    }
  },
  mounted() {
    this.valueMutable = this.value
    this.image = this.valueMutable || ''
  },
  methods: {
    optionSelected(option) {
      this.image = option?.file || ''
      this.$emit('input', option?.file || '')
    },
    getAsyncData(name) {
      this.$emit('input', name)
      this.data = []
      if (! name) return
      this.isFetching = true

      fetch(`/image?search=${name}`)
        .then(response => response.json())
        .then(data => {
          data.forEach(item => this.data.push({file: item}))
        })
        .catch(error => {
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    },
  }
}
</script>
