import { reactive } from "vue";
import clienteAxios from "../../Config/ClienteAxios";

const auth = reactive({
  IdUser: "",
  jwtToken: "",
});

const iniciarSesion = async (email, IdGitHub) => {
  try {
    const { data } = await clienteAxios.post("/api/iniciar-sesion", {
      email,
      IdGitHub,
    });
    console.log(data.data);
    const {
      data: { jwtToken, IdUser },
    } = data;
    auth.IdUser = IdUser;
    auth.jwtToken = jwtToken;
    return true;
  } catch (error) {
    console.log(error);
    auth.IdUser = "";
    auth.jwtToken = "";
    return false;
  }
};

const verificarSiSeInicioSesion = async () => {
  try {
    const { data } = await clienteAxios.post(
      "/api/validar-sesion",
      {},
      {
        headers: {
          Authorization: auth.jwtToken,
        },
      }
    );
    console.log(data.data);

    return true;
  } catch (error) {
    console.log("-----------verificarSiSeInicioSesion----------");
    console.log(error);
    auth.IdUser = "";
    auth.jwtToken = "";
    return false;
  }
};

const obtenerProductos = async () => {
  try {
    const { data } = await clienteAxios.get("/api/productos", {
      headers: {
        Authorization: auth.jwtToken,
      },
    });

    return data.data.respuesta;
  } catch (error) {
    console.log("-----------verificarSiSeInicioSesion----------");
    console.log(error);

    return [];
  }
};

const eliminarProducto = async (IdProductos) => {
  try {
    const { data } = await clienteAxios.delete(`api/producto/${IdProductos}`, {
      headers: {
        Authorization: auth.jwtToken,
      },
    });
    console.log(data.data);
    return true;
  } catch (error) {
    console.log("-----------eliminarProducto----------");
    console.log(error);

    return false;
  }
};

export {
  auth,
  iniciarSesion,
  verificarSiSeInicioSesion,
  obtenerProductos,
  eliminarProducto,
};
