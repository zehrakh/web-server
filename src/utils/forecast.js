const request = require('request')

// const forecast = (latitude,longitude,callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=f05d935514624dee72b319ac46c0dc6c&query='+longitude+','+latitude+'&units=f'
//     request({url:url,json:true},(error,response) => {
//         if(error){
//             callback('Unable to connect to the weather api',undefined)
//         }else if(response.body.error){
//             callback('Unable to find location',undefined)
//         }
//         else{
//             callback(undefined,response.body.current.weather_descriptions[0] +'. It is currently ' +response.body.current.temperature +' degrees out.It feels like ' +response.body.current.feelslike +' degrees out.')          
//         }
//     })
// }

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f05d935514624dee72b319ac46c0dc6c&query='+longitude+','+latitude+'&units=f'
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to the weather api',undefined)
        }else if(body.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,body.current.weather_descriptions[0] +'. It is currently ' +body.current.temperature +' degrees out.It feels like ' +body.current.feelslike +' degrees out.')          
        }
    })
}


module.exports = forecast