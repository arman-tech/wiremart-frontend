import { CartCompleteOrderResponse } from './../models/cart-complete-order-response';
import { CartSummaryResponse } from './../models/cart-summary-response';
import { useUserStore } from './user';
import { useProductStore } from './products';
import { defineStore, storeToRefs } from 'pinia';
import { CartItem } from './../models/cartItem';
import { Product } from '../models/product';
import { Cart } from '../models/cart';
import axios from 'axios';

const calculateCartUrl = "http://localhost:4001/post/cartItems";
const completeOrderCartUrl = "http://localhost:4001/post/completeOrder";
interface CartState {
    items: Record<string, CartItem>
    summary: Cart
}

export const useCartStore = defineStore({
    id: "cartStore",
    state: (): CartState => ({
        items: {},
        summary: {} as Cart
    }),
    getters: {

        getCartCount(): number {
            return Object.keys(this.items).length;
        },
        getAllCartItems(): Array<CartItem> {
            return Object.values(this.items);
        },
        getSubtotal(): number {
            const productStore = useProductStore();
            let subTotal = 0;

            // for each product in cart calculate it's total (price * qty)
            for (let index in Object.keys(this.items)) {
                let productId = Object.values(this.items)[index].productId;
                const quantity = Object.values(this.items)[index].qty;

                let product = productStore.getProductById(productId);
                subTotal += product.price * quantity;
            }

            return subTotal;
        },

        getCartQty(state: CartState) {
            return (productId: number) => state.items[productId]?.qty ? 
            state.items[productId].qty : 0;
        },

        getCartSummary(state: CartState) {
            return state.summary;
        }
    },
    actions: {
        async completeOrder() {
            const useUser = useUserStore();
            const { userInfo } = storeToRefs(useUser);
            
            const response = await axios.post<CartCompleteOrderResponse>(completeOrderCartUrl, {
                userId: userInfo.value.id,
                cartItems: this.getAllCartItems
            });
            const outcome = await response.data;

            // if order has been completed, then clear cart-items and cart-summary.
            if(outcome && outcome.result) {
                this.clearCart();
                return true;
            }

            // failed to complete order
            return false;
        },
        async calculateSummary() {
            const useUser = useUserStore();
            const { userInfo } = storeToRefs(useUser);

            const response = await axios.post<CartSummaryResponse>(calculateCartUrl, {
                userId: userInfo.value.id,
                cartItems: this.getAllCartItems
            });
            const outcome = await response.data;

            if(outcome) {
                // cartSummary is the JSON object that we are interested in.
                this.summary = outcome.cartSummary;
            }
        },
        clearCart() {
            this.items = {};
            this.summary = {} as Cart;
        },
        addToCart(productId: number, quantity: number, product: Product) {
            if(this.items[productId]) {
                this.items[productId].qty = quantity;
                return;
            }

            // else new record 
            this.items[productId] = {
                productId,
                qty: quantity,
                product: product
            };
        },
        updateQty(productId: number, quantity: number) {
            if(this.items[productId]) {              
                this.items[productId].qty = quantity;
            }
        },
        removeFromCart(productId:number) {
            if(!this.items[productId]) {
                return;
            }

            // else delete record
            delete this.items[productId];
        }
    }
});