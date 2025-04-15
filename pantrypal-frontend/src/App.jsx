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

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/grocery/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      fetchGroceries();
    } catch (error) {
      console.error("Error deleting grocery:", error);
      alert("Failed to delete grocery.");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      {/* Header, pinned to top-left */}
      <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
        <h1 style={{ color: "#0b5511", fontSize: "2.5rem", margin: 0 }}>
          Pantry Pal
        </h1>
      </div>

      {/* Main content container for left and right columns */}
      <div
        style={{
          display: "flex",
          marginTop: "5rem", // Ensure content starts below the header
          justifyContent: "space-between",
        }}
      >
        {/* Left Column */}
        <div
          style={{
            flex: 1,
            paddingRight: "1rem",
            textAlign: "left", // left-align its content
          }}
        >
          <AddGrocery onGroceryAdded={handleGroceryAdded} />
          <RecipeSuggestions groceries={groceries} />
        </div>

        {/* Right Column */}
        <div
          style={{
            flex: 1,
            paddingLeft: "1rem",
            textAlign: "left", // left-align content within the column
          }}
        >
          <GroceryList groceries={groceries} onDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import AddGrocery from "./addGrocery";
// import GroceryList from "./GroceryList";
// import RecipeSuggestions from "./RecipeSuggestions";

// function App() {
//   const [groceries, setGroceries] = useState([]);

//   const fetchGroceries = async () => {
//     try {
//       const response = await fetch("http://localhost:5001/pantry");
//       const data = await response.json();
//       setGroceries(data);
//     } catch (err) {
//       console.error("Failed to fetch groceries:", err);
//     }
//   };

//   useEffect(() => {
//     fetchGroceries();
//   }, []);

//   const handleGroceryAdded = () => {
//     fetchGroceries();
//   };

//   const handleDelete = (id) => {
//     setGroceries((prev) => prev.filter((g) => g.id !== id));
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Pantry Pal</h1>
//       <AddGrocery onGroceryAdded={handleGroceryAdded} />
//       <GroceryList groceries={groceries} onDelete={handleDelete} />
//       <RecipeSuggestions groceries={groceries} />
//     </div>
//   );
// }

// export default App;
// import React, { useState, useEffect } from "react";
// import AddGrocery from "./addGrocery";
// import GroceryList from "./GroceryList";
// import RecipeSuggestions from "./RecipeSuggestions";

// function App() {
//   const [groceries, setGroceries] = useState([]);

//   const fetchGroceries = async () => {
//     try {
//       const response = await fetch("http://localhost:5001/pantry");
//       const data = await response.json();
//       setGroceries(data);
//     } catch (err) {
//       console.error("Failed to fetch groceries:", err);
//     }
//   };

//   useEffect(() => {
//     fetchGroceries();
//   }, []);

//   const handleGroceryAdded = () => {
//     fetchGroceries();
//   };

//   // For deletions, you may or may not want to refresh the list from the backend.
//   const handleDelete = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:5001/grocery/${id}`, {
//         method: "DELETE",
//       });
//       if (!res.ok) throw new Error("Delete failed");
//       // For simplicity, re-fetch all groceries:
//       fetchGroceries();
//     } catch (error) {
//       console.error("Error deleting grocery:", error);
//       alert("Failed to delete grocery.");
//     }
//   };

//   return (
//     <div className="p-6 relative">
//       {/* The header "Pantry Pal" remains at the top-left */}
//       <div className="absolute top-6 left-6">
//         <h1 className="text-3xl font-bold text-[#0b5511]">Pantry Pal</h1>
//       </div>
//       <div className="flex mt-24">
//         {/* Left Column */}
//         <div className="w-1/2 pl-4">
//           <AddGrocery onGroceryAdded={handleGroceryAdded} />
//           <RecipeSuggestions groceries={groceries} />
//         </div>

//         {/* Right Column */}
//         <div className="w-1/2 pr-4">
//           <GroceryList groceries={groceries} onDelete={handleDelete} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;
