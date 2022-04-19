import { defineComponent, PropType, toRefs } from 'vue';
import { Cart } from './../../../../models/cart';
import CartTableRow from '../cart-table-row/cart-table-row.vue';

export default defineComponent({
    name: "cartTable",
    components: { CartTableRow },
    props: {
        cartItems: { type: Object as PropType<Array<Cart>>, required: true },
    },
    setup(props) {
        const { cartItems } = toRefs(props);

        return { cartItems }
    }
})