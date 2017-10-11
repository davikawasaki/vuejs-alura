/***************************************************/
/***************** DEPENDENCIES ********************/
/***************************************************/

// Vue dependencies
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';

// App modules
import { routes } from './routes';
import App from './App.vue';

// App global directives
import './directives/TransformGlobal';

// App non-proprietary javascript files
import veemsg from './vee-validate-pt-br';
import 'bootstrap/dist/js/bootstrap.js';

// App non-proprietary CSS style files
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/style.css';

/***************************************************/
/*************** SETUP & CONFIG ********************/
/***************************************************/

// Vue-resource config to vue global view object
Vue.use(VueResource);
Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';

// Intercepting XHR requests/responses before components with interceptors
Vue.http.interceptors.push((req, next) => {
  // Setting headers attribute before request - Simulation of token authorization request
  req.headers.set('Authorization', 'Bearer XoekDOKeodkXE41XE15');
  console.log('Setting auth token before request');

  // Getting response from request before redirecting to the layer which made the request
  next(res => {
    console.log('Getting response before components manipulations');
  });
});

// Vue-router config to vue global view-object
Vue.use(VueRouter);
const router = new VueRouter({
  // Same as routes : routes, since ES6 accepts attribution if the value name is the same as the attr name
  routes,
  mode: 'history'
});

// Vee-validate config to vue global view-object
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
