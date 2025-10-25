// Session model
const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  tutor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  student: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject']
  },
  topic: {
    type: String,
    required: [true, 'Please add a topic']
  },
  description: {
    type: String,
    maxlength: 1000
  },
  scheduledTime: {
    type: Date,
    required: [true, 'Please add a scheduled time']
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: [15, 'Duration must be at least 15 minutes'],
    max: [180, 'Duration cannot exceed 3 hours']
  },
  status: {
    type: String,
    enum: ['scheduled', 'completed', 'cancelled', 'ongoing', 'pending'],
    default: 'scheduled'
  },
  meetingInfo: {
    platform: String,
    meetingLink: String,
    meetingId: String,
    password: String
  },
  materials: [{
    title: String,
    url: String,
    type: String
  }],
  notes: {
    tutorNotes: String,
    studentNotes: String,
    sharedNotes: String
  },
  rating: {
    studentRating: {
      rating: { type: Number, min: 1, max: 5 },
      feedback: String,
      ratedAt: Date
    },
    tutorRating: {
      rating: { type: Number, min: 1, max: 5 },
      feedback: String,
      ratedAt: Date
    }
  },
  cost: {
    type: Number,
    default: 0
  },
  reminders: [{
    type: String,
    sentAt: Date,
    method: String // email, push, sms
  }],
  cancellation: {
    cancelledBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    reason: String,
    cancelledAt: Date
  }
}, {
  timestamps: true
});

// Index for efficient queries
SessionSchema.index({ tutor: 1, scheduledTime: 1 });
SessionSchema.index({ student: 1, scheduledTime: 1 });
SessionSchema.index({ status: 1, scheduledTime: 1 });

// Virtual for session end time
SessionSchema.virtual('endTime').get(function() {
  return new Date(this.scheduledTime.getTime() + this.duration * 60000);
});

// Check if session is in the past
SessionSchema.methods.isPast = function() {
  return this.endTime < new Date();
};

// Check if session can be cancelled (e.g., at least 2 hours before)
SessionSchema.methods.canBeCancelled = function() {
  const twoHoursBefore = new Date(this.scheduledTime.getTime() - 2 * 60 * 60000);
  return new Date() < twoHoursBefore;
};

module.exports = mongoose.model('Session', SessionSchema);