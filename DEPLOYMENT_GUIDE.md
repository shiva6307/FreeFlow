# Freelancing App Deployment Guide

## Overview
This guide walks you through deploying your Freelancing App to:
- **Frontend**: Vercel (recommended, free tier available)
- **Backend**: Render (free tier available)
- **Database**: MongoDB Atlas (free tier available)

## Prerequisites
Before starting, make sure you have:
1. A Render account (render.com)
2. A Vercel account (vercel.com)
3. MongoDB Atlas account with your database set up
4. Your MongoDB Atlas connection string: `mongodb+srv://shivmishra6307_db_user:<password>@cluster0.tul7c80.mongodb.net/`
5. Git installed and your project pushed to GitHub/GitLab

---

## Step 1: Prepare MongoDB Atlas

### Your Connection String:
```
mongodb+srv://shivmishra6307_db_user:<db_password>@cluster0.tul7c80.mongodb.net/
```

**Note**: Replace `<db_password>` with your actual Atlas password.

To get the full connection string:
1. Go to MongoDB Atlas → Your Cluster
2. Click "Connect" → "Connect your application"
3. Copy the connection string
4. Replace the password placeholder with your actual password

---

## Step 2: Deploy Backend to Render

### 2.1 Push server code to GitHub
1. Create a GitHub repository for your project (if you haven't already)
2. Push your `server` folder to GitHub

### 2.2 Deploy on Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `freelancing-app-backend` (or your preferred name)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Root Directory**: `server` (important!)

### 2.3 Set Environment Variables on Render
In the Render dashboard, go to your service → Environment:

Add these variables:
```
MONGODB_URI=mongodb+srv://shivmishra6307_db_user:<db_password>@cluster0.tul7c80.mongodb.net/
PORT=10000
FRONTEND_URL=https://your-vercel-domain.vercel.app
NODE_ENV=production
```

**Important**: The `FRONTEND_URL` should be your Vercel app's URL (you'll get this after deploying to Vercel)

### 2.4 Wait for deployment
Render will automatically deploy whenever you push to GitHub. Wait for the deployment to complete and note your backend URL (it will be something like `https://freelancing-app-backend.onrender.com`)

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Push client code to GitHub
1. Push your `client` folder to GitHub
2. Make sure your `src/config.js` and `.env.local` files exist

### 3.2 Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: React
   - **Root Directory**: `client` (important!)
   - **Build and Output Settings**: Should auto-detect npm scripts

### 3.3 Set Environment Variables on Vercel
In your Vercel project settings → Environment Variables:

Add these:
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
REACT_APP_WS_URL=https://your-backend-url.onrender.com
```

Replace `your-backend-url.onrender.com` with the actual URL from Render

### 3.4 Redeploy frontend
After setting environment variables, trigger a redeploy:
1. Go to Deployments
2. Click the latest deployment
3. Click "Redeploy"

Wait for the deployment to complete. Your app will be live!

---

## Step 4: Update Backend CORS

After deploying frontend to Vercel, you need to update the backend CORS setting:

1. Go to your Render dashboard
2. Select your backend service
3. Go to Environment
4. Update `FRONTEND_URL` to your Vercel URL:
   ```
   FRONTEND_URL=https://your-vercel-domain.vercel.app
   ```
5. Save and redeploy the service

---

## Step 5: Final Testing

1. Visit your Vercel app URL
2. Test all major features:
   - User registration
   - Login
   - Creating projects (if client)
   - Browsing projects (if freelancer)
   - Real-time chat
   - WebSocket connections

If you encounter issues, check:
- Backend logs on Render dashboard
- Frontend logs in browser DevTools
- Environment variables are correctly set
- MongoDB connection is working

---

## Troubleshooting

### "Cannot reach backend" or API errors
- Check that `REACT_APP_API_URL` environment variable is set correctly in Vercel
- Verify backend is running on Render (check Render logs)
- Ensure `FRONTEND_URL` is set correctly in Render backend

### MongoDB Connection Issues
- Verify MongoDB Atlas credentials are correct
- Check that your IP address is whitelisted in MongoDB Atlas (Security → Network Access)
- Ensure the database name in connection string is correct

### WebSocket Connection Issues
- WebSocket should use the same URL as your API (`REACT_APP_WS_URL`)
- Make sure backend CORS is configured with your Vercel URL

### Deployment Stuck
- Check GitHub Actions / deployment logs
- Ensure `package.json` has all required dependencies
- Verify `vercel.json` and build commands are correct

---

## Important URLs to Remember

After deployment:
- **Frontend (Vercel)**: `https://your-domain.vercel.app`
- **Backend (Render)**: `https://your-backend.onrender.com`
- **Database (MongoDB Atlas)**: Your MongoDB cluster credentials

---

## Next Steps

### Optional Improvements:
1. **Custom Domain**: Set up custom domain on Vercel
2. **Database Backups**: Enable backups on MongoDB Atlas
3. **Monitoring**: Set up error tracking (Sentry, etc.)
4. **SSL/TLS**: Automatically enabled on both Vercel and Render

---

## Cost Estimation

- **Vercel Frontend**: Free tier available
- **Render Backend**: Free tier available with limitations
- **MongoDB Atlas**: Free tier (512MB storage)

For production with higher traffic, consider upgrading to paid plans.

---

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- React Router: https://reactrouter.com/

Good luck with your deployment! 🚀
