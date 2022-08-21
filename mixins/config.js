import axios from "axios";
import {CONFIG_FILEPATH, CONFIG_GET_PATH} from "../api/config";

export default {
  props: {
    loadedConfig: {
      type: [Object, Boolean],
      default: false,
    }
  },
  data() {
    return {
      config: {},
      loaded: false,
    }
  },
  created() {
    if (this.loadedConfig !== false) {
      this.config = this.loadedConfig
      this.loaded = true
    } else {
      this.getConfig();
    }
  },
  methods: {
    async getConfig() {
      const res = await axios.get(CONFIG_GET_PATH)
      try {
        this.config = res.data
        this.loaded = true
      } catch (error) {
        /* eslint-disable */
        console.error('Error getting config, ensure ' + CONFIG_FILEPATH + ' exists and is valid JSON')
      }
    },
    saveConfig(config) {
      return axios.post('/save', config)
        .then(data =>
          this.$oruga.notification.open({
            message: 'Saved changes',
            rootClass: 'toast-notification',
            position: 'bottom-right',
          })
        )
        .catch(err => {
            console.error(err);
            this.$oruga.notification.open({
              message: 'Failed to save changes',
              rootClass: 'toast-notification',
              position: 'bottom-right',
              variant: 'danger',
            })
        })
    },
    saveAndBack(page) {
      const path = page === 'default' ? '/' : `/page/${page}`
      this.saveConfig(this.config)
        .then(() => this.$router.push(path))
    },
  }
}
