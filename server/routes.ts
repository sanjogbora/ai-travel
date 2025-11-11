import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/destinations", async (_req, res) => {
    try {
      const destinations = await storage.getDestinations();
      res.json(destinations);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destinations" });
    }
  });

  app.get("/api/destinations/:id", async (req, res) => {
    try {
      const destination = await storage.getDestination(req.params.id);
      if (!destination) {
        return res.status(404).json({ error: "Destination not found" });
      }
      res.json(destination);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch destination" });
    }
  });

  app.get("/api/hotels", async (req, res) => {
    try {
      const destinationId = req.query.destinationId as string | undefined;
      const hotels = await storage.getHotels(destinationId);
      res.json(hotels);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch hotels" });
    }
  });

  app.get("/api/flights", async (req, res) => {
    try {
      const destinationId = req.query.destinationId as string | undefined;
      const flights = await storage.getFlights(destinationId);
      res.json(flights);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch flights" });
    }
  });

  app.get("/api/activities", async (req, res) => {
    try {
      const destinationId = req.query.destinationId as string | undefined;
      const activities = await storage.getActivities(destinationId);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  app.get("/api/activities/:id", async (req, res) => {
    try {
      const activity = await storage.getActivity(req.params.id);
      if (!activity) {
        return res.status(404).json({ error: "Activity not found" });
      }
      res.json(activity);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activity" });
    }
  });

  app.get("/api/itineraries", async (_req, res) => {
    try {
      const itineraries = await storage.getItineraries();
      res.json(itineraries);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch itineraries" });
    }
  });

  app.get("/api/itineraries/:id", async (req, res) => {
    try {
      const itinerary = await storage.getItinerary(req.params.id);
      if (!itinerary) {
        return res.status(404).json({ error: "Itinerary not found" });
      }
      res.json(itinerary);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch itinerary" });
    }
  });

  app.get("/api/trips/:tripId/members", async (req, res) => {
    try {
      const members = await storage.getTripMembers(req.params.tripId);
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trip members" });
    }
  });

  app.get("/api/trips/:tripId/votes", async (req, res) => {
    try {
      const activityId = req.query.activityId as string | undefined;
      const votes = await storage.getVotes(req.params.tripId, activityId);
      res.json(votes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch votes" });
    }
  });

  app.get("/api/trips/:tripId/comments", async (req, res) => {
    try {
      const activityId = req.query.activityId as string | undefined;
      const comments = await storage.getComments(req.params.tripId, activityId);
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
