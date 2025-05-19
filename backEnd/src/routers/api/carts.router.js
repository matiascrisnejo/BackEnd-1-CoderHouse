import CustomRouter from "../../helpers/CustomRouter.helpers.js";
import { addProductToCart, readProductsFromUser, updateQuantity, updateState, removeProductFromCart } from "../../controllers/carts.controller.js";

class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER", "ADMIN"], addProductToCart);
    this.read("/", ["USER"], readProductsFromUser);
    this.update("/:cart_id", ["USER", "ADMIN"], updateQuantity);
    this.update("/:cart_id/:state", ["USER", "ADMIN"], updateState);
    this.destroy("/:cart_id", ["USER", "ADMIN"], removeProductFromCart);
  };
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();