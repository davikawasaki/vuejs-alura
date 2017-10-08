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
      routes
    }
  }

}

</script>

<style lang="scss">
  .body {
    font-family: Helvetica, sans-serif;
    width: 96%;
    margin: 0 auto;
  }

  .page-enter, .page-leave-active {
    opacity: 0;
  }

  .page-enter-active, .page-leave-active {
    transition: opacity .4s;
  }
</style>
