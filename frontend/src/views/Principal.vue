<script setup>
import { onMounted, ref } from "vue";
import {
  auth,
  verificarSiSeInicioSesion,
  obtenerProductos,
  eliminarProducto,
} from "../Context/useAuth";
import router from "../router";

const productos = ref([]);

onMounted(async () => {
  await verificarSiSeInicioSesionFunc();
  await obtenerProductosFunc();
});

const verificarSiSeInicioSesionFunc = async () => {
  const respuesta = await verificarSiSeInicioSesion();
  if (!respuesta) {
    router.push("/login");
  }
};

const obtenerProductosFunc = async () => {
  const respuesta = await obtenerProductos();
  productos.value = respuesta;
};

const eliminarProductoFunc = async (IdProductos) => {
  const respuesta = await eliminarProducto(IdProductos);
  if (respuesta) {
    await obtenerProductosFunc();
  } else {
    window.alert("No se pudo eliminar el producto");
  }
};
</script>

<template>
  <div>
    <div>
      <h1 class="text-center">App principal....</h1>
    </div>
    <div>
      <h4>IdUser: {{ auth.IdUser }}</h4>
      <h4>jwtToken: {{ auth.jwtToken }}</h4>
      <h4>jwtToken: {{ productos.length }}</h4>
    </div>
    <div>
      <table>
        <tr>
          <th>IdProductos</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Eliminar</th>
        </tr>
        <tr v-for="producto in productos" class="px-8">
          <td class="px-10">{{ producto.IdProductos }}</td>
          <td class="px-10">{{ producto.Nombre }}</td>
          <td class="px-10">{{ producto.Precio }}</td>
          <td class="px-10">
            <button
              class="bg-red-500 p-2 rounded-2xl"
              @click="eliminarProductoFunc(producto.IdProductos)"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
