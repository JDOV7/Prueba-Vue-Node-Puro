import http from "http";
import url from "url";
import cors from "cors";
import {
  iniciarSesionDB,
  crearProducto,
  obtenerProductos,
  eliminarProducto,
} from "./controller/ProductosController.js";
import generarJWT from "./helpers/GenerarJWT.js";
import { verificarSesionValida } from "./controller/UsuarioController.js";

const getDataFromBodyAsync = async (req) => {
  return new Promise((resolve, reject) => {
    try {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });

      req.on("end", () => {
        try {
          const bodyData = JSON.parse(data);
          resolve(bodyData);
        } catch (error) {
          reject(error);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

const corsMiddleware = cors();
const server = http.createServer(async (req, res) => {
  corsMiddleware(req, res, async () => {
    const { pathname, query } = url.parse(req.url, true);
    const method = req.method;
    const headers = req.headers;
    let respuesta = {};
    try {
      switch (method) {
        case "POST":
          if (pathname === "/api/usuarios") {
            respuesta = await crearProducto();
          } else if (pathname === "/api/iniciar-sesion") {
            const bodyData = await getDataFromBodyAsync(req);
            console.log("Datos del cuerpo:", bodyData);
            respuesta = await iniciarSesionDB(
              bodyData.email,
              bodyData.IdGitHub
            );

            if (respuesta.status == 500) {
              throw new Error("No existe el usuario");
            }
            respuesta = respuesta.respuesta;
            const jwtToken = await generarJWT({
              id: respuesta.IdUsuarios,
            });
            respuesta = { jwtToken, IdUser: respuesta.IdUsuarios };
          } else if (pathname === "/api/validar-sesion") {
            respuesta = await verificarSesionValida(headers.authorization);
            if (respuesta.status == 500) {
              throw new Error("No existe el usuario");
            }
            respuesta = respuesta.respuesta;
          } else {
            throw new Error("Error en la ruta");
          }

          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          return res.end(
            JSON.stringify(
              {
                mensaje: "Datos del cuerpo recibidos correctamente",
                data: { ...respuesta },
                // data: { respuesta, bodyData, pathname, method },
              },
              undefined,
              2
            )
          );

          break;
        case "GET":
          if (pathname === "/api/productos") {
            respuesta = await verificarSesionValida(headers.authorization);
            if (respuesta.status == 500) {
              throw new Error("No existe el usuario");
            }
            respuesta = respuesta.respuesta;
            const productos = await obtenerProductos(respuesta.IdUsuarios);
            respuesta = productos;
          } else {
            throw new Error("Error en la ruta");
          }

          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          return res.end(
            JSON.stringify(
              {
                data: { ...respuesta },
                // data: { respuesta, bodyData, pathname, method },
              },
              undefined,
              2
            )
          );

          break;
        case "DELETE":
          if (pathname.startsWith("/api/producto/")) {
            const IdProductos = pathname.split("/").pop();
            respuesta = await verificarSesionValida(headers.authorization);
            if (respuesta.status == 500) {
              throw new Error("No existe el usuario");
            }
            respuesta = respuesta.respuesta;
            const productos = await eliminarProducto(
              respuesta.IdUsuarios,
              IdProductos
            );
            respuesta = productos;
            if (respuesta.status == 500) {
              throw new Error("No se elimino el producto");
            }
          } else {
            throw new Error("Error en la ruta");
          }

          res.writeHead(200, {
            "Content-Type": "application/json",
          });
          return res.end(
            JSON.stringify(
              {
                data: { ...respuesta },
                // data: { respuesta, bodyData, pathname, method },
              },
              undefined,
              2
            )
          );

          break;

        default:
          throw new Error("Error Ruta no encontrada");
          break;
      }
    } catch (error) {
      res.writeHead(404, {
        "Content-Type": "application/json",
      });
      return res.end(
        JSON.stringify(
          {
            mensaje: error.message,
            data: {},
          },
          undefined,
          2
        )
      );
    }
  });
});

const PORT = 3000;
const IP = "127.0.0.1";

server.listen(PORT, IP, () => {
  console.log(`Servidor en ejecución en http://${IP}:${PORT}`);
});
