import Vue from 'vue';

Vue.directive('apic-transform', {

    /**
     * Transform el each double click
     * Options: rotate (clockwise or not) and scale
     * @param {*} el 
     * @param {*} binding (modifiers, args, value)
     * @param {*} vnode (reference to Virtual DOM, which allows associated component-properties access)
     */
    bind(el, binding, vnode) {

        /**
         * binding.arg (arguments): determine the directive main logic
         * binding.modifiers: attributes that can be used by the args to activate/change specific logics
         * binding.value: value passed to be used/modified
         */

        /**
         * Example of vnode: vnode.context.associatedComponentProperty
         */

        let current = 0;
        
        el.addEventListener('dblclick', function() {
            
            let increment = binding.value || 90;
            let effect;

            // Check if increment and animate values were sent through params binding
            // if(binding.value) {
            //     increment = binding.value.increment;
            //     animate = binding.value.animate;
            // }
            
            // Check if there wasn't any args passed through or if there was a rotate, that's the default
            if(!binding.arg || binding.arg == 'rotate') {

                effect = `rotate(${current}deg)`;

                // Check if the rotation is clockwise or not
                if(binding.modifiers.reverse) current -= increment;
                else current += increment;
            }
            // If it wasn't a rotate arg, scale the element with increment value passed through
            else if(binding.arg == 'scale') {
                effect = `scale(${increment})`;
            }
            
            // Implement CSS transform and transition effects (scale/rotate and animation)
            el.style.transform = effect;
            if(binding.modifiers.animate) el.style.transition = 'transform .5s';
        });

    }
});