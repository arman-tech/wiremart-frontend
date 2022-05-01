<template>
    <div class="flex flex-row flex-wrap">
         <div v-for="(prod, index) in products" :key="index">
            <div class="card-padding">
                <ProductCard :product = prod @addToCart="handleAddToCart" 
                :quantity="handleCartQtySelected(prod.id)" />
            </div>
        </div>   
    </div>
</template>

<script src="./home.ts" lang="ts"></script>
<style src="./home.css" scoped></style>