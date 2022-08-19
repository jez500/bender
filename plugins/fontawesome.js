import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import Oruga from '@oruga-ui/oruga'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(fas)
library.add(fab)

// Register the component globally
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

// Register in oruga.
Vue.use(Oruga, {
  iconComponent: 'FontAwesomeIcon',
  iconPack: 'fa'
})
