import { useState } from "react";
import DeleteGrocery from "./DeleteGrocery";
import { X } from "lucide-react";

const GroceryList = ({ groceries, onDelete }) => {
  const [nutrition, setNutrition] = useState(null);

  const handleGroceryClick = async (name) => {
    try {
      const res = await fetch(
        `http://localhost:5001/nutrition?name=${encodeURIComponent(name)}`
      );
      const data = await res.json();
      setNutrition({ name, ...data });
    } catch (err) {
      console.error("Failed to fetch nutrition data:", err);
    }
  };

  if (!groceries || groceries.length === 0) return <div>No groceries yet!</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pantry Items</h1>
      <ul className="list-disc list-inside">
        {groceries.map((grocery) => (
          <li key={grocery.id} className="flex justify-between items-center">
            <span
              onClick={() => handleGroceryClick(grocery.name)}
              className="cursonr-pointer text-blue-600 hover:underline"
              title="Click to view nutrition"
            >
              {grocery.name} - {grocery.expiration_date}
            </span>
            <DeleteGrocery groceryId={grocery.id} onDelete={onDelete} />
          </li>
        ))}
      </ul>
      {nutrition && (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
          }}
          className="fixed inset-0 flex justify-center items-center z-50"
        >
          <div
            className="relative max-w-md w-full p-6 rounded shadow-lg"
            style={{ backgroundColor: "#78b889" }}
          >
            <button
              onClick={() => setNutrition(null)}
              style={{ backgroundColor: "transparent", boxShadow: "none" }}
              className="absolute top-3 right-3 text-gray-600 hover:text-red-500 p-1 rounded-full focus:outline-none"
              aria-label="Close"
            >
              <X
                size={20}
                style={{ backgroundColor: "transparent" }}
                color="#0b5511"
              />
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Nutrition Facts for {nutrition.name}
            </h2>
            <ul className="list-disc list-inside text-left text-sm">
              <li>Calories: {nutrition.calories || "N/A"}</li>
              <li>Protein: {nutrition.protein || "N/A"}</li>
              <li>Fat: {nutrition.fat || "N/A"}</li>
              <li>Carbs: {nutrition.carbs || "N/A"}</li>
            </ul>
          </div>
        </div>
      )}
      {/* {nutrition && (
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(5px)",
          }}
          className="fixed inset-0 flex justify-center items-center z-50"
        >
          <div className="relative bg-white text-black p-6 rounded shadow-lg max-w-md w-full">
            <button
              onClick={() => setNutrition(null)}
              style={{ backgroundColor: "transparent", boxShadow: "none" }}
              className="absolute top-2 right-2 text-[#0b5511] hover:text-red-500 p-1 rounded-full focus:outline-none"
              aria-label="Close"
            >
              <X size={20} style={{ backgroundColor: "transparent" }} />
            </button>
            <h2 className="text-xl font-semibold mb-2">
              Nutrition Facts for {nutrition.name}
            </h2>
            <ul className="list-disc list-inside text-left text-sm">
              <li>Calories: {nutrition.calories || "N/A"}</li>
              <li>Protein: {nutrition.protein || "N/A"}</li>
              <li>Fat: {nutrition.fat || "N/A"}</li>
              <li>Carbs: {nutrition.carbs || "N/A"}</li>
            </ul>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default GroceryList;
