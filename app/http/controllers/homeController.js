const Menu = require('../../models/menu')

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
        }

    }
}

module.exports = homeController