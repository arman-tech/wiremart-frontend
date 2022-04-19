<template>
    <div v-if="cartItems.length > 0">
        <h1 class="mt-x4">{{t('cart.review-cart')}}</h1>

        <div class="mt-x0.75">
            <CartTable :cartItems=cartItems></CartTable>
        </div>

        <div class="flex justify-center">
            <div class="card w-96 bg-base-100 shadow-xl my-3">
                <div class="card-body">
                    <div class="flex flex-row justify-between">
                        <div class="font-semibold pr-8">{{ t('cart.subtotal')}}:</div> 
                        <div>{{ n(subTotal, 'currency') }}</div>
                    </div>
                    <div class="flex flex-row justify-between">
                        <div class="font-semibold">{{ t('cart.shipping')}}:</div>
                        <div>{{ n(shippingCost, 'currency') }}</div>
                    </div>
                    <div class="flex flex-row justify-between">
                        <div class="font-semibold">{{ t('cart.tax')}}:</div>
                        <div>{{ n(tax, 'currency') }}</div>
                    </div>
                    <h1 class="flex flex-row justify-between">
                        <div class="font-extrabold hover:font-mono">{{ t('cart.total')}}:</div>
                        <div>{{ n(total, 'currency') }}</div>
                    </h1>
                    <div class="card-actions justify-center mt-4">
                        <button class="btn btn-lg btn-primary" @click="onCompleteOrder">{{ t('cart.complete-order')}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <h1 class="flex justify-center text-3xl p-8">{{ t('cart.empty-cart')}}</h1>
    </div>
</template>
<script lang="ts" src="./cart.ts" />
<style src="./cart.css" scoped/>