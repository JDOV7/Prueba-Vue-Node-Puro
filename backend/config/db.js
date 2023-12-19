import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "oauth2",
});

console.log("Conexión a MySQL establecida");
// console.log(connection);

export default connection;
