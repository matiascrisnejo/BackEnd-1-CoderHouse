// import 'dotenv/config.js';
// import assert from 'assert';

// import dbConnect from '../../src/helpers/dbConnect.helper.js';
// import { usersManager } from '../../src/dao/managers/mongo.manager.js';

// describe(
//     "TESTING: Servicio de Usuarios",
//     ()=>{
//         let userId
//         before(async()=> {
//             await dbConnect(process.env.LINK_DB)
//         })
//         it(
//             "Se debe crear un usuario",
//             async()=>{
//                 const response = await usersManager.createOne({email: "matt@coder.com", password: "hola1234"})
//                 userId = response._id;
//                 assert.ok(response._id) 
//             }
//         )
//         it(
//             "Se debe leer todos los usuarios de la base de datos",
//             async()=>{
//                 const response = await usersManager.readAll()
//                 assert.ok(response.length > 0)
//             }
//         )
//         it(
//             "Se debe leer un usuario de la base de datos por Id",
//             async()=>{
//                 const response = await usersManager.readById(userId)
//                 assert.ok(response._id.toString() === userId.toString())
//             }
//         )
//         it("Se debe modificar un usuario de la base de datos por Id", 
//             async () => {
//                 const response = await usersManager.updateOne(
//                     userId, 
//                     { name: "Matt" }
//                 )
//                 assert.strictEqual(response.name, "Matt");
//             }
//         )
//         it("Se debe eliminar un usuario de la base de datos por Id", 
//             async () => {
//                 const response = await usersManager.destroyById(userId)
//                 const one = await usersManager.readById(userId)
//                 assert.ok(one === null)
//             }
//         )
//     }
// )