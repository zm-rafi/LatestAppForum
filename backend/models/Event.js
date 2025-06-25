const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtext: { type: String },
  dateTime: { type: String, required: true },
  location: { type: String, required: true },
  image: { type: String }, // URL for now
  category: { type: String, default: 'General' },
  daysLeft: { type: String, default: 'Soon' },
  attendees: { type: Number, default: 0 },
  mode: { type: String, default: 'Offline' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
