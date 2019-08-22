const socket = io()

// socket.on('countUpdated', (count) => {
//     console.log('The count has been updated!')
//     console.log(count)

// })

// document.querySelector('#increment').addEventListener('click', () => {
//     console.log('Clicked the button!')
//     socket.emit('increment')
// })

socket.on('newUser',(mssg) => {
    console.log(mssg)
})

document.querySelector('#message-form').addEventListener('submit',(e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
    socket.emit('sendMessage',message)
})

socket.on('showMessage', (message) => {
    console.log(message)
})
