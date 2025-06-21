import { verifyToken } from "../helpers/token.helper.js";

const setupPolicies = (policies) => async (req, res, next) => {
  try {
    console.log("Políticas requeridas:", policies);
    if (policies.includes("PUBLIC")) return next();
    const token = req?.cookies?.token;
    console.log("Token recibido:", token);
    const data = verifyToken(token);
    console.log("Datos decodificados:", data);
    const { role, user_id } = data;
    if (!role || !user_id){
      console.log("Falta rol o user_id");
      return res.json401();
    } 
    const roles = {
      USER: policies.includes("USER"),
      ADMIN: policies.includes("ADMIN"),
    };
    if (roles[role]) {
      req.user = data;
      console.log("Rol válido, req.user:", req.user);
      return next();
    } else {
      console.log("Rol no autorizado");
      res.json(403);
    }
  } catch (error) {
    console.error("Error en setupPolicies:", error);
    next(error)
  }
};

export default setupPolicies;