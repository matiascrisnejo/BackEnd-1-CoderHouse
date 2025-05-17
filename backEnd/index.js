import './src/helpers/env.js'
import express from 'express'
import dbConnect from './src/helpers/dcConnect.helper.js'
import indexRouter from './src/routers/index.router.js'
import pathHandler from './src/middlewares/pathHandler.mid.js'
import argvs from './src/helpers/arguments.helper.js'
import errorHandler from './src/middlewares/errorHandler.mid.js'
import compression from 'express-compression'
import logger from './src/helpers/logger.helper.js'
import winston from './src/middlewares/winston.mid.js'

// server settings
//import 'dotenv/config.js'
const server = express()
const port = process.env.PORT || 8080
const ready = async () => {
    //registro log con winston
    //console.log('server ready on port' + port + 'and mode '+ argvs.mode);
    logger.INFO('server ready on port ' + port + ' and mode ' + argvs.mode);
    await dbConnect(process.env.LINK_DB)
}

server.listen(port, ready)



//middlewars settings
server.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
}))
server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use(winston)



//router settings
server.use('/', indexRouter)
server.use(errorHandler)
server.use(pathHandler)

