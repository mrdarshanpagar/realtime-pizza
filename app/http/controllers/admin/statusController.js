const Order = require('../../../models/order')

function statusController(){
    return {

        update: async function(req, res){
            const {orderId, status} = req.body
            try{
                await Order.updateOne({_id: orderId}, {status: status})
                // Emit event
                // const eventEmitter = req.app.get('eventEmitter')
                // eventEmitter.emit('orderUpdated', {id: orderId, status: status})

                res.redirect('/admin/orders')
            }catch(error){
                req.flash('updateError', 'Something went wrong, try again')
                res.redirect('/admin/orders')
            }
        }
    }
}

module.exports = statusController