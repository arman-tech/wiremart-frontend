import { defineStore } from "pinia";
import { Product } from "../models/product";
import axios from 'axios';

const productsUrl = "http://localhost:4001/products";
interface ProductState  {
    items: Record<string, Product>

}

export const useProductStore = defineStore({
    id: "productStore",
    state: (): ProductState => ({
        items: {}
    }),
    actions: {
        async fetchAllProducts() {
            let products: Array<Product>;
            const response = await axios.get(productsUrl);
            products = await response.data;
            // we could do any transformation we wish here.

            // set state products.
            products.map( product => {
                this.items[product.id] = product;
            });
        }
    },
    getters: {
        getProductsCount(state: ProductState): number {
            return Object.keys(state.items).length;
        },

        getAllProducts(state: ProductState): Array<Product> {
            return Object.values(state.items);
        },

        getProductById(state: ProductState) {
            return (productId: number) => state.items[productId];
        }
    }
});