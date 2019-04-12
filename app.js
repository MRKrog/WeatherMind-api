// const express = require('express')
// const cors = require('cors')
// const fetch = require("");
import { apiKey, googleApi } from './keys'
import darkKey from './keys'

import express from 'express'
const app = express()
import cors from 'cors'
import fetch from 'node-fetch'
app.use(express.json());
app.use(cors())





app.get('/api/v1/weather/:lat/:long', async (request, response) => {
  const latitude = request.params.lat;
  const longitude = request.params.long;
  let returnInfo = []
  let weatherInfo = await retrieveWeather(latitude, longitude)
  let locationInfo = await retrieveLocation(latitude, longitude)
  // console.log(locationInfo);
  returnInfo.push(weatherInfo)
  returnInfo.push(locationInfo)

  return response.json(returnInfo)
})

const retrieveWeather = async (latitude, longitude) => {
  const response = await fetch(`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`);
  const data = await response.json();
  let locationInfo = await retrieveLocation(latitude, longitude)
  // console.log(locationInfo.results.address_components);
  return data;
}

const retrieveLocation = async (latitude, longitude) => {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApi}`)
  const data = await response.json();
  const updatedAddress = await cleanAddress(data)
  return updatedAddress
}

const cleanAddress = (data) => {
  let streetNumber = data.results[0].address_components[0].long_name;
  let route = data.results[0].address_components[1].long_name;
  let locality = data.results[0].address_components[3].long_name;
  let state = data.results[0].address_components[5].long_name;
  console.log(data);
    let addressInfo = {
      city: locality,
      state: state,
      street: `${streetNumber} ${route}`,
    }
  return addressInfo
}


app.get('/api/v1/weather', async (request, response) => {
  let weatherInfo = await retrieveWeather()
  return response.json(weatherInfo)
});

export default app;
