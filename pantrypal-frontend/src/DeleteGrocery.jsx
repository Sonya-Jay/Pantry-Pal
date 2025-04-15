// DeleteGrocery.jsx
import React from "react";
import { Trash2 } from "lucide-react";

const DeleteGrocery = ({ groceryId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5001/grocery/${groceryId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      onDelete(groceryId); // Call the parent function to delete
    } catch (err) {
      console.error("Failed to delete grocery:", err);
      alert("Failed to delete grocery.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="ml-4 text-black bg-black hover:bg-gray-800 p-2 rounded focus:outline-none"
      style={{
        boxShadow: "none",
        WebkitAppearance: "none",
      }}
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteGrocery;
