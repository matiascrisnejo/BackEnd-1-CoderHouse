// import 'dotenv/config.js';
// import assert from 'assert';

// import dbConnect from '../../src/helpers/dbConnect.helper.js';
// import { productsManager } from '../../src/dao/managers/mongo.manager.js';

// describe(
//     "TESTING: Servicio de Productos",
//     ()=>{
//         let productId
//         before(async()=> {
//             await dbConnect(process.env.LINK_DB)
//             }
//         )
//         it(
//             "Se debe crear un producto",
//             async()=> {
//                 const response = await productsManager.createOne({title: "producto de pruebaa"})
//                 productId = response._id
//                 assert.ok(response._id)
//             }
//         )
//         it(
//             "No debe crear un producto sin datos completos",
//             async()=>{
//                 try {
//                     await productsManager.createOne({})
//                 } catch (error) {
//                     assert.ok(error.message)
//                 }
//             }
//         )
//         it(
//             "Se debe crear un producto con el stock proporcionado",
//             async()=> {
//                 const response = await productsManager.createOne({title: "producto de prueba"})
//                 assert.ok(response.stock)
//             }
//         )
//         it(
//             "Se debe crear un producto con el stock de tipo numerico",
//             async()=> {
//                 const response = await productsManager.createOne({title: "producto de prueba"})
//                 assert.ok(typeof response.stock === "number")
//             }
//         )
//         it(
//             "Se debe crear un producto con el precio proporcionado",
//             async()=> {
//                 const response = await productsManager.createOne({title: "producto de prueba"})
//                 assert.ok(response.price)
//             }
//         )
//         it(
//             "Se debe crear un producto con el precio de tipo numerico",
//             async()=> {
//                 const response = await productsManager.createOne({title: "producto de prueba"})
//                 assert.ok(typeof response.price === "number")
//             }
//         )
//         it(
//             "Se debe crear un producto con la oferta indicado",
//             async()=> {
//                 const response = await productsManager.createOne({title: "producto de prueba"})
//                 assert.ok(response.onsale === false)
//             }
//         )
//         it(
//             "Se debe crear un producto con la oferta de tipo booleano",
//             async()=> {
//                 const response = await productsManager.createOne({title: "producto de prueba"})
//                 assert.ok(typeof response.onsale === "boolean")
//             }
//         )
//         it(
//             "Se debe leer todos los productos de la base de datos",
//             async()=>{
//                 const response = await productsManager.readAll()
//                 assert.ok(response.length > 0)
//             }
//         )
//         it(
//             "No se debe leer todos los productos de la base de datos cuando mando un filtro inexistente",
//             async()=>{
//                 const response = await productsManager.readAll({title: "hajhhhaaJJJ"})
//                 assert.ok(response.length === 0)
//             }
//         )
//         it(
//             "Se deben leer un producto de la base de datos por su id",
//             async()=>{
//                 const response = await productsManager.readById(productId)
//                 assert.ok(response._id)
//             }
//         )
//         it(
//             "Se debe modificar un producto de la base de datos",
//             async()=>{
//                 const response = await productsManager.updateById(productId, {stock: 1000})
//                 assert.strictEqual(response.stock,1000)
//             }
//         )
//         it(
//             "Se debe eliminar un producto de la base de datos",
//             async()=>{
//                 const response = await productsManager.destroyById(productId)
//                 const one = await productsManager.readById(productId)
//                 assert.ok(one === null)
//             }
//         )
//     }
// )