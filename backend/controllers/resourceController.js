// Resource controller logic
const Resource = require('../models/Resource');
const User = require('../models/User');
const { validationResult } = require('express-validator');
const Analytics = require('../models/Analytics');

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
exports.getResources = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;
    
    const { 
      category, 
      search, 
      level, 
      subject, 
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    // Build query
    let query = { isApproved: true };
    
    if (category && category !== 'all') {
      query.category = category;
    }

    if (level && level !== 'all') {
      query.level = level;
    }

    if (subject) {
      query.subject = new RegExp(subject, 'i');
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const resources = await Resource.find(query)
      .populate('uploader', 'name email profile.avatar')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    const total = await Resource.countDocuments(query);

    // Get categories for filter
    const categories = await Resource.distinct('category', { isApproved: true });
    const subjects = await Resource.distinct('subject', { isApproved: true });

    res.status(200).json({
      success: true,
      count: resources.length,
      total,
      pagination: {
        page,
        pages: Math.ceil(total / limit),
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      },
      filters: {
        categories,
        subjects
      },
      data: resources
    });
  } catch (err) {
    console.error('Get resources error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error fetching resources'
    });
  }
};

// @desc    Get single resource
// @route   GET /api/resources/:id
// @access  Public
exports.getResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('uploader', 'name email profile stats');

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Increment view count (only if not the uploader)
    if (!req.user || resource.uploader._id.toString() !== req.user.id) {
      await resource.incrementViews();
    }

    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (err) {
    console.error('Get resource error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error fetching resource'
    });
  }
};

// @desc    Create resource
// @route   POST /api/resources
// @access  Private
exports.createResource = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    // Add uploader to req.body
    req.body.uploader = req.user.id;

    // Handle file upload if present
    if (req.file) {
      req.body.fileUrl = `/uploads/${req.file.filename}`;
      req.body.metadata = {
        fileSize: req.file.size,
        originalName: req.file.originalname
      };
    }

    const resource = await Resource.create(req.body);

    // Update user stats
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'stats.resourcesUploaded': 1 }
    });

    // Update analytics
    await Analytics.updateResourceCounts();

    // Populate uploader info for response
    await resource.populate('uploader', 'name email profile.avatar');

    res.status(201).json({
      success: true,
      data: resource
    });
  } catch (err) {
    console.error('Create resource error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error creating resource'
    });
  }
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private
exports.updateResource = async (req, res, next) => {
  try {
    let resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Make sure user is resource owner or admin
    if (resource.uploader.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this resource'
      });
    }

    // Handle file upload if present
    if (req.file) {
      req.body.fileUrl = `/uploads/${req.file.filename}`;
      req.body.metadata = {
        ...resource.metadata,
        fileSize: req.file.size,
        originalName: req.file.originalname
      };
    }

    resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('uploader', 'name email profile.avatar');

    res.status(200).json({
      success: true,
      data: resource
    });
  } catch (err) {
    console.error('Update resource error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error updating resource'
    });
  }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private
exports.deleteResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Make sure user is resource owner or admin
    if (resource.uploader.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this resource'
      });
    }

    await Resource.findByIdAndDelete(req.params.id);

    // Update user stats
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'stats.resourcesUploaded': -1 }
    });

    // Update analytics
    await Analytics.updateResourceCounts();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    console.error('Delete resource error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error deleting resource'
    });
  }
};

// @desc    Rate resource
// @route   POST /api/resources/:id/rate
// @access  Private
exports.rateResource = async (req, res, next) => {
  try {
    const { rating } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Update rating
    await resource.updateRating(req.user.id, rating);

    res.status(200).json({
      success: true,
      data: {
        averageRating: resource.stats.averageRating,
        ratingCount: resource.stats.ratingCount
      }
    });
  } catch (err) {
    console.error('Rate resource error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error rating resource'
    });
  }
};

// @desc    Download resource
// @route   GET /api/resources/:id/download
// @access  Private
exports.downloadResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }

    // Increment download count (only if not the uploader)
    if (!req.user || resource.uploader.toString() !== req.user.id) {
      await resource.incrementDownloads();
    }

    // For file resources, serve the file
    if (resource.fileUrl && !resource.fileUrl.startsWith('http')) {
      // Local file
      const filePath = path.join(__dirname, '..', resource.fileUrl);
      return res.download(filePath);
    } else {
      // External URL or text content
      res.status(200).json({
        success: true,
        data: {
          downloadUrl: resource.fileUrl,
          title: resource.title
        }
      });
    }
  } catch (err) {
    console.error('Download resource error:', err);
    res.status(500).json({
      success: false,
      message: 'Server error downloading resource'
    });
  }
};