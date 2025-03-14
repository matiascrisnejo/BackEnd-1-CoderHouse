import fs from 'fs';

export class ProductManager{
    constructor(){
        this.products = []
        this.path = "./db/products.json"
    }

    async getProducts() {
        try {
            const data = await fs.readFile(this.path, "utf8");
            this.products = JSON.parse(data);
            return this.products;
        } catch (error) {
            console.error("Error al leer el archivo", error);
            return [];
        }
    }

    async getProductById(pid) {
        await this.getProducts();  // Asegurarse de que los productos estén cargados
        const productId = this.products.find(product => product.id === pid);
        
        if (productId) {
            return productId;
        } else {
            console.log("Producto no encontrado");
        }
    };

    async addProduct(product) {
        const { title, description, price, thumbnail, code, stock, category, status } = product;

        if (title === "" || description === "" || price === "" || thumbnail === "" || code === "" || stock === "" || category === "" || status === "") {
            throw new Error("Debe completar todos los campos.");
        }

        if (this.products.some((prod) => prod.code === code)) {
            throw new Error("El producto ya existe");
        }

        const newProduct = {
            id: this.products.length + 1, // Generar un ID para el producto
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            status: status,
            category: category,
        };

        this.products.push(newProduct);
        console.log("Producto agregado correctamente.");

        try {
            await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));  // Indentado bonito
            console.log("Producto guardado exitosamente");
            return newProduct;
        } catch (error) {
            console.error("No se guardó el producto", error);
            throw error;
        }
    }

    async updateProduct(id, productUpdate) {
        await this.getProducts();  // Asegurarse de cargar los productos antes de actualizar
        const productId = this.products.find(product => product.id === id);
        
        if (productId) {
            const index = this.products.findIndex(product => product.id === id);
            this.products[index] = { id, ...productUpdate };

            try {
                await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
                console.log("Archivo actualizado con éxito");
            } catch (error) {
                console.error("No se pudo actualizar el archivo", error);
            }
        } else {
            console.log("No se encontró el producto");
        }
    };

    async deleteProduct(id) {
        await this.getProducts();  // Asegurarse de cargar los productos antes de eliminar
        const productId = this.products.find(product => product.id === id);

        if (productId) {
            const index = this.products.findIndex(product => product.id === id);
            this.products.splice(index, 1);

            try {
                await fs.writeFile(this.path, JSON.stringify(this.products, null, 2));
                console.log("El producto se ha borrado con éxito");
            } catch (error) {
                console.error("No se pudo borrar el producto", error);
            }
        } else {
            console.log("No se encontró el producto");
        }
    };

}