;import { useUserStore } from './store/user';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { computed, defineComponent } from 'vue';
import { useProductStore } from './store/products';
import { useCartStore } from './store/cart';
import Home from './views/home/home.vue';
import About from './views/about/about.vue';
import SignIn from './views/sign-in/sign-in.vue';
import { RoutingPaths } from './router/routing-paths';
import { LocaleSupports } from './i18n/locals';

export default defineComponent ({
    components: {Home, About, SignIn},
    setup() {
        const productStore = useProductStore();
        const cartStore = useCartStore();
        const router = useRouter();
        const { locale, t, n } = useI18n();

        const localeSupports = LocaleSupports;
        productStore.fetchAllProducts();

        const redirectToCartPage = () => {
            router.push(RoutingPaths.Cart);
        };

        const redirectToHomePage = () => {
            router.push(RoutingPaths.Home);
        };

        const cartCount = computed(():number => {
            return cartStore.getCartCount;
        });

        const cartSubtotal = computed(():number =>{
            return cartStore.getSubtotal;
        })

        const selectedValue = (value: string) => {
            locale.value = value;
        }

        return { 
            redirectToCartPage, 
            redirectToHomePage, 
            cartCount, 
            cartSubtotal,
            localeSupports,
            selectedValue,
            t,
            n
        }
    },
});