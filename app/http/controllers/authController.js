
function authController(){

    return {
        
        login: function(req, res){
            res.render('auth/login.ejs')

        },

        register: function(req, res){
            res.render('auth/register.ejs')
        },

    }
}

module.exports = authController