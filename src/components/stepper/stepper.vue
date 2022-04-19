<template>
    <div class="flex flex-row">
        <button class="btn btn-circle btn-warning" :disabled="isMinValue" @click="decrement">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
            </svg>      
        </button>
        <div class="p-3 text-lg font-bold">{{ currentValue }}</div>
        <button class="btn btn-circle btn-success" :disabled="isMaxValue" @click="increment">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>        
        </button>
    </div>
</template>
<script src="./stepper.ts" lang="ts" />
<style src="./stepper.css" scoped />