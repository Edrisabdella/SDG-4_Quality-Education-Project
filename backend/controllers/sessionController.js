// Session controller logic
const Session = require('../models/Session');

// @desc    Get all sessions for user
// @route   GET /api/sessions
// @access  Private
exports.getSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find({
      $or: [{ tutor: req.user.id }, { student: req.user.id }]
    })
    .populate('tutor', 'name email profile')
    .populate('student', 'name email profile')
    .sort({ scheduledTime: 1 });

    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create session
// @route   POST /api/sessions
// @access  Private
exports.createSession = async (req, res, next) => {
  try {
    const session = await Session.create({
      ...req.body,
      student: req.user.id
    });

    // Update user stats
    const User = require('../models/User');
    await User.findByIdAndUpdate(req.user.id, {
      $inc: { 'stats.tutoringSessions': 1 }
    });
    await User.findByIdAndUpdate(req.body.tutor, {
      $inc: { 'stats.tutoringSessions': 1 }
    });

    res.status(201).json({
      success: true,
      data: session
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update session
// @route   PUT /api/sessions/:id
// @access  Private
exports.updateSession = async (req, res, next) => {
  try {
    let session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({
        success: false,
        message: 'Session not found'
      });
    }

    // Make sure user is session participant
    if (session.tutor.toString() !== req.user.id && session.student.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this session'
      });
    }

    session = await Session.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('tutor', 'name email profile')
      .populate('student', 'name email profile');

    res.status(200).json({
      success: true,
      data: session
    });
  } catch (err) {
    next(err);
  }
};