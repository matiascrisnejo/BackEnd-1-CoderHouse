import jwt from 'jsonwebtoken'

let secretKey = 'coder1234'
export const generateToken = (user) => {
    const token = jwt.sign({
        first_name: user.first_name,
        last_name: user.last_name,
        rol: user.rol
    }, secretKey, {expiresIn: '24h'})
    return token
}
