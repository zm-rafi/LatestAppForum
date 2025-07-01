const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// ✅ Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// ✅ Create new event
router.post('/', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create event' });
  }
});

// ✅ Add attendee to an event
router.post('/:id/audience', async (req, res) => {
  const { username, studentId } = req.body;
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    // Prevent duplicate audience entries
    const alreadyExists = event.attendeeList.some(
      (attendee) => attendee.studentId === studentId
    );
    if (alreadyExists) {
      return res.status(400).json({ error: 'User already joined this event' });
    }

    event.attendeeList.push({ username, studentId });
    event.attendees = event.attendeeList.length;
    await event.save();

    res.json(event);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add audience' });
  }
});

// ✅ Get all attendees for an event
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
