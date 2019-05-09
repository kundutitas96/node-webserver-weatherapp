const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/8d4bd7f3a9b5198f6044f4dcd8144b06/' + latitude +',' + longitude + '?units=si'

  request({ url, json: true }, (error, { body }) => {
    if(error){
      callback('Unable to connect to forecast services', undefined)
    } else if(body.error) {
      callback('Unable to find forecast. Try another location', undefined)
    } else {
      callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature +
    ' degrees out. Todays highest temperature is '+ body.daily.data[0].temperatureMax +
    ' with lowest temperature of '+ body.daily.data[0].temperatureMin +' There is a ' +
    body.currently.precipProbability + '% chance of rain')
    }
  })
}

module.exports = forecast
