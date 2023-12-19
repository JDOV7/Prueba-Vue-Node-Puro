import connection from "../config/db.js";
import jwt from "jsonwebtoken";

const verificarSesionValida = async (jwtToken) => {
  try {
    const respuestaJWT = jwt.verify(jwtToken, "jwt_super_privado");

    const { id } = respuestaJWT;
    const respuesta = await connection.execute(
      "select * from usuarios where IdUsuarios = ?",
      [id]
    );

    if (respuesta[0].length == 0) {
      throw new Error("Error: verificarSesionValida, no existe el usuario");
    }
    return {
      status: 200,
      respuesta: respuesta[0][0],
    };
  } catch (error) {
    console.log("------------Error: verificarSesionValida-----------");
    console.log(error);
    return {
      status: 500,
    };
  }
};

export { verificarSesionValida };
