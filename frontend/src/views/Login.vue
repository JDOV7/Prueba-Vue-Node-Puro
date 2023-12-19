<script setup>
import { ref } from "vue";
import router from "../router";
import { auth, iniciarSesion } from "../Context/useAuth";

const correo = ref("jesusmarzo7@gmail.com");
const password = ref("42183896");

const iniciarSesionFunc = async (correo, password) => {
    const respuesta = await iniciarSesion(correo, password);
    console.log(`Se inicio sesion?: ${respuesta}`);
    console.log(auth);
    if (respuesta) {
        router.push('/app');
    } else {
    }
};
</script>

<template>
    <div class="flex items-center justify-center">
        <div class="grid grid-cols-1 shadow-2xl p-2 rounded-3xl">
            <div class="col-span-1 p-2">
                <h1 class="text-2xl text-cyan-900 text-center font-black">
                    Inicia Sesion
                </h1>
            </div>
            <div class="col-span-1 p-2">
                <label for="correo" class="px-2">Correo</label>
                <input type="email" name="correo" id="correo" class="bg-cyan-200 rounded-3xl p-1 w-full" v-model="correo" />
            </div>
            <div class="col-span-1 p-2">
                <label for="password" class="px-2">Password</label>
                <input type="password" name="password" id="password" class="bg-cyan-200 rounded-3xl p-1 w-full"
                    v-model="password" />
            </div>
            <div class="col-span-1 flex items-center justify-center p-5">
                <button class="p-2 bg-green-900 rounded-2xl text-white" @click="iniciarSesionFunc(correo, password)">
                    Ingresar
                </button>
            </div>
            <div class="col-span-1 p-2">
                <p>{{ correo }}</p>
                <p>{{ password }}</p>
            </div>
        </div>
    </div>
</template>
