const Menu = require('../../models/menu')

function homeController(){

    return {
        
        index: async function(req, res){
            const menus = await Menu.find()
            res.render('home.ejs', {menus: menus})
        },

    }
}

module.exports = homeController