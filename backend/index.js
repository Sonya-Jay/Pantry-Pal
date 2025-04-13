const fetch = require("node-fetch");
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

// // FETCH API SPOONACULAR

app.get("/nutrition", async (req, res) => {
  const food = req.query.food || "1 banana";
  const apiKey = process.env.SPOONACULAR_API_KEY;

  const url = `https://api.spoonacular.com/recipes/parseIngredients?apiKey=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        ingredientList: food,
        servings: "1",
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unknown Spoonacular error");
    }

    res.json(data);
  } catch (error) {
    console.error("Error fetching Spoonacular nutrition data:", error);
    res.status(500).json({
      error: "Failed to fetch nutrition data from Spoonacular",
      details: error.message,
    });
  }
});

// FETCH API SPOONACULAR RECIPES WITH LINKS

app.get("/recipes", async (req, res) => {
  const ingredients = req.query.ingredients || "";

  const apiKey = process.env.SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
    ingredients
  )}&number=5&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Spoonacular Error: ${response.statusText}`);
    }

    const recipes = await response.json();

    // Map to recipe titles and links
    const result = recipes.map((recipe) => ({
      title: recipe.title,
      link: `https://spoonacular.com/recipes/${recipe.title
        .toLowerCase()
        .replace(/ /g, "-")}-${recipe.id}`,
      image: recipe.image,
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({
      error: "Failed to fetch recipe data",
      details: error.message,
    });
  }
});

// FETCH API SPOONACULAR RECIPES WITH ALL NUTRITION FACTS

// app.get("/recipes", async (req, res) => {
//   const ingredients = req.query.ingredients;
//   const apiKey = process.env.SPOONACULAR_API_KEY;

//   if (!ingredients) {
//     return res
//       .status(400)
//       .json({ error: "Please provide a list of ingredients." });
//   }

//   try {
//     // Step 1: Find recipes by ingredients
//     const searchUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
//       ingredients
//     )}&number=1&apiKey=${apiKey}`;

//     const searchResponse = await fetch(searchUrl);
//     const searchData = await searchResponse.json();

//     if (!searchData.length) {
//       return res
//         .status(404)
//         .json({ error: "No recipes found for the given ingredients." });
//     }

//     const recipeId = searchData[0].id;

//     // Step 2: Get detailed recipe info
//     const infoUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=true&apiKey=${apiKey}`;

//     const infoResponse = await fetch(infoUrl);
//     const recipeDetails = await infoResponse.json();

//     res.json(recipeDetails);
//   } catch (error) {
//     console.error("Error fetching recipe data:", error);
//     res.status(500).json({
//       error: "Failed to fetch recipe data from Spoonacular",
//       details: error.message,
//     });
//   }
// });
