import { useI18n } from 'vue-i18n';
import { useUserStore } from './../../store/user';
import { useRouter } from 'vue-router';
import { useProductStore } from './../../store/products';
import { useCartStore } from './../../store/cart';
import { computed, defineComponent } from 'vue';
import CartTable from './components/cart-table/cart-table.vue';
import { RoutingPaths } from '../../router/routing-paths';


export default defineComponent({
    name: "cart",
    components: {
        CartTable
    },
    setup() {
        const cartStore = useCartStore();
        const productStore = useProductStore();
        const useUser = useUserStore();
        const router = useRouter();
        const { t, n } = useI18n();

        const cartItems = computed(() => {
            return cartStore.getAllCartItems;
        });
        const products = computed(() => {
            return productStore.getAllProducts;
        });
        const summary = computed(() => {
            return cartStore.getCartSummary;
        });
        
        if(!useUser.isAuthenticated) {
            router.push(RoutingPaths.SignIn);
        }

        if (cartItems.value.length > 0 && useUser.isAuthenticated) {
            cartStore.calculateSummary();
        }

        const subTotal = computed((): number => {
            if(summary.value.subTotal === undefined) {
                return 0;
            }

            return summary.value.subTotal;
        })

        const shippingCost = computed((): number => {
            if(summary.value.shippingCost === undefined) {
                return 0;
            }

            return summary.value.shippingCost;
        })

        const tax = computed((): number => {
            if(summary.value.tax === undefined) {
                return 0;
            }

            return summary.value.tax;
        })

        const total = computed((): number => {
            if(summary.value.total === undefined) {
                return 0;
            }

            return summary.value.total;
        })

        const onCompleteOrder = async () => {
            // if complete order was successful, then
            // redirect to Home page.
            if (await cartStore.completeOrder()) {
                router.push(RoutingPaths.Home);
            }
        }

        return {
            cartItems,
            products,
            subTotal,
            shippingCost,
            tax,
            total,
            onCompleteOrder,
            t,
            n
        }

    }
});
