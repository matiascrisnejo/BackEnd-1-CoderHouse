import userModel from "../models/users.models.js";

export const login = async (req,res) => {
    try { 
        const {email, password} = req.body

        const user = await userModel.findOne({email:email})
        console.log(user)
        console.log(password);
        
        if(user && (password == user.password)) {
            req.session.email = user.email
            req.session.rol = user.rol
            req.session.first_name = user.first_name
            req.session.last_name = user.last_name
            req.session.age = user.age
            return res.status(200).send("Usuario logueado correctamente")
        } else {
            return res.status(400).send("Usuario o contraseña incorrectos")
        }

    } catch (e) {
        return res.status(500).send(e)
    }
    
}

export const register = async (req,res) => {
    try {
        const {first_name, last_name, email, password, age} = req.body
        await userModel.create({first_name, last_name, email, password, age})
        res.status(201).send(`Usuario registrado correctamente`)
    } catch (e) {
        res.status(500).send(e)
    }
}