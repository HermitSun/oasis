import Vue from 'vue';
import {
  Aside,
  Button,
  Container,
  Footer,
  Header,
  Loading,
  Main,
  Menu,
  MenuItem,
  Message,
  Pagination,
  Popover,
  Upload
} from 'element-ui';

Vue.use(Aside);
Vue.use(Button);
Vue.use(Container);
Vue.use(Footer);
Vue.use(Header);
Vue.use(Loading.directive);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Pagination);
Vue.use(Popover);
Vue.use(Upload);

Vue.prototype.$message = Message;
