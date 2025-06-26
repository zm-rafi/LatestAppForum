// ✅ Event model (models/Event.js) - Add attendee list
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtext: { type: String },
  dateTime: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String },
  category: { type: String, default: 'General' },
  daysLeft: { type: String, default: 'Soon' },
  attendees: { type: Number, default: 0 },
  attendeeList: [{ username: String, studentId: String }],
  mode: { type: String, default: 'Offline' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

// ✅ Route updates (routes/eventRoutes.js)
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Create new event
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create event' });
  }
});

// Add attendee to an event
router.post('/:id/audience', async (req, res) => {
  const { username, studentId } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    event.attendeeList.push({ username, studentId });
    event.attendees = event.attendeeList.length;
    await event.save();

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add audience' });
  }
});

// Get all attendees for an event
router.get('/:id/audience', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    res.json(event.attendeeList);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get audience list' });
  }
});

module.exports = router;

// ✅ Frontend adjustments:
// 1. Replace share button with "Audience"
// 2. On press, make API call to /:id/audience and show list (Modal or Toast)
// 3. When registering for event, send username & studentId via /:id/audience

// Let me know if you want the full React Native UI update for handling these.
