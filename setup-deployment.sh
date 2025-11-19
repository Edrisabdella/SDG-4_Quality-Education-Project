#!/bin/bash

echo "🚀 Setting up OpenLearn for deployment..."

echo "📁 Creating directory structure..."
mkdir -p server client docs

echo "📝 Creating .gitignore files..."
cat > .gitignore << 'EOL'
# Root .gitignore content from above
node_modules/
*/node_modules/
.env
.env.*
dist/
build/
.DS_Store
*.log
.vscode/
.vercel
EOL

cat > server/.gitignore << 'EOL'
# Server .gitignore content from above
node_modules/
.env
*.log
uploads/
EOL

cat > client/.gitignore << 'EOL'
# Client .gitignore content from above
node_modules/
.env
dist/
*.log
EOL

echo "📋 Creating environment templates..."
cat > server/.env.example << 'EOL'
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRE=30d
CLIENT_URL=https://your-app.vercel.app
EOL

cat > client/.env.example << 'EOL'
VITE_API_URL=https://your-backend.onrender.com
EOL

echo "🔧 Creating deployment configs..."
cat > render.yaml << 'EOL'
services:
  - type: web
    name: openlearn-backend
    env: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
EOL

cat > vercel.json << 'EOL'
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
EOL

echo "✅ Deployment setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update server/.env with your actual values"
echo "2. Update client/.env with your actual values" 
echo "3. Commit and push to GitHub"
echo "4. Deploy backend to Render: connect GitHub repo"
echo "5. Deploy frontend to Vercel: connect GitHub repo"
echo ""
echo "🌐 Your app will be live at:"
echo "   Frontend: https://your-app.vercel.app"
echo "   Backend:  https://your-backend.onrender.com"