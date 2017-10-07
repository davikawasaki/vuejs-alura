<template>
    <div class="pannel">
        <h2 class="pannel-title">{{ title }}</h2>
        <slot name="img" class="pannel-content"></slot>
    </div>
</template>

<script>
export default {
  props: ['title']
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
    padding: 10px;
    text-transform: uppercase;
  }
</style>
