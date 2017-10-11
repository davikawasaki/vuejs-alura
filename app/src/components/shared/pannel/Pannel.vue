<template>
    <div class="pannel">
        <h2 @dblclick="visible = !visible" class="pannel-title">{{ title }}</h2>
        <transition name="pannel-fade">
          <div v-show="visible" class="pannel-content">
            <slot name="img"></slot>
          </div>
        </transition>
    </div>
</template>

<script>
export default {
  /**
   * Directive variables binded with each types and required for Pannel component
   * @type Object
   */
  props: {
    title: {
        type: String,
        required: true
    }
  },

  /**
   * Binded variables
   */
  data() {
    return {
      visible: true
    }
  }
}
</script>

<style lang="sass" scoped>
  @import './Pannel.scss';
</style>
