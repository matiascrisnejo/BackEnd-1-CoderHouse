import './src/helpers/env.js'
import express from 'express'
import cookieParser from 'cookie-parser'
import compression from 'express-compression'
import cluster from 'cluster'
import { cpus } from 'os'
import {serve, setup} from 'swagger-ui-express'
import swaggerSpec from './src/helpers/swagger.helpers.js'
import dbConnect from './src/helpers/dcConnect.helper.js'
import indexRouter from './src/routers/index.router.js'
import winston from './src/middlewares/winston.mid.js'
import errorHandler from './src/middlewares/errorHandler.mid.js'
import pathHandler from './src/middlewares/pathHandler.mid.js'
import argvs from './src/helpers/arguments.helper.js'
import logger from './src/helpers/logger.helper.js'

// server settings
//import 'dotenv/config.js'
const server = express()
const port = process.env.PORT || 8080
const ready = async () => {
    //registro log con winston
    //console.log('server ready on port' + port + 'and mode '+ argvs.mode);
    logger.INFO('server ready on port ' + port + ' and mode ' + argvs.mode);
    logger.INFO('server ready on pid ' + process.pid);
    await dbConnect(process.env.LINK_DB)
}
const isPrimary = cluster.isPrimary
if(isPrimary){
    // estoy en primary y creo los workers
    const numberOfProcesses = cpus().length
    for (let index = 1; index <= numberOfProcesses; index++) {
        cluster.fork()
    }
} else{
    //worker y levanta servidor
    server.listen(port, ready)
}



//middlewars settings
server.use(compression({
    brotli: {
        enabled: true,
        zlib: {}
    }
}))
server.use(cookieParser());
server.use(express.json())
server.use(winston)
server.use(express.urlencoded({extended: true}))
server.use(express.static('public'))
server.use("/api/docs",serve, setup(swaggerSpec))


//router settings
server.use('/', indexRouter)
server.use(errorHandler)
server.use(pathHandler)

