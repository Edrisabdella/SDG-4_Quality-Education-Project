const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['student', 'tutor', 'volunteer', 'admin'],
    default: 'student'
  },
  profile: {
    bio: { type: String, maxlength: 500 },
    subjects: [String],
    education: String,
    experience: String,
    avatar: String,
    country: String,
    timezone: String
  },
  stats: {
    resourcesUploaded: { type: Number, default: 0 },
    tutoringSessions: { type: Number, default: 0 },
    averageRating: { type: Number, default: 0 },
    badges: [String],
    totalHours: { type: Number, default: 0 }
  },
  preferences: {
    emailNotifications: { type: Boolean, default: true },
    language: { type: String, default: 'en' },
    subjectsOfInterest: [String]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date
}, {
  timestamps: true
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Update last login on authentication
UserSchema.methods.updateLastLogin = function() {
  this.lastLogin = new Date();
  return this.save();
};

// Virtual for user's full profile URL
UserSchema.virtual('profileUrl').get(function() {
  return `/api/users/${this._id}/profile`;
});

module.exports = mongoose.model('User', UserSchema);