// import React, { useEffect, useState } from "react";

import { useState } from "react";

const AddGrocery = ({ onGroceryAdded }) => {
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

      if (!res.ok) throw new Error("Failed to add grocery");

      await res.json();
      setName("");
      setExpiration("");
      await onGroceryAdded(); // 🔁 Refresh the list!
    } catch (err) {
      console.error("Error adding grocery:", err);
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
          style={{ backgroundColor: "#005417", color: "white" }}
          className="p-2 rounded hover:bg-green-700"
          //  className="bg-green-600 text-white !important p-2 rounded hover:bg-green-700"
        >
          Add Grocery
        </button>
      </form>
    </div>
  );
};

export default AddGrocery;
