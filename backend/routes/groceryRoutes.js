const express = require("express");
const router = express.Router();
const db = require("../firebase"); // Your Firestore instance

// DELETE grocery by ID
router.delete("/grocery/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.collection("groceries").doc(id).delete();
    res.status(200).json({ message: "Grocery deleted successfully" });
  } catch (err) {
    console.error("Error deleting grocery:", err);
    res.status(500).json({ error: "Failed to delete grocery" });
  }
});

// You can add GET, POST, PUT routes here too

module.exports = router;
