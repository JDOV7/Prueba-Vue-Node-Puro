import connection from "../config/db.js";

const iniciarSesionDB = async (email, IdGitHub) => {
  try {
    const respuesta = await connection.execute(
      "select * from usuarios where email = ? and IdGitHub = ?",
      [email, IdGitHub]
    );
    if (respuesta[0].length == 0) {
      throw new Error("Error: iniciarSesion, no existe el usuario");
    }
    console.log(respuesta[0]);
    return {
      status: 200,
      respuesta: respuesta[0][0],
    };
  } catch (error) {
    console.log("----------------Error:iniciarSesion---------");
    console.log(error);
    return {
      status: 500,
    };
  }
};

const crearProducto = async () => {
  try {
    const respuesta = await connection.execute(
      "SELECT * FROM oauth2.productos;"
    );
    console.log(respuesta);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const obtenerProductos = async (IdUsuarios) => {
  try {
    const respuesta = await connection.execute(
      "SELECT * FROM productos where  IdUsuarios = ?;",
      [IdUsuarios]
    );

    console.log(respuesta[0]);
    return {
      status: 200,
      respuesta: respuesta[0],
    };
  } catch (error) {
    console.log("------------Error: obtenerProductos--------------");
    console.log(error);
    return {
      status: 500,
    };
  }
};

const eliminarProducto = async (IdUsuarios, IdProductos) => {
  try {
    const respuesta = await connection.execute(
      "DELETE FROM productos WHERE IdProductos = ? and IdUsuarios = ?;",
      [IdProductos, IdUsuarios]
    );

    console.log(respuesta[0]);
    console.log(respuesta[0].affectedRows);

    if (respuesta[0].affectedRows == 0) {
      throw new Error("Error: eliminarProducto no se elimino el producto");
    }

    return {
      status: 200,
      respuesta: respuesta[0].affectedRows,
    };
  } catch (error) {
    console.log("------------Error: eliminarProducto--------------");
    console.log(error);
    return {
      status: 500,
    };
  }
};

export { iniciarSesionDB, crearProducto, obtenerProductos, eliminarProducto };
