import express from "express"
import CartManager from "../Dao/controllers/Mongo/cartManagerMongo.js"
import { __dirname } from "../utils.js"


//esto es fs
//import CartManager from "../Dao/controllers/fs/productManager.js"
//const cm=new CartManager(__dirname+'/Dao/database/carts.json')

const cm = new CartManager()
const routerC =express.Router()

// routerC.get("/",async(req,res)=>{
//    const carrito=await  cm.getCarts()
//    res.json({carrito})
// })

// routerC.get("/:cid", async (req, res) => {
//   try {
//       const { cid } = req.params;

//       // Llamar al método findCartById con populate
//       const cart = await cm.findCartById(cid);

//       if (!cart) {
//           return res.status(404).send({ result: "error", message: "Carrito no encontrado" });
//       }

//       res.send({ result: "success", payload: cart });
//   } catch (error) {
//       console.error("Error al obtener el carrito:", error);
//       res.status(500).send({ result: "error", message: error.message });
//   }
// });

routerC.get("/:cid", async (req, res) => {
  try {
      const { cid } = req.params;

      // Usar populate para obtener los detalles completos de los productos
      const cart = await cartModel.findById(cid).populate("products.product").lean();

      if (!cart) {
          return res.status(404).send({ error: "Carrito no encontrado" });
      }

      // Agregar la cantidad al producto detallado
      const productsDetails = cart.products.map(product => ({
          ...product.product,
          quantity: product.quantity
      }));

      res.render("carts", { cart, productsDetails });
  } catch (error) {
      console.error("Error al obtener el carrito", error);
      res.status(500).send({ error: error.message });
  }
});




routerC.post("/", async (req, res) => {
    const cart = await cm.addCart()
    res.json({ cart })
  });

  routerC.post("/:cid/products/:pid", async (req, res) => {
    
    const { cid, pid } = req.params;
    const cart = await cm.addProductToCart(cid, pid) 
    res.json({ cart });
  });

  routerC.delete("/:cid/products/:pid", async (req, res) => {
    const {cid, pid} = req.params;
    const result = await cm.deleteProduct(cid, pid)
    res.send({result:"success",payload: result});
  })
  
  routerC.put("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await cm.updateCart(cid);
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("Error al actualizar el carrito", error);

        res.status(500).send({ error: error.message });
    }
  });

  routerC.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const result = await cm.updateProductQuantity(cid, pid, quantity);
        res.send({ result: "success", payload: result });

    } catch (error) {
        console.error("Error al actualizar la cantidad del producto", error);
        res.status(500).send({ error: error.message });
    }
  });

  routerC.delete("/:cid", async(req, res) => {
    try {
        const { cid } = req.params;
        const result = await cm.deleteAllProducts(cid);
        res.send({ result: "success", payload: result });
    } catch (error) {
        console.error("No se pudieron eliminar todos los productos del carrito, intentalo de nuevo", error);
        res.status(500).send({ error: error.message });
    }
});



export default routerC