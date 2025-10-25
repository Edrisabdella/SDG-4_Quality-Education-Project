// Analytics model
const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  totalStudents: {
    type: Number,
    default: 0
  },
  totalTutors: {
    type: Number,
    default: 0
  },
  totalResources: {
    type: Number,
    default: 0
  },
  totalSessions: {
    type: Number,
    default: 0
  },
  completedSessions: {
    type: Number,
    default: 0
  },
  countriesReached: {
    type: Number,
    default: 0
  },
  userGrowth: [{
    date: Date,
    newUsers: Number,
    activeUsers: Number
  }],
  resourceStats: {
    byCategory: Map,
    byLevel: Map,
    totalDownloads: { type: Number, default: 0 },
    totalViews: { type: Number, default: 0 }
  },
  sessionStats: {
    bySubject: Map,
    averageDuration: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 }
  },
  monthlyStats: [{
    month: String,
    year: Number,
    newUsers: Number,
    newResources: Number,
    sessionsCompleted: Number,
    totalHours: Number,
    averageRating: Number
  }],
  popularSubjects: [{
    subject: String,
    count: Number
  }],
  activeHours: {
    // Track when users are most active
    byHour: Map,
    byDay: Map
  }
}, {
  timestamps: true
});

// Update analytics when new user registers
AnalyticsSchema.statics.updateUserCounts = async function() {
  const User = mongoose.model('User');
  const totalStudents = await User.countDocuments({ role: 'student' });
  const totalTutors = await User.countDocuments({ role: 'tutor' });
  
  await this.findOneAndUpdate({}, {
    totalStudents,
    totalTutors
  }, { upsert: true });
};

// Update resource counts
AnalyticsSchema.statics.updateResourceCounts = async function() {
  const Resource = mongoose.model('Resource');
  const totalResources = await Resource.countDocuments({ isApproved: true });
  const totalDownloads = await Resource.aggregate([
    { $group: { _id: null, total: { $sum: '$stats.downloads' } } }
  ]);
  const totalViews = await Resource.aggregate([
    { $group: { _id: null, total: { $sum: '$stats.views' } } }
  ]);

  await this.findOneAndUpdate({}, {
    totalResources,
    'resourceStats.totalDownloads': totalDownloads[0]?.total || 0,
    'resourceStats.totalViews': totalViews[0]?.total || 0
  }, { upsert: true });
};

module.exports = mongoose.model('Analytics', AnalyticsSchema);