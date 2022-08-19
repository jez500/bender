<template>
  <o-field :label="label" :message="message" class="image-selector">
    <o-autocomplete
      v-model="valueMutable"
      :data="data"
      placeholder="filename"
      field="file"
      :loading="isFetching"
      icon="magnifying-glass"
      icon-pack="fas"
      check-infinite-scroll
      :debounce-typing="500"
      clearable
      @typing="getAsyncData"
      @select="optionSelected"
    >
      <template slot-scope="props">
        <div class="icon-selector__option">
            {{ props.option.file }}
        </div>
      </template>

    </o-autocomplete>
  </o-field>
</template>

<script>
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
    }
  },
  mounted() {
    this.valueMutable = this.value
  },
  methods: {
    optionSelected(option) {
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
