import axios from 'axios'
import Noty from "noty";
import initAdmin from './admin'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cart-counter')

function updateCart(data){
    axios.post('/update-cart', data)
    .then(res => {
        console.log(res)
        cartCounter.innerText = res.data.totalQty

        new Noty({
            type: 'success',
            timeout: 1000,
            text: "Item added to cart",
            progressBar: false,
            // layout: 'bottomLeft', 
          }).show();
          
    })
    .catch(error => {

        new Noty({
            type: 'error',
            timeout: 1500,
            text: "Something went wrong",
            progressBar: false,
            // layout: 'bottomLeft', 
          }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e)=>{
        let data = JSON.parse(btn.dataset.food)
        updateCart(data)
    })
})

// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    }, 2000)
}

if(window.location.pathname == '/admin/orders'){
    initAdmin()
}