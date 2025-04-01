import { Router } from "express";
import routerCarts from "./carts.router.js"
import routerProducts from "./products.router.js"
import routerViews from "./views.router.js"
import usersRouter from "./users.routes.js";
import sessionsRouter from "./sessions.routes.js"

const router = Router()

router.use('/api/products', routerProducts);
router.use("/" ,routerViews)
router.use('/api/carts', routerCarts);

router.use('/api/users', usersRouter)
router.use('/api/sessions', sessionsRouter)
router.use('*', (req, res) => {
    res.status(404).send('Ruta no encontrada')
})



// router.use("/realTimeProducts" , routerRealTimesProducts)
// router.use('/api/users', routerUsers);


export default router;