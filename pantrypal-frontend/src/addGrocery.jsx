// import React, { useEffect, useState } from "react";

import { useState } from "react";

function AddGrocery() {
  const [name, setName] = useState("");
  const [expiration, setExpiration] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const grocery = {
      name,
      expiration_date: expiration,
    };

    try {
      const res = await fetch("http://localhost:5001/grocery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(grocery),
      });

      const data = await res.json();
      console.log("Grocery added:", data);
      alert("Grocery added successfully!");

      // Clear input fields
      setName("");
      setExpiration("");
    } catch (error) {
      console.error("Error adding grocery:", error);
      alert("Failed to add grocery.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add a Grocery Item</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
        <input
          type="text"
          placeholder="Grocery name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="date"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Add Grocery
        </button>
      </form>
    </div>
  );
}

export default AddGrocery;

// const Pantry = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const response = await fetch(
//           "http://localhost:5001/recipes?ingredients=chicken,tomato"
//         );
//         const data = await response.json();
//         setRecipes(data);
//       } catch (err) {
//         setError(err.message);
//       }
//     };

//     fetchRecipes();
//   }, []);

//   return (
//     <div>
//       <h2>Suggested Recipes</h2>
//       {error && <p>Error: {error}</p>}
//       <ul>
//         {recipes.map((recipe, index) => (
//           <li key={index}>
//             <a
//               href={recipe.sourceUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               {recipe.title}
//             </a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Pantry;

// const Pantry = () => {
//   const [groceries, setGroceries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Fetch groceries from your Express API using Fetch
//     fetch("http://localhost:5001/pantry")  // Your backend URL here
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();  // Parse JSON from response
//       })
//       .then((data) => {
//         setGroceries(data);  // Store the data in state
//         setLoading(false);  // Set loading to false once data is fetched
//       })
//       .catch((error) => {
//         setError(error.message);  // Set the error state if there’s an error
//         setLoading(false);  // Set loading to false when done
//       });
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;  // Show loading text while fetching
//   }

//   if (error) {
//     return <div>Error: {error}</div>;  // Show error message if something went wrong
//   }

//   return (
//     <div>
//       <h1>Pantry Items</h1>
//       <ul>
//         {groceries.map((grocery) => (
//           <li key={grocery.id}>{grocery.name} - {grocery.expiration_date}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Pantry;
