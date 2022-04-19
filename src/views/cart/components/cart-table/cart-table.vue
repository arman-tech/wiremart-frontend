<template>
    <div class="overflow-x-auto w-full">
        <table class="table w-full">
            <tbody>
            <template v-for="(cart, index) in cartItems" :key="index">
                <CartTableRow :cartItem="cart" :maxDescLength = 64></CartTableRow>
            </template>
            </tbody>          
        </table>
    </div>
</template>
<script lang="ts" src="./cart-table.ts" />
<style src="./cart-table.css" scoped/>