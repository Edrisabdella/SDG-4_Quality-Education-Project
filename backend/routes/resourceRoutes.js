// Resource routes
const express = require('express');
const { body } = require('express-validator');
const {
  getResources,
  getResource,
  createResource,
  updateResource,
  deleteResource,
  rateResource,
  downloadResource
} = require('../controllers/resourceController');
const { protect, optionalAuth } = require('../middleware/auth');
const { upload, handleUploadErrors } = require('../middleware/Upload');

const router = express.Router();

// Validation rules
const resourceValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').isIn([
    'mathematics', 'science', 'programming', 'languages', 
    'humanities', 'arts', 'business', 'test-prep', 'other'
  ]).withMessage('Invalid category'),
  body('subject').notEmpty().withMessage('Subject is required')
];

// Public routes
router.get('/', optionalAuth, getResources);
router.get('/:id', optionalAuth, getResource);

// Protected routes
router.post(
  '/', 
  protect, 
  upload.single('file'),
  handleUploadErrors,
  resourceValidation, 
  createResource
);

router.put(
  '/:id', 
  protect, 
  upload.single('file'),
  handleUploadErrors,
  updateResource
);

router.delete('/:id', protect, deleteResource);
router.post('/:id/rate', protect, rateResource);
router.get('/:id/download', protect, downloadResource);

module.exports = router;