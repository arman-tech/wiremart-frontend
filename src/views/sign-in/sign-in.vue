<template>
<div class="sm:flex sm:flex-row mx-0 justify-center">
    <div class="flex self-center z-10">
    <div class="p-12 bg-white mx-auto rounded-2xl w-100 ">
        <div class="mb-4">
            <h3 class="font-semibold text-2xl text-gray-800 text-center">Sign In </h3>
            <p class="text-gray-500 text-center">Please sign in to your account.</p>
        </div>
        <div class="space-y-5">
            <div class="space-y-2">
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="Your email address" v-model="email"
                    class="text-base px-4 py-2 input-md input input-bordered input-primary w-full max-w-xs">
                </div>
            </div>
            <div class="space-y-2">
                <div class="form-control w-full max-w-xs">
                    <label class="label">
                        <span class="label-text">Password</span>
                    </label>
                    <input type="text" placeholder="password" v-model="password"
                    class="text-base px-4 py-2 input-md input input-bordered input-primary w-full max-w-xs">
                </div>            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <input id="remember_me" name="remember_me" type="checkbox" class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded">
                    <label for="remember_me" class="ml-2 block text-sm text-gray-800">
                        Remember me
                    </label>
                </div>
                <div class="py-2 pl-5 text-sm">
                    <a href="#" class="text-green-400 hover:text-green-500">
                        Forgot your password?
                    </a>
                </div>
            </div>
            <div>
                <button type="submit" @click="onSignIn" class="w-full flex justify-center btn btn-wide btn-primary ">
                Sign in
                </button>
            </div>
        </div>
        <div class="pt-5 text-center text-gray-400 text-xs">
            Copyright © 2022
        </div>
    </div>
    </div>
</div>
</template>
<script src="./sign-in.ts" lang="ts" />
<style src="./sign-in.css" scoped />