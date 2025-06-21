import 'dotenv/config.js';
import assert from 'assert';

import dbConnect from '../../src/helpers/dbConnect.helper.js';
import { productsManager, usersManager } from '../../src/dao/managers/mongo.manager.js';
import { login } from '../../src/controllers/auth.controller.js';

describe(
    "TESTING: Servicio de Auth",
    ()=>{
        const admin = {
            email: "mati@coder.com",
            password: "hola1234"
        }
        let cookies;
        let userId;
        before(async()=> {
            await dbConnect(process.env.LINK_DB)
            }
        )
        it(
            "Crear un usuario no registrado",
            async()=>{
                const data = {
                    email: "mati@coder.com",
                    password: "hola1234"
                }
                const user = await usersManager.readBy({email: admin.email})
                if (!user){
                    const response = await usersManager.createOne({
                        name: "Matias",
                        email: admin.email,
                        password: admin.password,
                        avatar: "https://example.com/avatar.png",
                        role: "ADMIN",
                    })
                    userId = response._id
                    assert.ok(response._id, "El usuario debe ser creado correctamente");
                }
            }
        )
        it(
            "Debe fallar al registrar un usuario ya existente",
            async()=>{
                try {
                    await usersManager.createOne({
                        name: "Matias",
                        email: admin.email,
                        password: admin.password,
                        avatar: "https://example.com/avatar.png",
                        role: "ADMIN",
                    })
                } catch (error) {
                    assert.ok(error.message);
                }
            }
        )
    }
)
