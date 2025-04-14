import DeleteGrocery from "./DeleteGrocery";

const GroceryList = ({ groceries, onDelete }) => {
  if (!groceries || groceries.length === 0) return <div>No groceries yet!</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pantry Items</h1>
      <ul className="list-disc list-inside">
        {groceries.map((grocery) => (
          <li key={grocery.id} className="flex justify-between items-center">
            <span>
              {grocery.name} - {grocery.expiration_date}
            </span>
            <DeleteGrocery groceryId={grocery.id} onDelete={onDelete} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;
