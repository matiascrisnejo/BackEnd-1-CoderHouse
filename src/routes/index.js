import { Router } from "express";
import routerCarts from "./carts.router.js"
import routerProducts from "./products.router.js"
import routerViews from "./views.router.js"

const router = Router()

router.use('/api/products', routerProducts);
router.use("/" ,routerViews)
router.use('/api/carts', routerCarts);

// router.use("/realTimeProducts" , routerRealTimesProducts)
// router.use('/api/users', routerUsers);


export default router;