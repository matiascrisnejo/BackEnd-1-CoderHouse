    import "dotenv/config.js"
    import {expect} from "chai"
    import supertest from "supertest"


    const requester = supertest(`http://localhost:${process.env.PORT}/api`) 

    describe(
        "TESTING: Servicio de productos ",
        ()=>{
            const admin = {
                name: "Matias",
                email: "matiii@coder.com",
                password: "hola1234",
                avatar: "https://example.com/avatar.png",
                role: "ADMIN",
            };
            let productId
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
                "POST /api/products error 401 al crear un producto",
                async()=>{ 
                    const data = {
                        title: "producto de prueba9"
                    }
                    const response = await requester.post("/products").send(data)
                    //console.log("respuesta del servidor", response.body)
                    const {status, _body} = response
                    expect(status).to.be.equals(401)
                    expect(_body.error).to.be.equals('jwt must be provided')
                }
            )
            it(
                "POST /api/products Se debe crear un producto",
                async()=>{ 
                    const data = {
                        title: "producto de prueba9"
                    }
                    const response = await requester.post("/products").send(data).set('Cookie', cookies)
                    //console.log("respuesta del servidor", response.body)
                    //const {status, body} = response
                    const {status} = response
                    const body = response.body
                    expect(status).to.be.equals(201)
                     productId = body.response?.response?._id;
                    expect(productId).to.exist;
                }
            )
            it(
                "GET /api/products Se deben obtener todos los productos",
                async()=>{
                    const response = await requester.get("/products").set('Cookie', cookies)
                    //const {status, _body} = response
                    const {status} = response
                    const body = response.body
                    expect(status).to.be.equals(200)
                    expect(body.response).to.be.an('array')
                }
            )
            it(
                "GET /api/products/:pid Se debe obtener un producto por id",
                async()=>{
                    const response = await requester.get("/products/"+productId).set('Cookie', cookies)
                    //const {status, _body} = response
                    const {status} = response
                    const body = response.body
                    expect(status).to.be.equals(200)
                    expect(body.response).to.be.an('object')
                }
            )
            it(
                "PUT /api/products/:pid Se debe actualizar un producto",
                async()=>{
                    const data = {
                        title: "producto actualizado"
                    }
                    const response = await requester.put("/products/"+productId).send(data).set('Cookie', cookies)
                    //const {status, _body} = response
                    const {status} = response
                    const body = response.body
                    //expect(status).to.be.equals(200)
                    expect(body.response?.title).to.be.equals(data.title);
                }
            )
            it("DELETE /api/products/:pid Se debe eliminar un producto",
                async()=>{
                    const response = await requester.delete("/products/"+productId).set('Cookie', cookies)
                    //const {status, _body} = response
                    const {status} = response
                    const body = response.body
                    expect(status).to.be.equals(200)
                }   

            )
        }
)