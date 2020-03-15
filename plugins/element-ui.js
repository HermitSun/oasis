import Vue from 'vue';
import { Loading, Message, Pagination, Popover } from 'element-ui';

Vue.use(Loading.directive);
Vue.use(Pagination);
Vue.use(Popover);

Vue.prototype.$message = Message;
