import { defineComponent, PropType, ref, computed, toRefs } from 'vue';
import { Product }  from './../../models/product';
import { CartItem } from './../../models/cartItem';
import { useI18n } from 'vue-i18n';

export default defineComponent ({
    name: "productCart",
    props: {
        product: { type: Object as PropType<Product>, required: true },
        quantity: {type: Number, default: 0}
    },
    setup(props, context) {
        const { t, n } = useI18n();
        const { product } = toRefs(props);
        const qtySelected = ref(props.quantity);
        const isSoldOut = computed(() => {           
            return product.value.qtyAvailable === 0; 
        });

        const minQty = computed(():number => {
            return product.value.qtyMinPerOrder;
        });

        const maxQty = computed(():number => {
            if( product.value.qtyAvailable <= product.value.qtyMaxPerOrder) {
                return product.value.qtyAvailable;
            }

            return product.value.qtyMaxPerOrder;
        });

        const QtyRange = computed(():number => {
            return (maxQty.value - minQty.value) + 1;
        });

        const addToCart = () => {
            const cartItem: CartItem = {
                productId: product.value.id,
                qty: qtySelected.value,
                product: product.value,
            };

            context.emit("addToCart", cartItem);
        };

        return {
            product,
            qtySelected,
            isSoldOut,
            addToCart,
            minQty,
            maxQty,
            QtyRange,
            t, n
        }
    }
});
