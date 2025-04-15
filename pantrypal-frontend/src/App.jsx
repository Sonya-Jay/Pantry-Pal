import React, { useState, useEffect } from "react";
import AddGrocery from "./addGrocery";
import GroceryList from "./GroceryList";
import RecipeSuggestions from "./RecipeSuggestions";

function App() {
  const [groceries, setGroceries] = useState([]);

  const fetchGroceries = async () => {
    try {
      const response = await fetch("http://localhost:5001/pantry");
      const data = await response.json();
      setGroceries(data);
    } catch (err) {
      console.error("Failed to fetch groceries:", err);
    }
  };

  useEffect(() => {
    fetchGroceries();
  }, []);

  const handleGroceryAdded = () => {
    fetchGroceries();
  };

  const handleDelete = (id) => {
    setGroceries((prev) => prev.filter((g) => g.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">PantryPal</h1>
      <AddGrocery onGroceryAdded={handleGroceryAdded} />
      <GroceryList groceries={groceries} onDelete={handleDelete} />
      <RecipeSuggestions groceries={groceries} />
    </div>
  );
}

export default App;
