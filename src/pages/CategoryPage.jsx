import React, { useEffect, useState } from "react";
import categoryService from "../features/categories/categoryService";
import CategoryList from "../features/categories/components/CategoryList";
import CategoryForm from "../features/categories/components/CategoryForm"

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getAllCategories();
      setCategories(response);
      console.log("categories after set", categories)
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (category) => {
    setForm({name: category.name, description: category.description});
    setEditingId(category.id);
  };

  const handleDelete = async (id) => {
    try {
      await categoryService.removeCategory(id);
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Categories</h2>
      <CategoryForm
        form={form}
        setForm={setForm}
        editingId={editingId}
        setEditingId={setEditingId}
        fetchCategories={fetchCategories}
      />
    {loading ? <p>Loading categories...</p> : <CategoryList categories={categories} handleEdit={handleEdit} handleDelete={handleDelete} />}
    </div>
  );
};

export default CategoryPage;
