import CategoryItem from "./CategoryItem";
import React, { useEffect, useState } from "react";

const CategoryList = ({ categories = [], handleEdit, handleDelete, isAdmin }) => {
  if (!categories || categories.length === 0) {
    return <p>No categories found.</p>;
  }

  useEffect(() => {
    console.log("categories", categories)
  }, [categories])

  return (
    <ul>
      {categories.map((category) => (
        <CategoryItem
          key={category.id}
          category={category}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          isAdmin={isAdmin}
        />
      ))}
    </ul>
  );
};

export default CategoryList;
