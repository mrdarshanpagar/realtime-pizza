

function cartController(){

    return {
        
        index: function(req, res){
            res.render('customers/cart.ejs')
        },

        update: function(req, res){
            console.log(req.body)
            // let cart = {
            //     items: {
            //         pizzaId: { item: pizzaObject, qty:0 },
            //         pizzaId: { item: pizzaObject, qty:0 },
            //         pizzaId: { item: pizzaObject, qty:0 },
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }

            // For the first time creating cart and adding object structure
            if(!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0,
                }
            }

            let cart = req.session.cart

            // If food item not in cart
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                } 

                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price

            }else{  // If food item already present in cart
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            
            res.json({totalQty: req.session.cart.totalQty})
        },

        delete: function(req, res){
            let cart = req.session.cart
            cart.totalQty = cart.totalQty  - cart.items[req.body._id].qty
            cart.totalPrice = cart.totalPrice - cart.items[req.body._id].qty * req.body.price
            delete cart.items[req.body._id]
            res.json({totalQty: req.session.cart.totalQty})
        }

    }
}

module.exports = cartController