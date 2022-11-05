const request = require('postman-request');

const getForecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=d295425c7fd1cde90c9e743110f4bfaa&query=${latitude},${longitude}`;
    //  http://api.weatherstack.com/current?access_key=d295425c7fd1cde90c9e743110f4bfaa&query=37.8267,-122.4233
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to weather service: ${error}`);
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            const { temperature, feelslike, weather_descriptions } = body.current;
            callback(undefined, `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out`);
        }
    });
};

module.exports = getForecast