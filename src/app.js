const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
var cors = require('cors')

const app = express()
app.use(cors()) // Use this after the variable declaration

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//To use hbs files
app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather',
        name : 'Zehra Kausar Haider'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About Me',
        name:'Zehra Kausar Haider'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message:'This is the help page',
        title:'Help',
        name:'Zehra Kausar Haider'
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    else{
        geocode(req.query.address,(error,{longitude,latitude,location} = {})=>{
            if(error){
              return res.send(error)
            }
            // console.log('Error',error)
            // console.log('Data',data)
            forecast(longitude, latitude, (error, forecastData) => {
              if(error){
                return console.log(error)
              }
              // console.log('Error', error)
              // console.log('Data', data)
             res.send({
                 location:location,
                 forecast:forecastData,
                 address:req.query.address
             })
            })
        })
          }
})



//to learn query string
app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search query'
        })
    }
    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Zehra Kausar Haider',
        message:'Help Article Not Found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Zehra Kausar Haider',
        message:'Page Not Found'
    })
})

//Starting Server at a Development Port
app.listen(3000,() => {
    console.log('Server is running at port 3000')
})


//app.com
//app.com/help
//app.com/about

// app.get('',(req,res) => {
//     //res.send('Hello Express!')
//     res.send('<h1>Weather</h1>')
// })

// app.get('/help',(req,res) => {
//     //res.send('Help Page')
//     // res.send({
//     //     name:'Zehra',
//     //     age:29
//     // })

//     //sending an array

//     res.send([
//         {
//             name:'Zehra'
//         },
//         {
//             name:'Rohail'
//         }
//     ])
// })

// app.get('/about',(req,res) => {
//     res.send('<h1>About</h1>')
// })