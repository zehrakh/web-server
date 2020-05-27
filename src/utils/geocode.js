const request = require('request')

// const geocode = (address,callback) => {
//     const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiemVocmFraCIsImEiOiJjazltbjYxdmwwMThvM2pwaHE5N2liMXpwIn0.QD6dQCibBL188Trx3IKTuQ&limit=1'
//     request({url:url,json:true},(error,response) => {
//         if(error){
//             callback('Unable to connect to the Geocode Api',undefined)
//         }else if(response.body.features.length === 0){
//             callback('Missing URL.Try with different location',undefined)
//         }else{
//             callback(undefined,{
//                 longitude:response.body.features[0].center[0],
//                 latitude:response.body.features[0].center[1],
//                 location:response.body.features[0].place_name
//             })
//         }

//     })
// }

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiemVocmFraCIsImEiOiJjazltbjYxdmwwMThvM2pwaHE5N2liMXpwIn0.QD6dQCibBL188Trx3IKTuQ&limit=1'
    request({url,json:true},(error,{body}) => {
        if(error){
            callback('Unable to connect to the Geocode Api',undefined)
        }else if(body.features.length === 0){
            callback('Missing URL.Try with different location',undefined)
        }else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                location:body.features[0].place_name
            })
        }

    })
}

module.exports = geocode