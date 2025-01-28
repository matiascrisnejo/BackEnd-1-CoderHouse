import express from "express"
//import routerP from "./routes/product.router.js"
import handlebars from "express-handlebars"
import { __dirname } from "./utils.js"
//import routerV from "./routes/views.router.js"
import { Server } from "socket.io"
import socketProducts from "./listeners/socketProducts.js"
import connectToDB from "./Dao/config/index.js"
//import socketChat from "./listeners/socketChat.js"
//import routerC from "./routes/carts.router.js"
import routerApp from "./routes/index.js"

const app = express()
const PORT = 8080




app.use(express.static(__dirname+"/public"))

app.engine("handlebars",handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine","handlebars")

app.use(routerApp)

connectToDB()
const httpServer=app.listen(PORT, () => {
    try {
        console.log(`Listening to the port ${PORT}\nAcceder a:`);
        console.log(`\t1). http://localhost:${PORT}/api/products`)
        console.log(`\t2). http://localhost:${PORT}/api/carts`);
    }
    catch (err) {
        console.log(err);
    }
})

const socketServer = new Server(httpServer)

socketProducts(socketServer)
//socketChat(socketServer)