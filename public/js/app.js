const form = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    message1.textContent = 'Loading...'
    message2.textContent = ''
    fetch(`/weather?address=${encodeURIComponent(search.value)}`)
    .then( (response) => {
        response.json()
        .then( (data) => {
            if (data.error) {
                message1.textContent = data.error
                message2.textContent = ''
            } else {
                message1.textContent = data.location
                message2.textContent = data.forecast
            }
        })
    })
})