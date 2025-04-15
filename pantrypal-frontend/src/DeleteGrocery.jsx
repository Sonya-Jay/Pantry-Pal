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
      className="ml-4 text-white hover:text-gray-200 bg-transparent p-0 m-0 border-none outline-none focus:outline-none"
      style={{
        backgroundColor: "transparent",
        boxShadow: "none",
        WebkitAppearance: "none",
      }}
      title="Delete"
    >
      <Trash2 size={16} color="#0b5511" />
    </button>
  );
};

export default DeleteGrocery;
