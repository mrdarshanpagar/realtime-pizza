const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const AdminOrderController = require('../app/http/controllers/admin/orderController')
const statusController = require('../app/http/controllers/admin/statusController')

const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const adminAuth = require('../app/http/middleware/adminAuth')
const fileUploader = require('../app/http/middleware/fileUploader')



function initRoutes(app){

    // Customer routes

    app.get('/', homeController().index)
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)
    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
    app.delete('/delete-cart', cartController().delete)
    app.post('/orders', auth, orderController().storeOrder)
    app.get('/customers/orders', auth, orderController().index)
    app.get('/customers/orders/:id', auth, orderController().showStatus)


    // Admin routes

    app.get('/admin/orders', adminAuth, AdminOrderController().index)
    // Admin - order status controller
    app.post('/admin/order/status', adminAuth, statusController().update)
    // Admin - delete item from menu
    app.delete('/admin/delete-menu-item/:id', adminAuth, homeController().delete)
    // Admin - add new food item page
    app.get('/admin/create-menu', adminAuth, homeController().addItemPage)
    // Admin - Post new menu item
    app.post('/admin/create-menu/add', adminAuth, fileUploader.single('picture'), homeController().postMenu)
    // Admin - Edit menu item page
    app.get('/admin/edit-menu-item/:id', adminAuth, homeController().editItemPage)
    // Admin - PUT menu item
    app.put('/admin/edit-menu-item/:id', adminAuth, fileUploader.single('picture'), homeController().putMenu)



}

module.exports = initRoutes