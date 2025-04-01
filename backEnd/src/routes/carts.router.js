import express from "express"
import CartManager, { checkout } from "../Dao/controllers/Mongo/cartManagerMongo.js"
import { __dirname } from "../utils.js"
import { authorization } from "../Dao/config/authorization.js"
import passport from "passport"


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

routerC.get("/:cid", passport.authenticate('jwt') ,authorization('Usuario') ,async (req, res) => {
  try {
      const { cid } = req.params;

      // Usa populate para obtener los detalles completos de los productos
      const cart = await cartModel.findById(cid).populate("products.product").lean();

      if (!cart) {
          return res.status(404).send({ error: "Carrito no encontrado" });
      }

      // Agrega la cantidad al producto detallado
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


routerC.post("/", passport.authenticate('jwt') ,authorization('Usuario') ,async (req, res) => {
  try {
    const cart = await cm.createCart();
    res.status(201).json({ result: "success", payload: cart });
  } catch (error) {
    console.error("Error al crear el carrito", error);
    res.status(500).send({ error: error.message });
  }
});

routerC.post('/:cid/purchase', passport.authenticate('jwt'), authorization('Usuario'), checkout)

routerC.post("/:cid/products/:pid", passport.authenticate('jwt') ,authorization('Usuario') ,async (req, res) => {
  try {
    const {quantity} = req.body
    const { cid, pid } = req.params;
    const cart = await cm.addProductToCart(cid, pid,quantity);

    if (!cart) {
      return res.status(404).send({ error: "Carrito no encontrado o producto no agregado" });
    }

    res.json({ result: "success", payload: cart });
  } catch (error) {
    console.error("Error al añadir el producto al carrito", error);
    res.status(500).send({ error: error.message });
  }
});

routerC.delete("/:cid/products/:pid", passport.authenticate('jwt') ,authorization('Usuario') ,async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const result = await cm.deleteProduct(cid, pid);

    if (!result) {
      return res.status(404).send({ error: "Producto no encontrado en el carrito" });
    }

    res.json({ result: "success", payload: result });
  } catch (error) {
    console.error("Error al eliminar el producto del carrito", error);
    res.status(500).send({ error: error.message });
  }
});

routerC.put("/:cid", passport.authenticate('jwt') ,authorization('Usuario') ,async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cm.updateCart(cid);

    if (!result) {
      return res.status(404).send({ error: "Carrito no encontrado" });
    }

    res.json({ result: "success", payload: result });
  } catch (error) {
    console.error("Error al actualizar el carrito", error);
    res.status(500).send({ error: error.message });
  }
});

routerC.put("/:cid/products/:pid", passport.authenticate('jwt') ,async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    
    if (quantity <= 0) {
      return res.status(400).send({ error: "La cantidad debe ser mayor que 0" });
    }

    const result = await cm.updateProductQuantity(cid, pid, quantity);

    if (!result) {
      return res.status(404).send({ error: "Producto o carrito no encontrado" });
    }

    res.json({ result: "success", payload: result });
  } catch (error) {
    console.error("Error al actualizar la cantidad del producto", error);
    res.status(500).send({ error: error.message });
  }
});


routerC.delete("/:cid", passport.authenticate('jwt') ,async (req, res) => {
  try {
    const { cid } = req.params;
    const result = await cm.deleteAllProducts(cid);

    if (!result) {
      return res.status(404).send({ error: "Carrito no encontrado" });
    }

    res.json({ result: "success", payload: result });
  } catch (error) {
    console.error("Error al eliminar todos los productos del carrito", error);
    res.status(500).send({ error: error.message });
  }
});



export default routerC