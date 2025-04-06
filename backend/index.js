const fetch = require("node-fetch");
const cors = require("cors");
app.use(cors());
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

app.listen(5001, "0.0.0.0", () => {
  console.log("Server is running on port 5001");
});

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

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

// FETCH API

app.get("/nutrition", async (req, res) => {
  const food = req.query.food || "1 apple";

  const appId = "28d0d746";
  const appKey = "506dedc51c3bc1c4271a8f344b1b2904";
  const userId = "zhangjp";

  const url = `https://api.edamam.com/api/nutrition-data?app_id=${appId}&app_key=${appKey}&ingr=${encodeURIComponent(
    food
  )}`;

  //   try {
  //     const response = await fetch(url, {
  //       method: "GET",
  //       headers: {},
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.statusText}`);
  //     }

  //     const data = await response.json();
  //     res.json(data);
  //   } catch (error) {
  //     console.error("Error fetching nutrition data:", error);
  //     res.status(500).json({
  //       error: "Failed to fetch nutrition data",
  //       details: error.message,
  //     });
  //   }
  // });

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Edamam-Account-User": userId,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    res.status(500).json({ error: "Failed to fetch nutrition data" });
  }
});

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to fetch nutrition data" });
//   }
// });
