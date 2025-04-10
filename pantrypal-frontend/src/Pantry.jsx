import React, { useEffect, useState } from "react";

const Pantry = () => {
  const [groceries, setGroceries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch groceries from your Express API using Fetch
    fetch("http://localhost:5001/pantry")  // Your backend URL here
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();  // Parse JSON from response
      })
      .then((data) => {
        setGroceries(data);  // Store the data in state
        setLoading(false);  // Set loading to false once data is fetched
      })
      .catch((error) => {
        setError(error.message);  // Set the error state if there’s an error
        setLoading(false);  // Set loading to false when done
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading text while fetching
  }

  if (error) {
    return <div>Error: {error}</div>;  // Show error message if something went wrong
  }

  return (
    <div>
      <h1>Pantry Items</h1>
      <ul>
        {groceries.map((grocery) => (
          <li key={grocery.id}>{grocery.name} - {grocery.expiration_date}</li>
        ))}
      </ul>
    </div>
  );
};

export default Pantry;
