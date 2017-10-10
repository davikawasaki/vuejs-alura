import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';

import { routes } from './routes';
import App from './App.vue';

import './directives/TransformGlobal';

import veemsg from './vee-validate-pt-br';

Vue.use(VueResource);
Vue.http.options.root = 'http://localhost:3000';

Vue.use(VueRouter);

const router = new VueRouter({
  // Same as routes : routes, since ES6 accepts attribution if the value name is the same as the attr name
  routes,
  mode: 'history'
});

Vue.use(VeeValidate, {
  locale: 'pt_BR',
  dictionary: {
    pt_BR: {
      messages: veemsg.messages,
      attributes: veemsg.attributes
    }
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
