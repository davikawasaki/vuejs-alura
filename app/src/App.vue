<template>
  <section class="body">
    <apic-menu :routes="routes" />
    <transition name="page">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>

import { routes } from './routes';
import Menu from './components/shared/menu/Menu.vue';

export default {

  /**
   * Associated components within App page
   * @type Object
   */
  components: {
      'apic-menu': Menu
  },

  /**
   * Binded variables
   */
  data() {
    return {
      routes: routes.filter(route => route.menu)
    }
  }

}

</script>

<style lang="sass" scoped>
  @import './App.scss';
</style>
