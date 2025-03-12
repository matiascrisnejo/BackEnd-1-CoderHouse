import express from "express"
import ProductManager from "../Dao/controllers/Mongo/productManagerMongo.js"
import { __dirname } from "../../utils/utils.js"
import { authorization } from "../Dao/config/authorization.js"
import passport from "passport"


//esto es con fs
//import ProductManager from "../Dao/controllers/fs/productManager.js"
//const manager = new ProductManager(__dirname+"/Dao/database/products.json")

const pm = new ProductManager()
const routerP = express.Router()


routerP.get("/", passport.authenticate('jwt') ,async (req, res) => {
    try {

        const { page, limit, sortOrder, category } = req.query;
        
        const productList = await pm.getProducts({ page, limit, sortOrder, category });
        res.json({ productList });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al obtener productos", error: error.message });
    }
});

routerP.get("/:pid", passport.authenticate('jwt') ,async (req, res) => {
    try {
        const productFind = await pm.getProductById(req.params.pid);
        res.json({ status: "success", productFind });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al obtener el producto", error: error.message });
    }
});

routerP.post("", passport.authenticate('jwt') ,authorization('Admin') ,async (req, res) => {
    try {
        const newproduct = await pm.addProducts(req.body);
        res.json({ status: "success", newproduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al agregar el producto", error: error.message });
    }
});

routerP.put("/:pid", passport.authenticate('jwt') ,authorization('Admin') ,async (req, res) => {
    try {
        const updateproduct = await pm.updateProduct(req.params.pid, req.body);
        res.json({ status: "success", updateproduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al actualizar el producto", error: error.message });
    }
});

routerP.delete("/:pid", passport.authenticate('jwt') ,authorization('Admin') ,async (req, res) => {
    try {
        const deleteproduct = await pm.deleteProduct(req.params.pid);
        res.json({ status: "success", deleteproduct });
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error al eliminar el producto", error: error.message });
    }
});

export default routerP;