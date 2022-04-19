import { useCartStore } from './../../../../store/cart';
import { defineComponent, PropType, toRefs, computed } from 'vue';
import Stepper from '../../../../components/stepper/stepper.vue';
import { CartItem } from '../../../../models/cartItem';

export default defineComponent({
    name: "cartTableRow",
    components: {
        Stepper
    },
    props: {
        cartItem: { type: Object as PropType<CartItem>, required: true },
        maxDescLength: { type: Number, default: 45 }
    },
    setup(props) {
        const cartStore = useCartStore();
        const { cartItem } = toRefs(props);

        /** 
        NOTE: Pattern is: events from child to parent, mutation from parent to child.
        **/
        const handleUpdateQty = (event: number, value:any) => {
            cartStore.updateQty(cartItem.value.productId, event);
            cartStore.calculateSummary();
        };

        const handleRemoveItem = () => {
            cartStore.removeFromCart(cartItem.value.productId);
            cartStore.calculateSummary();
        };

        const formattedDescription = computed(() => {
            if( cartItem.value.product.description.length <= props.maxDescLength) {
                return cartItem.value.product.description;
            }  
            return cartItem.value.product.description.substring(0, props.maxDescLength) + "...";
        });

        const qtyMaxPerOrder = computed(() => {
            if (cartItem.value.product.qtyAvailable < cartItem.value.product.qtyMaxPerOrder) {
                return cartItem.value.product.qtyAvailable;
            }
            return cartItem.value.product.qtyMaxPerOrder;
        });

        return { cartItem, 
            handleUpdateQty, 
            handleRemoveItem, 
            formattedDescription,
            qtyMaxPerOrder 
        }
    }
})

