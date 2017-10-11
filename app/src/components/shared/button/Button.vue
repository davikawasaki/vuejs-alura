<template>
    <button @click="callAction()" :btype="btype" :class="buttonStyle">{{ text }}</button>
</template>

<script>
export default {
    /**
     * Directive variables binded with each types and required for Button component
     * @type Object
     */
    props: {
        btype: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: true
        },
        confirmation: {
            type: Boolean,
            required: false
        },
        bstyle: {
            type: String,
            required: false
        }
    },

    /**
     * Component methods
     * @method callAction
     */
    methods: {
        /**
         * Emit event from button click
         */
        callAction() {
            if(this.confirmation) {
                if(confirm('Confirma operação?')) {
                    this.$emit('activatedButton', new Date());
                }
                return;
            }
            this.$emit('activatedButton', new Date());
        }
    },

    /**
   * Computed methods to change data
   * @method buttonStyle
   */
    computed: {
        buttonStyle() {
            switch(this.bstyle) {
                case 'default':
                    return 'button';
                case 'danger':
                    return 'button button-danger';
                default:
                    return 'button';
            }
        }
    }

}
</script>

<style lang="sass" scoped>
    @import './Button.scss';
</style>