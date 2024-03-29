/**
 * element-ui 全局引入的部分
 * 只在全局引入最常用的部分
 * @author WenSun
 * @date 2020.03.23
 */

import Vue from 'vue';
import { Button, Loading, Message, MessageBox } from 'element-ui';

Vue.use(Button);
Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
