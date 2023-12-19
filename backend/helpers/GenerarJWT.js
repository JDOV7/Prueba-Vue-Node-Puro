import jwt from "jsonwebtoken";

const generarJWT = async (data) => {
  return jwt.sign(data, "jwt_super_privado", {
    expiresIn: "30d",
  });
};

export default generarJWT;
