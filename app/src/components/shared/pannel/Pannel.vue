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
  props: ['title'],
  data() {
    return {
      visible: true
    }
  }
}
</script>

<style scoped lang="scss">
  /* Pannel */ 
  .pannel {
    padding: 0 auto;
    border: solid 2px grey;
    display: inline-block;
    margin: 5px;
    width: 200px;
    height: 100%;
    vertical-align: top;
    text-align: center;
  }

  .pannel .pannel-title {
    text-align: center;
    margin: 0 0 15px 0;
    background-color: #ccc;
    padding: 10px;
    text-transform: uppercase;
  }

  .pannel-fade-enter, .pannel-fade-leave-active {
    opacity: 0;
  }

  .pannel-fade-enter-active, .pannel-fade-leave-active {
    transition: opacity .4s;
  }
</style>
