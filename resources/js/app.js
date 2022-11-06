import axios from 'axios'
import Noty from "noty";
import initAdmin from './admin'
import moment from 'moment'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cart-counter')
let deleteFromCart = document.querySelectorAll('.delete-from-cart')

function updateCart(data){
    axios.post('/update-cart', data)
    .then(res => {
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

function deleteCart(data){
    console.log(data)
    axios.delete('/delete-cart', {data: data})
    .then(async (res) => {
        console.log(res)
        cartCounter.innerText = res.data.totalQty

        await window.location.assign('/cart')

        notification()
        
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

function notification(){
    console.log('inside notification')
    return new Noty({
        type: 'success',
        timeout: 2000,
        text: "Item deleted from cart",
        progressBar: false,
        // layout: 'bottomLeft', 
      }).show();
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e)=>{
        let data = JSON.parse(btn.dataset.food)
        updateCart(data)
    })
})

deleteFromCart.forEach((btn) => {
    btn.addEventListener('click', (e)=>{
        e.preventDefault()
        let data = JSON.parse(btn.dataset.food)
        deleteCart(data)
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

// Change order status

let status_line = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order){
    let stepCompleted = true

    status_line.forEach(status => {
        let dataProp = status.dataset.status

        if(stepCompleted) status.classList.add('step-completed')
        if(dataProp === order.status){
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
        }
    })
}

updateStatus(order)

// Socket
// let socket = io()

// // Join
// if(order){
//     socket.emit('join', `order_${order._id}`)
// }

// socket.on('orderUpdated', (data)=>{
//     const updatedOrder = {...order}
//     updatedOrder.updatedAt = moment().format()
//     updatedOrder.status = data.status
//     updateStatus(updatedOrder)
//     new Noty({
//         type: 'success',
//         timeout: 1000,
//         text: 'Order updated',
//         progressBar: false,
//     }).show();
// })