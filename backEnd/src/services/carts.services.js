import { cartsManager } from "../dao/managers/mongo.manager.js";
class CartsService {
  addProductToCart = async (data) => await cartsManager.createOne(data);
  readProductsFromUser = async (data) => await cartsManager.read(data);
  updateCart = async (cart_id, data) => await cartsManager.updateById(cart_id, data, { new: true });
  removeProductFromCart = async (cart_id) => await cartsManager.destroyById(cart_id);
}

const cartsService = new CartsService();
export default cartsService;