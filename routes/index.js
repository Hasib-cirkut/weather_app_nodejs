var express = require('express')
var router = express.Router()
const opencage = require('opencage-api-client');
const fetch = require('node-fetch');

let lat, lng, Result
var city = 'Dhaka'

//TODO: have to edit index.hbs according to how weather icon would show based on weather 



router.get('/',  (req, res) => {
    opencage
        .geocode({q: city}) 
        .then(async data => {

            lat = data.results[0].geometry.lat
            lng = data.results[0].geometry.lng

            const api_url = `https://api.darksky.net/forecast/57faefe939fd1e6e4500a28cb8fca376/${lat},${lng}?units=si`

            const response = await fetch(api_url)
            Result = await response.json()

            res.redirect('/weatherApi')

        })
        .catch(error => {
            console.log('error', error.message);
        })
})


router.post('/', (req, res)=>{
    city = req.body.cityName;
    console.log(city);

    res.redirect('/')
    
})

router.get('/temp', (req, res)=>{
    res.render('temp')
})

router.get('/weatherApi', (req, res)=>{
    console.log(Result);
    
    res.render('index', {result: Result})
})


// NOTE: This bit is very important
module.exports = router