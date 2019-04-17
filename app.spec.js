import request from 'supertest';
import '@babel/polyfill';
import app from './app';

describe('api', () => {

  describe('get /api/v1/weather/:lat/:long', () => {
    let address;
    let area;

    beforeEach(() => {

      address = { address_components:
       [ { long_name: '3331',
           short_name: '3331',
           types: [ 'street_number' ] },
         { long_name: 'Vivian Court',
           short_name: 'Vivian Ct',
           types: [ 'route' ] },
         { long_name: 'Applewood Villages',
           short_name: 'Applewood Villages',
           types: [ 'neighborhood', 'political' ] },
         { long_name: 'Wheat Ridge',
           short_name: 'Wheat Ridge',
           types: [ 'locality', 'political' ] },
         { long_name: 'Jefferson County',
           short_name: 'Jefferson County',
           types: [ 'administrative_area_level_2', 'political' ] },
         { long_name: 'Colorado',
           short_name: 'CO',
           types: [ 'administrative_area_level_1', 'political' ] },
         { long_name: 'United States',
           short_name: 'US',
           types: [ 'country', 'political' ] },
         { long_name: '80033',
           short_name: '80033',
           types: [ 'postal_code' ] },
         { long_name: '5268',
           short_name: '5268',
           types: [ 'postal_code_suffix' ] } ],
      formatted_address: '3331 Vivian Ct, Wheat Ridge, CO 80033, USA',
      geometry:
       { bounds:
          { northeast: { lat: 39.7639827, lng: -105.1358182 },
            southwest: { lat: 39.7637831, lng: -105.1360533 } },
         location: { lat: 39.76386249999999, lng: -105.1359689 },
         location_type: 'ROOFTOP',
         viewport:
          { northeast: { lat: 39.76523188029149, lng: -105.1345867697085 },
            southwest: { lat: 39.7625339197085, lng: -105.1372847302915 } } },
      place_id: 'ChIJSSF9itGFa4cR1cZP6oHB0zE',
      types: [ 'premise' ]
    }

    area = {"address_components": [{"long_name": "3331", "short_name": "3331", "types": ["street_number"]}, {"long_name": "Vivian Court", "short_name": "Vivian Ct", "types": ["route"]}, {"long_name": "Applewood Villages", "short_name": "Applewood Villages", "types": ["neighborhood", "political"]}, {"long_name": "Wheat Ridge", "short_name": "Wheat Ridge", "types": ["locality", "political"]}, {"long_name": "Jefferson County", "short_name": "Jefferson County", "types": ["administrative_area_level_2", "political"]}, {"long_name": "Colorado", "short_name": "CO", "types": ["administrative_area_level_1", "political"]}, {"long_name": "United States", "short_name": "US", "types": ["country", "political"]}, {"long_name": "80033", "short_name": "80033", "types": ["postal_code"]}, {"long_name": "5268", "short_name": "5268", "types": ["postal_code_suffix"]}], "formatted_address": "3331 Vivian Ct, Wheat Ridge, CO 80033, USA", "geometry": {"bounds": {"northeast": {"lat": 39.7639827, "lng": -105.1358182}, "southwest": {"lat": 39.7637831, "lng": -105.1360533}}, "location": {"lat": 39.76386249999999, "lng": -105.1359689}, "location_type": "ROOFTOP", "viewport": {"northeast": {"lat": 39.76523188029149, "lng": -105.1345867697085}, "southwest": {"lat": 39.7625339197085, "lng": -105.1372847302915}}}, "place_id": "ChIJSSF9itGFa4cR1cZP6oHB0zE", "types": ["premise"]}

    });

    it('should return a 200 status code and an array of notes', async () => {
      const response = await request(app).get('/api/v1/weather/39.7640005/-105.1359738');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(area);
    });

  });

});
