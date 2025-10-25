// Session routes
const express = require('express');
const {
  getSessions,
  createSession,
  updateSession
} = require('../controllers/sessionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getSessions)
  .post(protect, createSession);

router.route('/:id')
  .put(protect, updateSession);

module.exports = router;