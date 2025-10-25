// Resource model
const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: true,
    enum: [
      'mathematics', 'science', 'programming', 'languages', 
      'humanities', 'arts', 'business', 'test-prep', 'other'
    ]
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject']
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  uploader: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['pdf', 'video', 'audio', 'document', 'presentation', 'image', 'link', 'text']
  },
  fileUrl: {
    type: String,
    required: [true, 'Please add a file URL or content']
  },
  thumbnail: String,
  tags: [String],
  metadata: {
    fileSize: Number,
    duration: Number, // for videos/audio
    pages: Number, // for documents
    language: { type: String, default: 'en' }
  },
  stats: {
    views: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
    ratings: [{
      user: { type: mongoose.Schema.ObjectId, ref: 'User' },
      rating: { type: Number, min: 1, max: 5 }
    }],
    averageRating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    favorites: { type: Number, default: 0 }
  },
  accessibility: {
    captions: Boolean,
    transcript: Boolean,
    screenReader: Boolean,
    languageOptions: [String]
  },
  isApproved: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  license: {
    type: String,
    default: 'CC BY-NC-SA 4.0'
  }
}, {
  timestamps: true
});

// Update average rating when new rating is added
ResourceSchema.methods.updateRating = function(userId, rating) {
  const existingRatingIndex = this.stats.ratings.findIndex(r => r.user.toString() === userId.toString());
  
  if (existingRatingIndex > -1) {
    this.stats.ratings[existingRatingIndex].rating = rating;
  } else {
    this.stats.ratings.push({ user: userId, rating });
  }
  
  this.stats.averageRating = this.stats.ratings.reduce((sum, r) => sum + r.rating, 0) / this.stats.ratings.length;
  this.stats.ratingCount = this.stats.ratings.length;
  
  return this.save();
};

// Increment view count
ResourceSchema.methods.incrementViews = function() {
  this.stats.views += 1;
  return this.save();
};

// Increment download count
ResourceSchema.methods.incrementDownloads = function() {
  this.stats.downloads += 1;
  return this.save();
};

// Text index for search
ResourceSchema.index({ 
  title: 'text', 
  description: 'text', 
  subject: 'text', 
  tags: 'text' 
});

module.exports = mongoose.model('Resource', ResourceSchema);