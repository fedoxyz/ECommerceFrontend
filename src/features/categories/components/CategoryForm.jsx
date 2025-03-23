import React from "react";
import categoryService from "../categoryService";
import Button from '../../../components/common/Button';

const CategoryForm = ({ form, setForm, editingId, setEditingId, fetchCategories }) => {
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await categoryService.updateCategory(editingId, form);
      } else {
        await categoryService.createCategory(form);
      }
      setForm({ name: "", description: "" });
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Category Name"
        required
        className="border p-2 mr-2"
      />
      <input
        type="text"
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        required
        className="border p-2 mr-2"
      />
      <Button type="submit" className="bg-blue-500 text-white px-4 py-2">
        {editingId ? "Update" : "Create"}
      </Button>
    </form>
  );
};

export default CategoryForm;
