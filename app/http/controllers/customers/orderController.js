const Order = require('../../../models/order')
const moment = require('moment')

function orderController(){
    return {
        storeOrder: function(req, res){
            
            // Validate request
            const {phone, address} = req.body
            if(!phone || !address){
                req.flash('error', 'All fields are required*')
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                phone: phone,
                address: address
            })

            order.save().then(order =>{
                req.flash('success', 'Order placed successfully')
                
                // Empty the cart
                delete req.session.cart

                res.redirect('/customers/orders')
            })
            .catch(error =>{
                req.flash('error', 'Something went wrong')
                res.redirect('/cart')
            })
        },

        index: async function(req, res){
            try{
                const orders = await Order.find(
                    {customerId: req.user._id}, 
                    null, 
                    {sort: {'createdAt': -1}}
                )

                res.header('Cache-Control', 'no-store')

                res.render('customers/orders', {orders: orders, moment: moment})
            }catch(error){
                req.flash('error', 'Something went wrong')
                res.redirect('/')
            }
        },

        showStatus: async function(req, res){
            // First Authorize user
            /* User should not access the other user's order status by just changing,
               the :id params in browser
            */

            const singleOrder = await Order.findById(req.params.id)  

            if( req.user._id.toString() === singleOrder.customerId.toString()){
                return res.render('customers/singleOrder', {order: singleOrder})
            }else{
                return res.redirect('/')
            }
            
        }
    }
}

module.exports = orderController