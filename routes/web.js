const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const AdminOrderController = require('../app/http/controllers/admin/orderController')
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const adminAuth = require('../app/http/middleware/adminAuth')



function initRoutes(app){
    app.get('/', homeController().index)
    
    app.get('/login', guest, authController().login)

    app.post('/login', authController().postLogin)
    
    app.get('/register', guest, authController().register)

    app.post('/register', authController().postRegister)

    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)

    app.post('/update-cart', cartController().update)

    // Customer routes

    app.post('/orders', auth, orderController().storeOrder)

    app.get('/customers/orders', auth, orderController().index)

    // Admin routes

    app.get('/admin/orders', adminAuth, AdminOrderController().index)



}

module.exports = initRoutes