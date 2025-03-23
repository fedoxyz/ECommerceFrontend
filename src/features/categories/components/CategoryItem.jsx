import React from "react";
import Button from '../../../components/common/Button';

const CategoryItem = ({ category, handleEdit, handleDelete }) => {
  return (
    <li key={category.id} className="flex justify-between p-2 border-b">
      <div>
        <strong>{category.name}</strong>: {category.description}
      </div>
      <div>
        <Button onClick={() => handleEdit(category)} className="mr-2 text-blue-500">
          Edit
        </Button>
        <Button theme="danger" onClick={() => handleDelete(category.id)} className="text-red-500">
          Delete
        </Button>
      </div>
    </li>
  );
};

export default CategoryItem;
