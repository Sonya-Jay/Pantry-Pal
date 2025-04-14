import React, { useState, useEffect } from "react";

const RecipeSuggestions = ({ groceries }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (groceries.length > 0) {
      const ingredients = groceries.map((grocery) => grocery.name).join(", ");

      fetch(`http://localhost:5001/recipes?ingredients=${ingredients}`)
        .then((response) => response.json())
        .then((data) => {
          console.log("fetched recipes:", data);
          setRecipes(data);
        })
        .catch(() => setError("Failed to fetch recipes")); // Just use a simple callback for error handling
    }
  }, [groceries]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Suggested Recipes</h2>
      {recipes.length > 0 ? (
        <ul>
          {recipes.map((recipe, index) => (
            <li key={index}>
              <a
                href={recipe.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline hover:test-blue-800"
                onClick={() => console.log("Clicked recipe:", recipe.sourceUrl)}
              >
                {recipe.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recipes found. Add more groceries to your pantry!</p>
      )}
    </div>
  );
};

export default RecipeSuggestions;
