const request = require('postman-request');

const getLatitudLongitud = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZGV2ZWxvcGVya2ltbCIsImEiOiJja3RodTBydHAwdmhrMnBydHc4Y21weGJiIn0.zjmnhSEC1muFKmTJPVQpOA&limit=1`;
    // Los%20Angeles
    // we12kyiub
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(`Unable to connect to weather service: ${error}`);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search')
        } else {
            const { center, place_name } = body.features[0];
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: place_name
            });
        }
    });
};

module.exports = getLatitudLongitud