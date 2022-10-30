const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
const { session } = require('passport')
const saltRounds = 10

function authController(){

    const _getRedirectUrl = req =>{
        return req.user.role === 'admin' ? '/admin/orders' : '/customers/orders'
    }

    return {
        
        login: function(req, res){
            res.render('auth/login.ejs')

        },

        register: function(req, res){
            res.render('auth/register.ejs')
        },

        postRegister: async function(req, res){
            const {name, email, password} = req.body

            // Validate request
            if( !name || !email || !password ){
                req.flash('error', 'All fields are required*')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }

            // Hash Password
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Check if email already exists
            const findUser = await User.findOne({email})
            if(findUser){
                req.flash("error", "Email already exists !")
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect("/register")
            }

            // Create a user
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })
            
            // Save new user
            
            
            user.save().then((user)=>{
                // LogIn user
                res.redirect('/login')

            }).catch(error => {
                req.flash('error', 'Something went wrong')
                res.redirect('/register')
            })
    
        },

        postLogin: passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            badRequestMessage: 'Missing credentials', // if fields are empty default message from passport
            failureFlash: true,
        }),

        logout: function(req, res, next){
            req.logout()
            res.redirect('/login')
        }
    

    }
}

module.exports = authController