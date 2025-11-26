import express from 'express';
import { storage } from '../server/storage.ts';

const app = express();

app.get('/api/destinations', async (_req, res) => {
  const destinations = await storage.getDestinations();
  res.json(destinations);
});

app.get('/api/hotels', async (req, res) => {
  const hotels = await storage.getHotels(req.query.destinationId);
  res.json(hotels);
});

app.get('/api/flights', async (req, res) => {
  const flights = await storage.getFlights(req.query.destinationId);
  res.json(flights);
});

app.get('/api/activities', async (req, res) => {
  const activities = await storage.getActivities(req.query.destinationId);
  res.json(activities);
});

export default app;
