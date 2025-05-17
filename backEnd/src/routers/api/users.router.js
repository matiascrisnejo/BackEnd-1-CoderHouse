import CustomRouter from "../../helpers/CustomRouter.helpers.js"
import { usersController} from "../../controllers/controllers.js"



class UserRouter extends CustomRouter{
    constructor(){
        super()
        this.init()
    }
    init(){
        this.create('/', ['PUBLIC'], usersController.createOne)
        this.read('/', ['ADMIN'], usersController.readAll)
        this.read('/:id', ['USER', 'ADMIN'], usersController.readById)
        this.update('/:id', ['USER', 'ADMIN'], usersController.updateById)
        this.destroy('/:id', ['USER', 'ADMIN'], usersController.destroyById)
    }
}
const usersRouter = new UserRouter().getRouter()
export default usersRouter