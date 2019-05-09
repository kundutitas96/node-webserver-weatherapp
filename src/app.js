const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDirecoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(publicDirecoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
  res.render('index', ({
    title: 'Weather',
    name: 'Titas Kundu'
  }))
})

app.get('/help', (req, res) => {
  res.render('help', ({
    title: 'Help Page',
    helptext: 'this is a helpful text',
    name: 'Titas Kundu'
  }))
})

app.get('/about', (req, res) => {
  res.render('about', ({
    title: 'About Page',
    name: 'Titas Kundu',
    text: 'I am nodejs web developer'
  }))
})

app.get('/weather', (req, res) => {
  if(!req.query.address){
    return res.send({
      error: 'You must provide an address'
    })
  }

  geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
    if(error){
      return res.send({ error })
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
        return res.send({ error })
      }

      res.send({
        address: req.query.address,
        location,
        forecast: forecastData
      })
    })
  })
})

app.get('*', (req, res) => {
  res.render('404', ({
    title: '404',
    errorMessage: 'Page not found',
    name: 'Titas Kundu'
  }))
})

app.listen(port, () => {
  console.log('Server is up on port ' + port);
})
