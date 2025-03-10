import express from "express"
//import routerP from "./routes/product.router.js"
import handlebars from "express-handlebars"
import { __dirname } from "../utils/utils.js"
//import routerV from "./routes/views.router.js"
import { Server } from "socket.io"
import socketProducts from "./listeners/socketProducts.js"
import connectToDB from "./Dao/config/index.js"
//import socketChat from "./listeners/socketChat.js"
//import routerC from "./routes/carts.router.js"
import routerApp from "./routes/index.js"

import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import passport from "passport"
import initializatePassword from "./Dao/config/passport.js"


const app = express()
const PORT = 8080

app.use(express.json())
app.use(cookieParser("firmaSecreta"))
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://crisnejomatias:T2l2f4n4@matiascluster.wnvxrzy.mongodb.net/dbecomercenew?retryWrites=true&w=majority",
        ttl: 60
    }),
    secret: "sesionSecreta",
    resave: true,
    saveUninitialized: true,
}))


app.use(express.static(__dirname+"/public"))

app.engine("handlebars",handlebars.engine())
app.set("views", __dirname+"/views")
app.set("view engine","handlebars")

app.use(routerApp)

connectToDB()

initializatePassword()
app.use(passport.initialize())
app.use(passport.session())

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