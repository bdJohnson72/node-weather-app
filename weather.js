const https = require('https');
const http = require('http');

//const key = require('./keys')
//const apiKey = key.apikey;
const apiKey = process.env.API_KEY

const zip = '02054';

function getWeather(zipCode) {
    try {
        const request = http.get(`http://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${apiKey}&units=imperial`,
            response => {
                let body = '';
                response.on('data', data => {
                    body += data.toString();
                });
                response.on('end', ()=> {
                    if (response.statusCode === 200){
                        responseString = JSON.parse(body);
                        logWeather(responseString);
                    }else {
                        const error = new Error();
                        throw error;
                        console.error(error.message);

                    }

                })
            });
    }catch (e) {
        console.error(e);
    }
}

function logWeather(weather){
    const message = `The weather in ${weather.name} is ${weather.main.temp}
    and it feel like ${weather.main.feels_like}`;
    console.log(message);
}

const zipcode = process.argv.slice(2);
getWeather(zipcode);