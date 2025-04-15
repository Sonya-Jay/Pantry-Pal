const fetch = require("node-fetch");
require("dotenv").config();
const express = require("express");
// const { getFirestore } = require("firebase-admin/firestore");
const cors = require("cors");
const groceryRoutes = require("./routes/groceryRoutes");

const app = express();
// const db = getFirestore();

app.use(express.json());
app.use(cors());
app.use("/", groceryRoutes); // Use the grocery routes
const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Pantry Manager API is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
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

app.delete("/grocery/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await db.collection("groceries").doc(id).delete();
    res.status(200).json({ message: "Grocery deleted successfully." });
  } catch (error) {
    console.error("Error deleting grocery:", error);
    res.status(500).json({ error: "Failed to delete grocery." });
  }
});

// // FETCH API SPOONACULAR

app.get("/nutrition", async (req, res) => {
  const food = req.query.name || "1 banana";
  const apiKey = process.env.SPOONACULAR_API_KEY;

  const url = `https://api.spoonacular.com/recipes/parseIngredients?apiKey=${apiKey}&includeNutrition=true`;

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
    console.log(JSON.stringify(data, null, 2));

    if (!response.ok || !data.length) {
      throw new Error(data.message || "No nutrition data found");
    }

    const item = data[0]; // First parsed ingredient
    const nutrients = item?.nutrition?.nutrients || [];

    const getNutrient = (name) =>
      nutrients.find((n) => n.name.toLowerCase() === name.toLowerCase())
        ?.amount || "N/A";

    res.json({
      calories: getNutrient("Calories"),
      fat: getNutrient("Fat"),
      carbs: getNutrient("Carbohydrates"),
      protein: getNutrient("Protein"),
    });
  } catch (error) {
    console.error("Error fetching Spoonacular nutrition data:", error);
    res.status(500).json({
      error: "Failed to fetch nutrition data from Spoonacular",
      details: error.message,
    });
  }
});
//     const data = await response.json();
//     console.log(JSON.stringify(data, null, 2));

//     if (!Array.isArray(data) || !data.length || !data[0].nutrition) {
//       return res.status(400).json({ error: "No nutrition data found" });
//     }

//     const nutrients = data[0].nutrition.nutrients;

//     const getNutrientValue = (name) => {
//       const item = nutrients.find(
//         (n) => n.name.toLowerCase() === name.toLowerCase()
//       );
//       return item ? `${item.amount} ${item.unit}` : "N/A";
//     };

//     res.json({
//       calories: getNutrientValue("Calories"),
//       fat: getNutrientValue("Fat"),
//       carbs: getNutrientValue("Carbohydrates"),
//       protein: getNutrientValue("Protein"),
//     });
//   } catch (error) {
//     console.error("Error fetching Spoonacular nutrition data:", error);
//     res.status(500).json({
//       error: "Failed to fetch nutrition data from Spoonacular",
//       details: error.message,
//     });
//   }
// });

//     if (!response.ok) {
//       throw new Error(data.message || "Unknown Spoonacular error");
//     }

//     res.json(data);
//   } catch (error) {
//     console.error("Error fetching Spoonacular nutrition data:", error);
//     res.status(500).json({
//       error: "Failed to fetch nutrition data from Spoonacular",
//       details: error.message,
//     });
//   }
// });

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
