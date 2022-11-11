const Menu = require('../../models/menu')
const multer = require('multer')
const upload = multer({ dest: '../../../public/img' })

function homeController(){

    return {
        
        index: async function(req, res){
            const menus = await Menu.find()
            res.render('home.ejs', {menus: menus})
        },

        delete: async function(req, res){
            try{
                await Menu.deleteOne({_id: req.params.id})
                res.redirect('/')
            }catch(error){
                req.flash('error', 'Something went wrong')
                res.redirect('/cart')
            }
        },

        addItemPage: function(req, res){
            res.render('admin/newItem')
        },

        postMenu: async function(req, res){
            console.log(req.body)
            console.log(req.file)

            const {name, price, size} = req.body;

            try{
                const newMenu = new Menu({
                    name: name,
                    image: req.file.filename,
                    price: price,
                    size: size
                })

                await newMenu.save();
                res.redirect('/')

            }catch(error){
                req.flash('error', 'Something went wrong')
                req.flash('name', name)
                req.flash('price', price)
                res.redirect('/admin/create-menu')
            }

        },

        editItemPage: async function(req, res){
            const item = await Menu.findById(req.params.id)
            res.render('admin/editItem', {item: item})
        },

        putMenu: async function(req, res){

            const {name, price, size} = req.body;
            const item = await Menu.findById(req.params.id)
            item.name = name
            item.image = req.file.filename
            item.price = price
            item.size = size

            try{
                await item.save()
                res.redirect('/')

            }catch(error){
                console.log(error.message)
                req.flash('error', 'Something went wrong')
                res.redirect('/admin/editItem', {item: item})
            }
        }

    }
}

module.exports = homeController