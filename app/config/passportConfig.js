const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

function init(passport){
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'} , async (email, password, done)=>{
        // Login logic
        // Check if email exists
        try{
            const user = await User.findOne({email: email})
            if(!user){
                return done(null, false, {message: 'No user with this email'})
            }

            try{
                if(await bcrypt.compare(password, user.password)){
                    return done(null, user, {message: 'Logged in successfully'})
                }else{
                    return done(null,false, {message: "Incorrect username or password"})
                }
            }catch(error){
                return done(error, false, {message: 'Something went wrong'})
            }

        }catch(error){
            return done(error, false, {message: 'Something went wrong'})
        }

        

    }))

    passport.serializeUser((user, done)=>{
        return done(null, user._id)
    })
    
    passport.deserializeUser(async (id, done)=>{

        try{
            const user = await User.findById(id)
            return done(null, user)

        }catch(error){
            return done(error, false, { message: 'User does not exist anymore' })

        }   
        
    })

}

module.exports = init