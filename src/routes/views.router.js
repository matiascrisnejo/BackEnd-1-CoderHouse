import express from "express"
import ProductManager from "../Dao/controllers/Mongo/productManagerMongo.js"
import { __dirname } from "../utils.js"


const pm = new ProductManager()
const routerV = express.Router()

routerV.get("/", async(req, res)=> {
    const listadeproductos = await pm.getProductsView()
    console.log(listadeproductos);
    res.render("home",{listadeproductos})
})

routerV.get('/products', async (req, res) => {
    try {
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        const sortOrder = req.query.sort ? req.query.sort : null;
        const category = req.query.category ? req.query.category : null;

        const result = await pm.getProducts(page, limit, sortOrder, category);

        res.render('products', {
            products: result.docs.map(product => product.toObject()), // Convierto a Objeto
            totalPages: result.totalPages,
            currentPage: result.page,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage
        });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
});

routerV.get("/realtimeproducts", (req, res)=>{
    res.render("realtimeproducts")
})

// routerV.get("/chat", (req, res)=>{
//     res.render("chat")
// })

export default routerV