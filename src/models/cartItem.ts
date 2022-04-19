import { Product } from "./product";

export interface CartItem {
    productId: number,
    qty: number,
    product: Product
}