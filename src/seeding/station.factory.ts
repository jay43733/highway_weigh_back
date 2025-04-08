import { Station } from 'src/stations/station.entity';
import { setSeederFactory } from 'typeorm-extension';
import { faker } from '@faker-js/faker';

const stationData = [
  { name: 'Grand Palace, Bangkok', latitude: 13.75, longitude: 100.4913 },
  { name: 'Wat Arun, Bangkok', latitude: 13.7436, longitude: 100.4889 },
  { name: 'Chiang Mai Old City', latitude: 18.7883, longitude: 98.9853 },
  { name: 'Phuket Patong Beach', latitude: 7.8966, longitude: 98.2956 },
  { name: 'Ayutthaya Historical Park', latitude: 14.3559, longitude: 100.566 },
  { name: 'Erawan Shrine, Bangkok', latitude: 13.7453, longitude: 100.5396 },
  { name: 'Railay Beach, Krabi', latitude: 8.0117, longitude: 98.8373 },
  { name: 'Doi Inthanon, Chiang Mai', latitude: 18.5883, longitude: 98.4878 },
  { name: 'Sukhothai Historical Park', latitude: 17.0154, longitude: 99.82 },
  { name: 'Khao Yai National Park', latitude: 14.4378, longitude: 101.3722 },
  { name: 'Wat Phra Kaew, Chiang Rai', latitude: 19.9086, longitude: 99.832 },
  {
    name: 'Bridge on the River Kwai, Kanchanaburi',
    latitude: 14.042,
    longitude: 99.5039,
  },
  {
    name: 'Chatuchak Weekend Market, Bangkok',
    latitude: 13.8007,
    longitude: 100.552,
  },
  {
    name: 'Sanctuary of Truth, Pattaya',
    latitude: 12.9723,
    longitude: 100.8842,
  },
  {
    name: 'Sam Phan Bok, Ubon Ratchathani',
    latitude: 15.9962,
    longitude: 105.3885,
  },
  {
    name: 'Wat Mahathat, Nakhon Si Thammarat',
    latitude: 8.4304,
    longitude: 99.9631,
  },
  { name: 'Koh Phi Phi Leh, Krabi', latitude: 7.6786, longitude: 98.7657 },
  {
    name: 'Damnoen Saduak Floating Market, Ratchaburi',
    latitude: 13.5186,
    longitude: 99.958,
  },
  {
    name: 'Phimai Historical Park, Nakhon Ratchasima',
    latitude: 15.2201,
    longitude: 102.4931,
  },
  {
    name: 'Wat Phra That Doi Suthep, Chiang Mai',
    latitude: 18.8049,
    longitude: 98.9215,
  },
  { name: 'Thai CC Tower', latitude: 13.7186, longitude: 100.5215 },
];
export const StationFactory = setSeederFactory(Station, (faker) => {
  const station = new Station();
  const randomStation = faker.helpers.arrayElement(stationData);
  (station.name = randomStation.name),
    (station.lat = randomStation.latitude),
    (station.long = randomStation.longitude);
  return station;
});
