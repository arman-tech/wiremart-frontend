export interface Product {
    id: number,
    name: string,
    description: string,
    imgSource: string,
    price: number,
    sku: string,
    qtyAvailable: number,
    qtyMaxPerOrder: number,
    qtyMinPerOrder: number,
    shippingCost: number
}