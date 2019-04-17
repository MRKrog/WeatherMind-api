import { apiKey, googleApi } from './keys'

import express from 'express'
const app = express()
import cors from 'cors'
import fetch from 'node-fetch'
app.use(express.json());
app.use(cors())

app.get('/api/v1/weather/:lat/:long', async (request, response) => {
  const latitude = request.params.lat;
  if(!latitude) return response.status(422).json('Latitude is missing')
  const longitude = request.params.long;
  if(!longitude) return response.status(422).json('Longitude is missing')
  let returnInfo = []
  let weatherInfo = await retrieveWeather(latitude, longitude)
  let locationInfo = await retrieveLocation(latitude, longitude)
  returnInfo.push(weatherInfo)
  returnInfo.push(locationInfo)

  return response.json(returnInfo)
})

const retrieveWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`);
    if(!response.ok) { throw Error('Bad Request')}
    const data = await response.json();
    let locationInfo = await retrieveLocation(latitude, longitude)
    return data;
  } catch (error) {
    return response.status(400).json(error.message)
  }

}

export const retrieveLocation = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleApi}`)
    if(!response.ok) { throw Error('Bad Request')}
    const data = await response.json();
    const updatedAddress = await cleanAddress(data)
    return updatedAddress
  } catch(error) {
    return response.status(400).json(error.message)
  }
}

export const cleanAddress = (data) => {
  let streetNumber = data.results[0].address_components[0].long_name;
  if(!streetNumber) return response.status(422).json('streetNumber is missing')
  let route = data.results[0].address_components[1].long_name;
  if(!route) return response.status(422).json('route is missing')
  let locality = data.results[0].address_components[3].long_name;
  if(!locality) return response.status(422).json('locality is missing')
  let state = data.results[0].address_components[5].long_name;
  if(!state) return response.status(422).json('state is missing')
  let addressInfo = {
    city: locality,
    state: state,
    street: `${streetNumber} ${route}`,
  }
  return addressInfo
}


export default app;
