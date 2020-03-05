/* istanbul ignore file */
import Vue from "vue";

import {
  Aside,
  Button,
  Col,
  Container,
  Footer,
  Header,
  Icon,
  Main,
  Menu,
  MenuItem,
  Message,
  Pagination,
  Row,
  Upload
} from "element-ui";

Vue.use(Aside);
Vue.use(Button);
Vue.use(Col);
Vue.use(Container);
Vue.use(Footer);
Vue.use(Header);
Vue.use(Icon);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Pagination);
Vue.use(Row);
Vue.use(Upload);

Vue.prototype.$message = Message;
