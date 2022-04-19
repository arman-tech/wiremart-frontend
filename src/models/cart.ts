import { CartItem } from "./cartItem";


export interface Cart {
    id: number,
    items: Array<CartItem>
    shippingCost: number,
    subTotal: number, 
    tax: number,
    total: number
}