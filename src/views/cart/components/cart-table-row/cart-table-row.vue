<template>
    <tr>

        <td>
            <div class="flex items-center space-x-3">
                <div class="avatar">
                    <div class="mask mask-squircle w-12 h-12">
                        <img :src="cartItem.product.imgSource" alt="item image" />
                    </div>
                </div>
                <div>
                    <div class="font-bold">{{ cartItem.product.name }}</div>
                    <div class="text-sm opacity-50">{{ formattedDescription }}</div>
                </div>
            </div>
        </td>
        <td>
            <Stepper    :min-value= cartItem.product.qtyMinPerOrder 
                        :max-value= qtyMaxPerOrder
                        :current-value= cartItem.qty 
                        @updateQty="handleUpdateQty"/>
        </td>
        <td>
            <button class="btn btn-circle btn-error" @click="handleRemoveItem">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>            
            </button>
        </td>
    </tr>
</template>
<script lang="ts" src="./cart-table-row.ts" />
<style src="./cart-table-row.css" scoped/>