<template>
  <img :src="url" :alt="title" class="img-responsive" />
</template>

<script>
export default {
    props: ['title', 'url']
}
</script>

<style lang="scss" scoped>
    .img-responsive {
        width: 100%;
    }
</style>

