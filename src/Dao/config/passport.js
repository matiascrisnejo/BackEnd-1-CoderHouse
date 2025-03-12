import passport from "passport";
import local from 'passport-local'
import GithubStrategy from 'passport-github2'
import { validatePassword, hashPassword } from "../../../utils/utils.js";
import userModel from "../models/users.models.js";
import jwt from 'passport-jwt';



const localStrategy = local.Strategy;//defino la estrateguia
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt

const cookieExtractor = (req) =>{
    let token = null
    if(req.cookies){
        token = req.cookies['coderSession']
    }
    console.log(token);
    
}

const initializatePassword = () =>{
    passport.use('register', new localStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    }, async (req, username, password, done) =>{
        try {
            const {first_name, last_name, email, password, age} = req.body
            const newUser = await userModel.create({
                first_name: first_name, 
                last_name: last_name, 
                email: email, 
                password: hashPassword(password), 
                age: age
                })
            return done(null, newUser)
        } catch (e) {
            return done(e)
        }
    }))

    passport.use('github', new GithubStrategy({
        clientID:"Iv23lirs3IK0As1r6U4o",
        clientSecret: "cf3ea1af99d0a937df545938ca27da5baec46b25",
        callbackURL: "http://localhost:8080/api/sessions/githubcallback"
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(accessToken);
            console.log(refreshToken);
            console.log(profile);

            let user= await userModel.findOne({email: profile._json.email})
            if(!user){
                user = await userModel.create({
                    first_name: profile._json.name,
                    last_name: " ",
                    email: profile._json.email,
                    password: hashPassword("coder"),
                    age: 18
                })
            }
            
            done(null, user)
                       
        } catch (e) {
            console.log(e);
            done(e)
            
        }
    }))

    passport.use('login', new localStrategy({
        usernameField: 'email'
    }, async (username, password, done) =>{  
        try { 
               
            const user = await userModel.findOne({email:username})
            console.log(user)
            console.log(password);
            
            if(validatePassword(password, user?.password)) {
                return done(null, user)
                
            } else {
                return done(null, false)//no hay error pero no se logueo mi usuario 
            }
        } catch (e) {
            return done(e)
        }
    }))

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: "coder1234"
    }, async (jwt_payload, done) => {
        try {
            console.log(jwt_payload);
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
        
        
    }))

    //pasos necesarios para generar una session y manejarnos via http
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id)
        done(null, user)
    })
}

export default initializatePassword