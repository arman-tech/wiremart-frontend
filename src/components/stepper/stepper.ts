import { computed, defineComponent, toRefs } from 'vue';
export default defineComponent({
    name:"stepper",
    props: {
        minValue: {type: Number, required: true },
        currentValue: {type: Number, required: true },
        maxValue: { type: Number, default: null}
    },
    setup(props, context) {

        const { minValue, currentValue, maxValue } = toRefs(props);

        const decrement = () => {
            if (isMinValue.value) {
                return;
            }
            context.emit("updateQty", currentValue.value - 1);
        };

        const increment = () => {
            if(isMaxValue.value) {
                return;
            }
            context.emit("updateQty", currentValue.value + 1);
        };

        const isMinValue = computed(() => {
            return currentValue.value === minValue.value;
        });

        const isMaxValue = computed(() => {

            if(maxValue) {
                return currentValue.value === maxValue.value;
            }

            // max value has not been set, so there is no upper limit.
            return false;
        });

        return { 
            isMinValue,
            isMaxValue,
            currentValue,
            increment,
            decrement
        }
    }
})

