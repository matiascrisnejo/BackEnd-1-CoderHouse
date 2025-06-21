import "dotenv/config.js"
    import {expect} from "chai"
    import supertest from "supertest"


    const requester = supertest(`http://localhost:${process.env.PORT}/api`) 

    describe(
        "TESTING: Servicio de usuarios ",
        ()=>{
            const admin = {
                name: "Matias",
                email: "matiii@coder.com",
                password: "hola1234",
                avatar: "https://example.com/avatar.png",
                role: "ADMIN",
            };
            let userId
            let cookies
            before(async () => {
                // //registrar un usuario administrador
                // const registerResponse = await requester
                //     .post("/auth/register")
                //     .send(admin);
                // console.log("Respuesta de registro:", registerResponse.body);
                // expect(registerResponse.status).to.be.equals(201);
                // Iniciar sesión para obtener cookies
                const loginResponse = await requester
                    .post("/auth/login")
                    .send(admin);
                //console.log("Respuesta de login:", loginResponse.body);
                cookies = loginResponse.headers["set-cookie"];
                //expect(loginResponse.status).to.be.equals(200);
            })          
            it(
                "POST /api/users Se debe crear un usuario",
                async()=>{ 
                    const data = {
                        email: "mat@coder.com",
                        password:"hola 1234"
                    }
                    const response = await requester.post("/users").send(data).set('Cookie', cookies)
                    const {status} = response
                    const body = response.body
                    expect(status).to.be.equals(201)
                    userId = body.response?.response?._id;
                    expect(userId).to.exist
                }
            )
            it(
                "GET /api/users Se debe obtener todos los usuarios",
                async()=>{ 
                    const response = await requester.get("/users").set('Cookie', cookies)
                    const {status} = response
                    const body = response.body
                    expect(status).to.be.equals(200)
                    expect(body.response).to.be.an("array")
                }       
            )
            it(
                "GET /api/users/:uid Se debe obtener un usuario por su id",
                async()=>{ 
                    const response = await requester.get(`/users/${userId}`).set('Cookie', cookies)
                    const {status} = response
                    const body = response.body
                    expect(status).to.be.equals(200)
                    expect(body.response).to.be.an("object")
                    expect(body.response._id).to.be.equals(userId)
                    expect(body.response).to.have.property("_id")
                }       
            )
            it(
                "PUT /api/users/:uid Se debe actualizar un usuario existente",
                async() => {
                    const data = {
                        name: "mati"
                    }
                    const response = await requester.put(`/users/${userId}`).send(data).set('Cookie', cookies)
                    const {status} = response
                    const body = response.body
                    expect(status).to.be.equals(200)
                    expect(body.response?.name).to.be.equal(data.name)
                }
            )
            it(
                "DELETE /api/users/:uid Se debe eliminar un usuario por su id",
                async()=>{ 
                    const response = await requester.delete(`/users/${userId}`).set('Cookie', cookies)
                    const {status} = response
                    const body = response.body
                    expect(status).to.be.equals(200)
                }       
            )
        }
    )
