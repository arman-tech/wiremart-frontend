<template>
<p>Demo page</p>
    <div>Hello, {{ userName }}!</div>
    <input v-model="userName" />
    <button :disabled="!isNamePresent" @click="submitName">Submit</button>
    <span>
        <div>Counter: <input v-model="count" /> </div>
        <button class="btn btn-secondary" @click="incrementCounter" >Increment++</button>
        <button class="btn btn-secondary" @click="doubleCounter" >Double it!</button>
    </span>

</template>

<script src="./demo.ts" lang="ts"></script>
<style src="./demo.css" scoped></style>