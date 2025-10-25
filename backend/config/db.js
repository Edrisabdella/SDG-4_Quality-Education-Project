const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Initialize default data
    await initializeDefaultData();
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

const initializeDefaultData = async () => {
  try {
    const Analytics = require('../models/Analytics');
    
    // Check if analytics document exists
    const analyticsCount = await Analytics.countDocuments();
    if (analyticsCount === 0) {
      await Analytics.create({
        totalStudents: 1250,
        totalResources: 89,
        totalSessions: 342,
        countriesReached: parseInt(process.env.DEFAULT_COUNTRIES_REACHED) || 15,
        monthlyStats: [
          { month: 'Jan', newUsers: 150, newResources: 12, sessionsCompleted: 45 },
          { month: 'Feb', newUsers: 180, newResources: 15, sessionsCompleted: 52 },
          { month: 'Mar', newUsers: 220, newResources: 18, sessionsCompleted: 67 },
          { month: 'Apr', newUsers: 190, newResources: 14, sessionsCompleted: 58 },
          { month: 'May', newUsers: 210, newResources: 16, sessionsCompleted: 62 },
          { month: 'Jun', newUsers: 240, newResources: 20, sessionsCompleted: 78 }
        ]
      });
      console.log('Default analytics data initialized');
    }
  } catch (error) {
    console.error('Error initializing default data:', error);
  }
};

module.exports = connectDB;