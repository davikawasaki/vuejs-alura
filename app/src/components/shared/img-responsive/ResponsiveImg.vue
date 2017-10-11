<template>
  <img :src="url" :alt="title" class="img-responsive" />
</template>

<script>
export default {
    /**
     * Directive variables binded with each types and required for ResponsiveImg component
     * @type Object
     */
    props: {
        title: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="sass" scoped>
    @import './ResponsiveImg.scss';
</style>

