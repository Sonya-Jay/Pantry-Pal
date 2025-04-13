import React, { useState, useEffect } from "react";
import AddGrocery from "./addGrocery";
import GroceryList from "./GroceryList";
import RecipeSuggestions from "./RecipeSuggestions";

function App() {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    // Fetch pantry items when app loads or when groceries update
    fetch("http://localhost:5001/pantry")
      .then((res) => res.json())
      .then((data) => setGroceries(data))
      .catch((err) => console.error("Failed to fetch pantry:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pantry Pal</h1>
      <AddGrocery />
      <GroceryList groceries={groceries} />
      <RecipeSuggestions groceries={groceries} />
    </div>
  );
}

export default App;

// function App() {
//   return (
//     <div className="p-6">
//       <AddGrocery />
//       <hr className="my-6" />
//       <GroceryList />
//     </div>
//   );
// }

// export default App;

// const App = () => {
//   const [groceries, setGroceries] = useState([]);

//   // Load groceries from API
//   useEffect(() => {
//     fetch("http://localhost:5001/pantry")
//       .then((response) => response.json())
//       .then((data) => setGroceries(data))
//       .catch((err) => console.error("Failed to fetch groceries:", err));
//   }, []);

//   return (
//     <div>
//       <AddGrocery setGroceries={setGroceries} />
//       <RecipeSuggestions groceries={groceries} />
//     </div>
//   );
// };

// export default App;

// // import Pantry from "./Pantry.jsx";

// // const App = () => {
// //   return (
// //     <div className="App">
// //       <h1>Welcome to PantryPal</h1>
// //       <Pantry />
// //     </div>
// //   );
// // };

// // export default App;

// import Pantry from "./GroceryList";

// function App() {
//   return (
//     <div className="App">
//       <h1 className="text-2xl font-bold p-4">Pantry Pal</h1>
//       <Pantry />
//     </div>
//   );
// }

// export default App;
