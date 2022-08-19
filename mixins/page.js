import AppLayout from "../components/layouts/AppLayout";
import LinkList from "../components/LinkList";
import EmptyPage from "../components/EmptyPage";
import config from "./config";

export default {
  components: {
    EmptyPage,
    LinkList,
    AppLayout
  },
  mixins: [config],
  data() {
    return {
      page: 'default',
    }
  },
  computed: {
    pageLinks() {
      return this.config?.pages[this.page].items || [];
    }
  },
  methods: {
    updated(items) {
      this.config.pages[this.page].items = items;
      this.saveConfig(this.config);
    }
  }
}
