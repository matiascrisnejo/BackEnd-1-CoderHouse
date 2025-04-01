import 'dotenv/config'
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

import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'

import passport from "passport"
import initializatePassword from "./Dao/config/passport.js"
import path from "path"



const app = express()
const PORT = 8080

app.use(express.json())
app.use(cookieParser(process.env.SECRET_COOKIE))
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        ttl: 60
    }),
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
}))


//app.use(express.static(__dirname+"/public"))
app.use(express.static(path.join(__dirname, 'public')));

// Obtener el directorio raíz del proyecto
const viewsPath = path.join(__dirname, 'views');

app.engine("handlebars",handlebars.engine())
app.set("views", viewsPath);
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