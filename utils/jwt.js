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

console.log(generateToken({"_id":{"$oid":"67ce385071e39b128b1a37d4"},"first_name":"matias","last_name":" ","email":"matias.crisnejo@estudiantes.unahur.edu.ar","password":"$2b$06$2HzuG/EK25y1LHBBonCNkezwW7NCJcYtlJQXQ4qSr.fOh51bP5bfG","age":{"$numberInt":"18"},"rol":"Usuario","__v":{"$numberInt":"0"}}));
