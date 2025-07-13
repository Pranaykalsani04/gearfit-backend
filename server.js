// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/authRoutes");
const progressRoutes = require("./routes/progressRoutes");
const planRoutes = require("./routes/planRoutes");

// Firebase setup
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Firebase config
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/plan", planRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("🚀 GearFit Backend is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});



