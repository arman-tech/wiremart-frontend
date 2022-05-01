<template>
    <div class="card w-96 bg-base-100 shadow-xl">
    <figure><img :src="product.imgSource" /></figure>
    <div class="card-body">
        <div class="flex flex-row justify-between">
            <h2 class="card-title">{{product.name}}</h2>
            <h4 class="card-title">{{ n(product.price, 'currency') }}</h4>       
        </div>

        <p>{{product.description}}</p>  

        <div v-if="isSoldOut">
            <div class="card-actions justify-center pt-4">
                <blockquote class="text-2xl font-semibold italic text-center text-slate-900">
                    <span class="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block">
                        <span class="relative text-white p-2">{{ t("home.soldOut") }}</span>
                    </span>
                </blockquote>
            </div>
        </div>
        <div v-else>
            <div class="card-actions">
                <div class="form-control w-full max-w-xs pt-4">
                    <select class="select select-primary" v-model="qtySelected">
                        <option disabled selected value="0">{{ t("home.selectQty") }}</option>
                        <template v-for="(e,i) in QtyRange" :key="i">
                            <option :value="minQty + i">{{ minQty + i }}</option>
                        </template>
                    </select>       
                </div>
            </div>
            <div class="card-actions">
                <div class="form-control w-full max-w-xs pt-3">
                    <button class="btn btn-primary" :disabled="!(qtySelected > 0)" v-on:click="addToCart">{{ t("home.addToCart") }}</button>
                </div>
            </div>
        </div>

    </div>
    </div>
</template>
<script src="./product-card.ts" lang="ts" />
<style src="./product-card.css" />