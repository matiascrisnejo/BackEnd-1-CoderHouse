import { productsModel } from "../../models/products.model.js";

export default class ProductManager{
    async getProducts(page, limit, sortOrder, category){

        try {
            const options = {
                page: page || 1,
                limit: limit || 10,
                sort: sortOrder ? {price: sortOrder === 'asc' ? 1 : -1} : null,
                lean: true
            }
            const query = category ? {category: category} : {}
            const result = await productsModel.paginate(query, options)

            const response = {
                status: "success",
                payload: result.docs, // Los productos de la página actual
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `/products?page=${result.prevPage}&limit=${limit}&sortOrder=${sortOrder}&category=${category}` : null,
                nextLink: result.hasNextPage ? `/products?page=${result.nextPage}&limit=${limit}&sortOrder=${sortOrder}&category=${category}` : null
            };

            return response
        } catch (error) {
            console.error("error al mostrar productos",error)
            return { 
                status: "error", 
                message: "Hubo un problema al obtener los productos.", 
                error: error.message
            }
        }
    }
     async getProductsView(){
         try {
             return await productsModel.find().lean();

         } catch (err) {
             return err
         }
    }

    async getProductById(id){
        try {
            return await productsModel.findById(id)
        } catch (err) {
            return {error: err.message}
        }
    }

    async addProducts(product){
        try {
            await productsModel.create(product)
            return await productsModel.findOne({ title: product.title })
        } catch (error) {
            return error
        }
    }

    async updateProduct(id, product){
        try {
            return await productsModel.findByIdAndUpdate(id, { $set: product})
        } catch (error) {
            return error
        }
    }
    
    async deleteProduct(id){
        try {
            return await productsModel.findByIdAndDelete(id)
        } catch (error) {
            return error
        }
    }
}