

function cartController(){

    return {
        
        index: function(req, res){
            res.render('customers/cart.ejs')
        },

    }
}

module.exports = cartController