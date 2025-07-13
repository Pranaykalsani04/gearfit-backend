const express = require("express");
const auth = require("../middleware/authMiddleware");
const { db } = require("../firebase");

const router = express.Router();

// Create progress log
router.post("/", auth, async (req, res) => {
  const { weight, photoUrl } = req.body;

  try {
    const newLog = {
      userId: req.user.id,
      weight,
      photoUrl,
      date: new Date().toISOString(),
    };

    await db.collection("progress").add(newLog);
    res.json({ message: "Progress logged" });
  } catch (error) {
    res.status(500).json({ error: "Failed to log progress" });
  }
});

// Get progress history
router.get("/", auth, async (req, res) => {
  try {
    const progressRef = db.collection("progress").where("userId", "==", req.user.id);
    const snapshot = await progressRef.orderBy("date", "desc").get();

    const logs = [];
    snapshot.forEach((doc) => logs.push({ id: doc.id, ...doc.data() }));

    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

module.exports = router;


