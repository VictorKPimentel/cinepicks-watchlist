# 🎬 CinePicks Watchlist
A modern movie watchlist app built with React, TypeScript, and SCSS using Vite. CinePicks Watchlist allows users to explore top-rated and newly added movies, search for specific movies, and save them to their personal watchlist.

## 🚀 Live Demo:
[https://cinepicks-watchlist.com](https://cinepicks-watchlist.com)

## ✨ Features
✅ User Authentication – Sign up & log in with email/password (Powered by Firebase).
✅ Movie Discovery – Browse top-rated and newly added movies (Powered by TMDB API).
✅ Search Functionality – Find any movie by title.
✅ Watchlist Management – Add movies to your watchlist, saved in Firebase.
✅ Modern UI – Built with React, TypeScript, and SCSS for a smooth user experience.
✅ Fast & Optimized – Developed with Vite for blazing-fast performance.

## 🛠️ Tech Stack
Frontend: React, TypeScript, SCSS, Vite <br>
Backend & Hosting: Firebase (Authentication, Firestore Database, Hosting) <br>
Movie Data: TMDB API <br>

## 🎥 Movie Data - TMDB API
CinePicks Watchlist uses The Movie Database (TMDB) API to fetch movie details, ratings, and search results.

## 📌 Get your own TMDB API Key:

Sign up at TMDB.

Go to Settings > API and create an API key.

Add the key to your .env file:
VITE_TMDB_API_KEY=your_tmdb_api_key


## 🚀 Getting Started
### 1️⃣ Clone the Repository
git clone https://github.com/yourusername/cinepicks-watchlist.git
cd cinepicks-watchlist


### 2️⃣ Install Dependencies
npm install


### 3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add:

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_TMDB_API_KEY=your_tmdb_api_key


### 4️⃣ Start the Development Server
npm run dev
Your app will be available at http://localhost:5173/.


### 5️⃣ Build for Production
If you want to create an optimized production build:
npm run build
This will generate a dist/ folder with the optimized app.


### 6️⃣ Preview the Production Build
To locally preview the built app before deploying:
npm run preview


### 📤 Deployment
Deploy to Firebase Hosting
Install Firebase CLI if you haven't:
npm install -g firebase-tools

Login to Firebase:
firebase login

Initialize Firebase (if not done yet):
firebase init

Build the project:
npm run build

Deploy to Firebase Hosting:
firebase deploy

### Alternatively, you can deploy using Vercel or Netlify.


## 🌍 Roadmap
 Add movie trailers using TMDB API.
 Implement social login (Google, Facebook, etc.).
 Allow users to rate and review movies.
 Dark mode theme toggle.