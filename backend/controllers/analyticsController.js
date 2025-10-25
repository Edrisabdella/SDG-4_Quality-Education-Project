// Analytics controller logic
const Analytics = require('../models/Analytics');
const User = require('../models/User');
const Resource = require('../models/Resource');
const Session = require('../models/Session');

// @desc    Get platform analytics
// @route   GET /api/analytics
// @access  Public
exports.getAnalytics = async (req, res, next) => {
  try {
    let analytics = await Analytics.findOne();
    
    if (!analytics) {
      analytics = await Analytics.create({});
    }

    // Get real-time counts
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTutors = await User.countDocuments({ role: 'tutor' });
    const totalResources = await Resource.countDocuments({ isApproved: true });
    const totalSessions = await Session.countDocuments({ status: 'completed' });

    // Update analytics
    analytics.totalStudents = totalStudents;
    analytics.totalResources = totalResources;
    analytics.totalSessions = totalSessions;
    await analytics.save();

    res.status(200).json({
      success: true,
      data: {
        totalStudents,
        totalTutors,
        totalResources,
        totalSessions,
        countriesReached: analytics.countriesReached,
        monthlyStats: analytics.monthlyStats
      }
    });
  } catch (err) {
    next(err);
  }
};