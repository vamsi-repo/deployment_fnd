#!/bin/bash

# Railway Frontend Deployment Script for Keansa Data Validation

echo "🚀 Deploying Keansa Frontend to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it first:"
    echo "npm install -g @railway/cli"
    exit 1
fi

# Check if logged in to Railway
if ! railway whoami &> /dev/null; then
    echo "🔑 Please login to Railway first:"
    railway login
fi

echo "📁 Setting up frontend deployment..."

# Navigate to frontend directory
cd "$(dirname "$0")"

# Create .railwayignore file
cat > .railwayignore << EOF
node_modules/
.git/
.gitignore
.env
.env.local
.env.development
*.log
.DS_Store
Thumbs.db
src/**/*.test.*
src/**/*.spec.*
coverage/
.nyc_output/
EOF

echo "🔧 Frontend deployment files created:"
echo "✅ railway.toml"
echo "✅ .env.production"
echo "✅ .railwayignore"
echo "✅ Updated package.json with start script"
echo "✅ Updated vite.config.ts for production"

echo ""
echo "📋 Next steps:"
echo "1. Create a new Railway project: railway new"
echo "2. Deploy: railway up"
echo "3. Set VITE_API_URL to your backend domain in Railway dashboard"

echo ""
echo "🔗 Environment variables to set in Railway:"
echo "- VITE_API_URL=https://your-backend-domain.railway.app/api"
echo "- NODE_ENV=production"

echo ""
echo "✨ Ready for Railway deployment!"
