
<template>
	<div class="root-container">

    <div class="navbar bg-base-100 rounded-box mb-5">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
          </label>
          <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 
                shadow bg-base-100 rounded-box w-52">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/demo">Demo</router-link></li>
            <li><router-link to="/cart">Cart</router-link></li>
            <li><router-link to="/sign-in">Sign in</router-link></li>
            <li><router-link to="/about">About</router-link></li>
          </ul>
        </div>
        <div class="dropdown">
          <label tabindex="1" class="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </label>
          <ul tabindex="1" 
              class="menu menu-compact dropdown-content mt-3 p-2 
              shadow bg-base-100 rounded-box w-52">
            <template v-for="(lang) in localeSupports">
              <li @click="selectedValue(lang.value)" class="px-5 py-2 cursor-pointer">{{ lang.caption }}</li>
            </template>

          </ul>
        </div>        
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost normal-case text-xl" @click="redirectToHomePage">Wiremart</a>
      </div>
      <div class="navbar-end">
        <label tabindex="0" >
          <div class="indicator">
            <span class="indicator-item badge badge-secondary mt-2 mr-2">{{ cartCount }}</span>
            <button class="btn btn-ghost gap-2" v-on:click="redirectToCartPage">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <div>{{ n(cartSubtotal, 'currency') }}</div>
            </button>
          </div>
        </label>
        <button class="btn btn-ghost btn-circle">
          <div class="indicator">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            <span class="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
      </div>
    </div>

		<div class="row">      
      <div class="col-md-12 col-lg-12 main-content">
        <router-view></router-view>
      </div>
		</div>

	</div>
</template>


<script src="./app.ts" lang="ts"></script>
<style src="./app.css"></style>
