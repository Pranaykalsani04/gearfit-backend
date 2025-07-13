const express = require("express");
const { ref, uploadString, getDownloadURL } = require("firebase/storage");
const { storage } = require("../utils/firebase");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Upload base64 image to Firebase
router.post("/upload", auth, async (req, res) => {
  const { imageBase64 } = req.body;
  const imageRef = ref(storage, `gearfit/${req.user.id}-${Date.now()}.jpg`);

  try {
    await uploadString(imageRef, imageBase64, "data_url");
    const url = await getDownloadURL(imageRef);
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
