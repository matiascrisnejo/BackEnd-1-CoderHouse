import "dotenv/config.js"
import {expect} from "chai"
import supertest from "supertest"


const requester = supertest(`http://localhost:${process.env.PORT}/api`) 

describe(
    "TESTING: Rutas de Autenticación",
    ()=>{
        const admin = {
            email: "mati@coder.com",
            password: "hola1234"
        }
        let cookies;
        let userId;
        it(
            "POST /api/auth/register error 401 al registrar un usuario ya registrado",
            async()=>{
                const response = await requester.post("/auth/register").send(admin)
                const {status, _body} = response
                expect(status).to.be.equals(401)
                expect(_body.error).to.be.equals("Invalid credentials")
            }
        )
        it(
            "POST /api/auth/register crea un usuario no registrado",
            async()=>{
                const data = {
                    email: "matjii@coder.com",
                    password: "hola1234"
                }
                const response = await requester.post("/auth/register").send(data)
                const {status, _body} = response
                userId = _body.response._id
                expect(status).to.be.equals(201)
            }
        )
        it(
            "POST /api/auth/login exito al iniciar sesión",
            async()=>{
                const response = await requester.post("/auth/login").send(admin)
                const {status, _body, headers} = response
                cookies = headers['set-cookie']
                expect(status).to.be.equals(200)
                expect(_body.response).to.be.equals("Logged in")
            }
        )
        it(
            "POST /api/auth/online",
            async()=>{
                const response = await requester.post("/auth/online").set('Cookie', cookies)
                const {status, _body} = response
                expect(status).to.be.equals(200)
                expect(_body.response).to.be.equals("It's online")
            }
        )
        it(
            "PUT /api/users/:uid tiene exito al actualizar un usuario",
            async()=>{
                const response = await requester.put("/users/"+userId).set('Cookie', cookies).send({name: "Matias"})
                const {status} = response
                expect(status).to.be.equals(200)
            }
            
        )
        it(
            "DELETE /api/users/:uid tiene exito el destroy",
            async()=>{
                const response = await requester.delete("/users/"+userId).set('Cookie', cookies)
                const {status} = response
                expect(status).to.be.equals(200)
            }
        )
        it(
            "POST /api/auth/signout",
            async()=>{
                const response = await requester.post("/auth/signout").set('Cookie', cookies)
                const {status} = response
                expect(status).to.be.equals(200)
            }
        )
    }
)