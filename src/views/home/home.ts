import { defineComponent, computed } from 'vue';
import ProductCard from '../../components/product-card/product-card.vue';
import { useCartStore } from '../../store/cart';
import { CartItem } from './../../models/cartItem';
import { useProductStore } from './../../store/products';
import { useI18n } from 'vue-i18n'
  
  export default defineComponent ({
    components: {
      ProductCard
    },
    setup() {
      const productStore = useProductStore();
      const cartStore = useCartStore();
      const { t, n } = useI18n();

      const products = computed(() =>{
        return productStore.getAllProducts;
      });

      const handleAddToCart = (event: CartItem, value: any) => {
        cartStore.addToCart(event.productId, event.qty, event.product);
      };

      const handleCartQtySelected = computed(()=> {
        return (productId: number) => { 
          return cartStore.getCartQty(productId); 
        };
      });

      return {
        products,
        handleAddToCart,
        handleCartQtySelected,
        t,
        n
      }
    },
  });