import { connect } from "mongoose";
import logger from "./logger.helper.js";

const dbConnect = async (url) => {
    try {
        await connect(url)
        //console.log("connected to mongo database");
        logger.INFO("connected to mongo database");
        
    } catch (error) {
        //console.log(error.message);
        logger.ERROR(error.message);
        
    }
}

export default dbConnect