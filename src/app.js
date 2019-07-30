const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicFolderPath = path.join(__dirname, '../public')
const viewsFolder = path.join(__dirname, '../templates/views')
const partialFolder = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsFolder)           // skip line if using default "views" folder name
hbs.registerPartials(partialFolder)

// setup static asset folder for express
app.use(express.static(publicFolderPath))

//send different response on different routes
app.get('', (req, res) => {
    res.render('index', {           // name of hbs file as first argument
        title: 'Weather App',
        name: 'Nabeel Imran'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Nabeel Imran'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a cool help message',
        name: 'Nabeel Imran'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'please provide an address to search'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} = {}) => { // default destructuring object to avoid error
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Sorry! that help topic is not currently available.',
        name: 'Nabeel Imran'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page not found!',
        msg: 'This page does not exit.',
        name: 'Nabeel Imran'
    })
})

app.listen(port, () => {
    console.log(`app started on port ${port}`)
})