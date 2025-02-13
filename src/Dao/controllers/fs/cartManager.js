import fs from "fs"

export default class CartManager{
    constructor(path){
        this.path=path,
     this.carts=[]
    }
    //READ
    async loadCarts(){
    try {
      if(fs.existsSync(this.path)){
        const data= await fs.promises.readFile(this.path,"utf-8")
        this.carts = JSON.parse(data || "[]")
      } else{
        this.carts=[]
      }
    } catch (error) {
      console.error("error al leer el archivo carrito:", error);
      this.carts=[]
    }
  }

    async saveCarts() {
      try {
          await fs.promises.writeFile(this.path, JSON.stringify(this.carts, null, 2));
      } catch (error) {
          console.error("Error al guardar en el archivo de carritos:", error);
          throw error;
      }
    }

    async getCarts() {
      await this.loadCarts();
      return this.carts;
  }
    

    async getCartById(cid) {
      await this.loadCarts();
      const cart = this.carts.find(cart => cart.id === parseInt(cid));
      return cart || "Carrito no encontrado";
    }

    //GENERATE ID 
    async generateCartId() {
      await this.loadCarts();
      return this.carts.length > 0 ? this.carts[this.carts.length - 1].id + 1 : 1;
    }

    async addCart() {
        await this.loadCarts();
        const id = await this.generateCartId();
        const newCart = { id, products: [] };
        this.carts.push(newCart);
        await this.saveCarts();
        return newCart;
    }
    

    async addProductToCart(cid, pid) {
      await this.loadCarts();
      const cart = this.carts.find(cart => cart.id === parseInt(cid));
      if (!cart) {
          throw new Error("Carrito no encontrado");
      }

      const productIndex = cart.products.findIndex(p => p.pid === pid);
      if (productIndex !== -1) {
          // Si el producto ya existe en el carrito, incrementar la cantidad
          cart.products[productIndex].quantity++;
      } else {
          // Si el producto no existe en el carrito, agregarlo
          cart.products.push({ pid, quantity: 1 });
      }

      await this.saveCarts();
      return cart;
    }
      
}