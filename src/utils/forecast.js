const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/14e2f73d2df916cf6209e363c0659b2f/${latitude},${longitude}?exclude=minutely,hourly,alerts,flags&lang=en&units=si`

    request({url, json: true}, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if(body.error) {
            callback('Unable to find specified location, try another one', undefined)
        } else {
            callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. there is ${body.currently.precipProbability}% chance of rain`)
        }
    })
}

module.exports = forecast