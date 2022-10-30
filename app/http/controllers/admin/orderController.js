
const Order = require('../../../models/order')

function orderController(){
    return {
        
        index: async function(req, res){

            try{
                const orders = await Order.find(
                    {status: {$ne: 'completed'}}, 
                    null, 
                    {sort: {'createdAt': -1}}
                ).populate('customerId', '-password')

                if(req.xhr){
                    res.json(orders)
                }else{
                    res.render('admin/orders')
                }

            }catch(error){
                req.flash('error', 'Something went wrong')
                res.redirect('/')
            }
        }
    }
}

module.exports = orderController