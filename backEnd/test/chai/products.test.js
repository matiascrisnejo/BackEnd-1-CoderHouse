import "dotenv/config.js";
import {expect} from "chai";

import dbConnect from '../../src/helpers/dbConnect.helper.js';
import { productsManager } from '../../src/dao/managers/mongo.manager.js';

describe(
    "TESTING: Servicio de Productos",
    ()=>{
        let productId
        before(async()=> await dbConnect(process.env.LINK_DB))
        it(
            "Se debe crear un producto",
            async()=> {
                const response = await productsManager.createOne({title: "producto de prueba"})
                productId = response._id
                expect(response).to.have.property('_id');
            }
        )
        it(
           "No debe crear un producto sin datos completos",
            async()=>{
                try {
                    await productsManager.createOne({})
                } catch (error) {
                    expect(error).to.have.property('message');
                }
            }
        )
        it(
            "Se debe crear un producto con el stock proporcionado",
            async()=> {
                const response = await productsManager.createOne({title: "producto de prueba"})
                 expect(response).to.have.property("stock");
               
            }
        )
        it(
            "Se debe crear un producto con el stock de tipo numerico",
            async()=> {
                const response = await productsManager.createOne({title: "producto de prueba"})
                expect(response.stock).to.be.a("number");
             
            }
        )
        it(
            "Se debe crear un producto con el precio proporcionado",
            async()=> {
                const response = await productsManager.createOne({title: "producto de prueba"})
                 expect(response).to.have.property("price");
            }
        )
        it(
            "Se debe crear un producto con el precio proporcionado",
            async()=> {
                const response = await productsManager.createOne({title: "producto de prueba"})
                 expect(response.price).to.be.a("number");
            }
        )
        it(
            "Se debe crear un producto con el precio de tipo numerico",
            async()=> {
                const response = await productsManager.createOne({title: "producto de prueba"})
                 expect(response.price).to.be.a("number");
            }
        )
        it(
            "Se debe crear un producto con la oferta indicado",
            async()=> {
                const response = await productsManager.createOne({title: "producto de prueba"})
                 expect(response).to.have.property("onsale");
            }
        )
        it(
             "Se debe crear un producto con la oferta de tipo booleano",
            async()=> {
                const response = await productsManager.createOne({title: "producto de prueba"})
                 expect(response.onsale).to.be.a("boolean");
            }
        )
        it(
            "Se deben leer todos los productos",
            async()=>{
                const response = await productsManager.readAll()
                expect(Array.isArray(response)).to.be.true;
            }
        )
        it(
            "No se debe leer todos los productos de la base de datos cuando mando un filtro inexistente",
            async()=>{
                const response = await productsManager.readAll({title: "hahahhaaJJJ"})
                expect(response).to.have.lengthOf(0);
            }
        )
        it(
            "Se deben leer un producto de la base de datos por su id",
            async()=>{
                const response = await productsManager.readById(productId)
                expect(response._id.toString()).to.be.equals(productId.toString());
            }
        )
        it(
            "Se debe modificar un producto de la base de datos",
            async()=>{
                const response = await productsManager.updateById(productId, {stock: 1000})
                expect(response.stock).to.be.equals(1000);
            }
        )
        it("Se debe eliminar un producto de la base de datos",
            async()=>{
                const response = await productsManager.destroyById(productId)
                const one = await productsManager.readById(productId)
                expect(one).to.be.a("null");
            }
        )
    }
)