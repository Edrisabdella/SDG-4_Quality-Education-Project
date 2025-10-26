const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');
const Resource = require('../models/Resource');

describe('Resources API', () => {
  let authToken;
  let userId;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/openlearn-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Resource.deleteMany({});

    // Create a test user and get auth token
    const userResponse = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

    authToken = userResponse.body.token;
    userId = userResponse.body.user.id;
  });

  describe('GET /api/resources', () => {
    test('should get all resources', async () => {
      const response = await request(app)
        .get('/api/resources')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });

    test('should filter resources by category', async () => {
      const response = await request(app)
        .get('/api/resources?category=mathematics')
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe('POST /api/resources', () => {
    test('should create a new resource with valid auth', async () => {
      const resourceData = {
        title: 'Test Resource',
        description: 'Test Description',
        category: 'mathematics',
        subject: 'Algebra',
        level: 'beginner',
        fileType: 'pdf',
        fileUrl: 'http://example.com/resource.pdf'
      };

      const response = await request(app)
        .post('/api/resources')
        .set('Authorization', `Bearer ${authToken}`)
        .send(resourceData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe(resourceData.title);
      expect(response.body.data.uploader).toBe(userId);
    });

    test('should not create resource without auth', async () => {
      const resourceData = {
        title: 'Test Resource',
        description: 'Test Description',
        category: 'mathematics'
      };

      await request(app)
        .post('/api/resources')
        .send(resourceData)
        .expect(401);
    });
  });
});