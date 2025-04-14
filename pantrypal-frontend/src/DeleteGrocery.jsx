// DeleteGrocery.jsx
import React from "react";

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
      className="ml-4 text-white text-sm hover:text-gray-200"
      title="Delete"
    >
      ❌
    </button>
  );
  //   return (
  //     <button
  //       onClick={handleDelete}
  //       className="ml-4 text-red-600 hover:text-red-800"
  //       title="Delete"
  //     >
  //       ❌
  //     </button>
  //   );
};

export default DeleteGrocery;
