# 🎬 CinePicks Watchlist

CinePicks Watchlist is a web app that helps movie lovers discover and track their favorite films. Built with **React**, **TypeScript**, and **SCSS** using **Vite**, this app integrates with **Firebase** for authentication, database, and hosting. It also fetches movie data from **The Movie Database (TMDB) API** to provide an up-to-date catalog of top-rated and newly released movies.

🔗 **Live Demo**: [cinepicks-watchlist.com](https://cinepicks-watchlist.com)

---

## 🚀 Features

- ✅ **User Authentication** – Sign up and log in using **email/password**.
- 🎥 **Movie Discovery** – Browse **top-rated**, **newly added**, and more.
- 🔍 **Search Functionality** – Find movies by title.
- 📌 **Personal Watchlist** – Add movies to your watchlist, saved in the database.
- 🌎 **Real-Time Movie Data** – Powered by **TMDB API**.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, SCSS, Vite  
- **Backend & Services:** Firebase (Authentication, Firestore Database, Hosting)  
- **API:** TMDB API  

---

## 🏗️ Getting Started

### 🔧 Prerequisites

- **Node.js** (Download from [nodejs.org](https://nodejs.org/))  
- **npm** (or **yarn**) installed  

### 🚀 Installation & Setup

#### 1️⃣ Clone the repository
```sh
git clone https://github.com/your-username/cinepicks-watchlist.git
cd cinepicks-watchlist
```

#### 2️⃣ Install dependencies
```sh
npm install
```

#### 3️⃣ Create a .env file in the root directory and add your Firebase & TMDB API keys
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_TMDB_API_KEY=your_tmdb_api_key

#### 4️⃣ Run the development server
```sh
npm run dev
```

#### Your app will be available at http://localhost:5173/

### 📦 Deployment
CinePicks Watchlist is hosted on Firebase Hosting. To deploy updates:

#### 1️⃣ Install Firebase CLI (if not installed)
```sh
npm install -g firebase-tools
```

#### 2️⃣ Login to Firebase
```sh
firebase login
```

#### 3️⃣ Initialize Firebase (if not done yet)
```sh
firebase init
```

#### 4️⃣ Build the project
```sh
npm run build
```

#### 5️⃣ Deploy to Firebase Hosting
```sh
firebase deploy
```

---

## 🌍 Roadmap

### ✅ Add movie trailers using TMDB API
- Fetch and display movie trailers using TMDB API.

### ✅ Implement social login (Google, Facebook, etc.)
- Add Firebase Authentication for social logins.

### ✅ Allow users to rate and review movies
- Enable users to leave ratings and reviews stored in Firebase.

### ✅ Dark mode theme toggle
- Implement a theme switcher to toggle between light and dark mode.