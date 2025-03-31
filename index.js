require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Pantry Manager API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const db = require("./firebase");

app.post("/grocery", async (req, res) => {
  try {
    const { name, expiration_date } = req.body;
    const docRef = await db.collection("groceries").add({
      name,
      expiration_date,
      createdAt: new Date(),
    });
    res.json({ id: docRef.id, message: "Grocery added!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all groceries
app.get("/pantry", async (req, res) => {
  try {
    const snapshot = await db
      .collection("groceries")
      .orderBy("createdAt")
      .get();
    const groceries = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(groceries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
