<template>
    <nav>
        <ul>
            <li v-for="route in routes" :key="route.title">
                <router-link :to="route.path ? route.path : '/'">{{ route.title }}</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    /**
     * Directive variables binded with each types and required for Menu component
     * @type Object
     * @default "props: ['routes']"
     */
    props: {
        routes: {
            type: Array,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

