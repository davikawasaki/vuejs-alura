import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import { routes } from './routes';
import App from './App.vue';

import './directives/TransformGlobal';

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';

Vue.use(VueRouter);

const router = new VueRouter({
  // Same as routes : routes, since ES6 accepts attribution if the value name is the same as the attr name
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
