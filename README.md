🐵 SocialApe
============

A full-stack social media platform built with **React** frontend and **Firebase** backend (Firestore + Cloud Functions).

📦 Tech Stack
-------------

*   **Frontend:** React.js, Redux, Material-UI, Axios
*   **Backend:** Firebase (Firestore, Cloud Functions, Auth)
*   **Deployment:** Vercel (Frontend), Firebase Hosting (Functions)

🚀 Features
-----------

*   User signup / login / logout
*   Create and delete screams (posts)
*   Comment on screams
*   Like / Unlike screams
*   Upload profile image
*   Live UI updates without refreshing

🔧 Setup Instructions
---------------------

### 1\. Clone the repo

    git clone https://github.com/fatima-Sami55/Social_media_app

### 2\. Install dependencies

    npm install

### 3\. Configure environment

Create a `.env` file with your Firebase config:

    REACT_APP_API_URL=https://your-backend-url.cloudfunctions.net/api

### 4\. Start the dev server

    npm start

### 5\. Build for production

    npm run build

🌐 Deployment
-------------

**Frontend:** Deploy on [Vercel](https://vercel.com/).  
**Backend:** Deploy Firebase functions using:

    firebase deploy --only functions
