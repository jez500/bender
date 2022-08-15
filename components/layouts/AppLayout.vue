<template>
  <div class="app-layout">
    <div class="app-header">
      <div class="app-brand">
        <div class="container island">
          <h1>Bender</h1>
          <o-button @click.prevent="saveChanges">Save changes</o-button>
        </div>

      </div>
      <div class="app-nav">
        <nav class="container island">
          <ul>
            <li>Home</li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="container island">
      <slot />
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "AppLayout",
  methods: {
    saveChanges() {
      axios.post('/save', {foo: 'bar'})
    }
  }
}
</script>
