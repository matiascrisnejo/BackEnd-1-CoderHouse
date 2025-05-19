import errors from "../helpers/errors/errors.js";
const errorHandler = (err, req, res, next) => {
    // solo este log se puede para ver la linea
    console.log(err);
    const {method, originalUrl: url} = req
    const error = err.message || errors.fatal.message
    const statusCode = err.statusCode || errors.fatal.statusCode
    res.status(statusCode).json({
        error,
        method,
        url
    })
}
export default errorHandler