// const express = require('express')
// const cors = require('cors')
// const fetch = require("");

import express from 'express'
const app = express()
import cors from 'cors'
import fetch from 'node-fetch'
app.use(express.json());
app.use(cors())

const apiKey = '204273757eb87535ea155ebc216db98d';
const latitude = '37.8267';
const longitude = '-122.4233';


let retrieveWeather = async () => {
  const response = await fetch(`https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`);
  const data = await response.json();
  return data;
}

app.get('/api/v1/weather', async (request, response) => {
  let weatherInfo = await retrieveWeather()
  return response.json(weatherInfo)
});

export default app;
