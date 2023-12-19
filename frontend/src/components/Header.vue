<script setup>
import { RouterLink } from "vue-router"
</script>

<template>
    <header class=" w-full  lg:fixed bg-cyan-100 rounded-b-3xl border-b border-solid border-cyan-600">
        <nav class=" py-2 ">
            <div class="flex items-center justify-between max-w-screen-xl  mx-auto">
                <RouterLink to="/login">Login</RouterLink>
                <RouterLink to="/">Inicio</RouterLink>
            </div>
        </nav>
    </header>
</template>