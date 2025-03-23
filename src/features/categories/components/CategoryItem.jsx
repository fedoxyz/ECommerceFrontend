import React from "react";

const CategoryItem = ({ category, handleEdit, handleDelete }) => {
  return (
    <li key={category.id} className="flex justify-between p-2 border-b">
      <div>
        <strong>{category.name}</strong>: {category.description}
      </div>
      <div>
        <button onClick={() => handleEdit(category)} className="mr-2 text-blue-500">
          Edit
        </button>
        <button onClick={() => handleDelete(category.id)} className="text-red-500">
          Delete
        </button>
      </div>
    </li>
  );
};

export default CategoryItem;
