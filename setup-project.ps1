# setup-project.ps1 - Complete OpenLearn Project Setup

Write-Host "🚀 Setting up OpenLearn Fullstack Project..." -ForegroundColor Cyan

# Check Node.js version
$nodeVersion = node -v
if (-not $nodeVersion) {
    Write-Host "❌ Node.js is not installed. Please install Node.js 18+ from https://nodejs.org" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green

# Create directory structure
Write-Host "📁 Creating project structure..." -ForegroundColor Yellow
$directories = @("server", "client", "docs", "server/src", "server/src/models", "server/src/routes", "server/src/controllers", "server/src/middleware", "server/src/utils", "client/src", "client/src/components", "client/src/pages", "client/src/features", "client/src/app")

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -ItemType Directory -Path $dir -Force | Out-Null
        Write-Host "  Created: $dir" -ForegroundColor Gray
    }
}

# Create .gitignore files
Write-Host "📝 Creating .gitignore files..." -ForegroundColor Yellow

# Root .gitignore
@"
# Dependencies
node_modules/
*/node_modules/
.npm
.pnpm

# Production builds
dist/
build/
*/dist/
*/build/

# Environment variables
.env
.env.*
!.env.example

# Logs
*.log
logs/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Deployment
.vercel
.render
.netlify

# Testing
coverage/
.nyc_output

# Temporary files
tmp/
temp/
"@ | Out-File -FilePath ".gitignore" -Encoding UTF8

# Server .gitignore
@"
node_modules/
.env
*.log
uploads/
temp/
coverage/
"@ | Out-File -FilePath "server/.gitignore" -Encoding UTF8

# Client .gitignore
@"
node_modules/
.env
dist/
*.log
.vite/
coverage/
"@ | Out-File -FilePath "client/.gitignore" -Encoding UTF8

Write-Host "✅ .gitignore files created" -ForegroundColor Green

# Create environment template files
Write-Host "📋 Creating environment templates..." -ForegroundColor Yellow

# Server .env.example
@"
# Server Configuration
NODE_ENV=development
PORT=5000

# Database (MongoDB Atlas)
MONGODB_URI=mongodb+srv://edrisabdella178_db_user:openlearn@openlearn-app.ptijnyn.mongodb.net/openlearn?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=30d

# Email Service (Optional)
EMAIL_SERVICE=gmail
EMAIL_USERNAME=edrisabdella178@gmail.com
EMAIL_PASSWORD=your_app_password

# Client URL
CLIENT_URL=http://localhost:3000

# Production URLs (Update for deployment)
# CLIENT_URL=https://your-app.vercel.app
# RENDER_EXTERNAL_URL=https://your-backend.onrender.com
"@ | Out-File -FilePath "server/.env.example" -Encoding UTF8

# Client .env.example
@"
# API Configuration
VITE_API_URL=http://localhost:5000

# For production, use:
# VITE_API_URL=https://your-backend.onrender.com

# App Configuration
VITE_APP_NAME=OpenLearn
VITE_APP_VERSION=1.0.0
"@ | Out-File -FilePath "client/.env.example" -Encoding UTF8

# Copy .env.example to .env if .env doesn't exist
if (-not (Test-Path "server/.env")) {
    Copy-Item "server/.env.example" "server/.env"
    Write-Host "⚠️  Created server/.env - Please update with your actual values" -ForegroundColor Yellow
}

if (-not (Test-Path "client/.env")) {
    Copy-Item "client/.env.example" "client/.env"
    Write-Host "⚠️  Created client/.env - Please update with your actual values" -ForegroundColor Yellow
}

Write-Host "✅ Environment files created" -ForegroundColor Green

# Create deployment configuration files
Write-Host "🔧 Creating deployment configurations..." -ForegroundColor Yellow

# Render configuration for backend
@"
services:
  - type: web
    name: openlearn-backend
    env: node
    plan: free
    buildCommand: cd server && npm install
    startCommand: cd server && npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MONGODB_URI
        value: mongodb+srv://edrisabdella178_db_user:openlearn@openlearn-app.ptijnyn.mongodb.net/openlearn?retryWrites=true&w=majority
      - key: JWT_SECRET
        generateValue: true
      - key: JWT_EXPIRE
        value: 30d
      - key: CLIENT_URL
        value: https://your-frontend-app.vercel.app
"@ | Out-File -FilePath "render.yaml" -Encoding UTF8

# Vercel configuration for frontend
@"
{
  "version": 2,
  "name": "openlearn-frontend",
  "builds": [
    {
      "src": "client/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_URL": "https://your-backend-service.onrender.com"
  }
}
"@ | Out-File -FilePath "vercel.json" -Encoding UTF8

Write-Host "✅ Deployment configurations created" -ForegroundColor Green

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow

# Root dependencies
Write-Host "Installing root dependencies..." -ForegroundColor Gray
npm install

# Server dependencies
Write-Host "Installing server dependencies..." -ForegroundColor Gray
Set-Location server
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Server dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Server dependencies installation failed" -ForegroundColor Red
    exit 1
}

# Client dependencies
Write-Host "Installing client dependencies..." -ForegroundColor Gray
Set-Location ../client
npm install
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Client dependencies installed" -ForegroundColor Green
} else {
    Write-Host "❌ Client dependencies installation failed" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host "🎉 OpenLearn project setup complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor White
Write-Host "1. Update environment variables in server/.env and client/.env" -ForegroundColor Gray
Write-Host "2. Test the application locally:" -ForegroundColor Gray
Write-Host "   - Backend: cd server && npm run dev" -ForegroundColor Gray
Write-Host "   - Frontend: cd client && npm run dev" -ForegroundColor Gray
Write-Host "3. Or run both: npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 Deployment:" -ForegroundColor White
Write-Host "1. Push to GitHub: git add . && git commit -m 'Initial commit' && git push" -ForegroundColor Gray
Write-Host "2. Deploy backend to Render: Connect GitHub repo at https://render.com" -ForegroundColor Gray
Write-Host "3. Deploy frontend to Vercel: Connect GitHub repo at https://vercel.com" -ForegroundColor Gray
Write-Host ""
Write-Host "📞 Support:" -ForegroundColor White
Write-Host "Email: edrisabdella178@gmail.com" -ForegroundColor Gray
Write-Host "GitHub: https://github.com/Edrisabdella" -ForegroundColor Gray
Write-Host "LinkedIn: https://linkedin.com/in/edris-abdella-7aa521177" -ForegroundColor Gray