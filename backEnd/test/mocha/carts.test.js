import 'dotenv/config.js';
import assert from 'assert';

import dbConnect from '../../src/helpers/dbConnect.helper.js';
import { cartsManager } from '../../src/dao/managers/mongo.manager.js'; 
import { usersManager } from '../../src/dao/managers/mongo.manager.js';
import { productsManager } from '../../src/dao/managers/mongo.manager.js';

describe(
    "TESTING: Servicio de Carritos",
    ()=>{
        let cartId
        let productId
        let userId
        before(async()=> {
            await dbConnect(process.env.LINK_DB)
            //Usuario de prueba
            const user = await usersManager.createOne({
                name: "marko twwqq",
                email: "markoweqwe@coder.com",
                password: "hola1234",
                avatar: "https://example.com/avatar.png",
                role: "ADMIN",
            });
            userId = user._id;
            // Crea un producto
            const product = await productsManager.createOne({
                title: "mouse",
                description: "Descripción del mouse",
                category: "Laptops",
                price: 100,
                stock: 10,
            });
            productId = product._id;

            }
        )
        it(
            "Se debe crear un carrito",
            async()=> {
                const response = await cartsManager.createOne({user_id: userId, product_id: productId})
                cartId = response._id
                assert.ok(response._id)
            }
        )
        it(
            "Se debe leer todos los carritos de la base de datos",
            async()=>{
                const response = await cartsManager.readAll()
                assert.ok(response.length > 0)
            }
        )
        it("Se debe modificar un carrito de la base de datos", 
            async () => {
                const response = await cartsManager.updateOne(
                    cartId, 
                    { quantity: 5 }
                )
                assert.strictEqual(response.quantity, 5);
            }
        )
        it(
            "Se debe eliminar un carrito de la base de datos",
            async()=>{
                const response = await cartsManager.destroyById(cartId)
                const one = await cartsManager.readById(cartId)
                assert.ok(one === null)
            }
        )        
    }
)