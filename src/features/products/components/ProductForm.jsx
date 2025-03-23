import React, { useEffect } from "react";
import productService from "../productService";
import Button from '../../../components/common/Button';

const ProductForm = ({ form, setForm, editingId, setEditingId, fetchProducts, categories }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name: form.name,
      description: form.description,
      price: form.price,
      categoryId: form.categoryId,
      stock: form.stock,
      imageUrl: form.imageUrl,
    };

    try {
      if (editingId) {
        await productService.updateProduct(editingId, productData);
      } else {
        await productService.createProduct(productData);
      }
      setForm({ name: "", description: "", price: "", categoryId: "", stock: "", imageUrl: "" });
      setEditingId(null);
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <h3 className="text-xl mb-2">{editingId ? "Edit" : "Create"} Product</h3>
      <div className="mb-4">
        <label htmlFor="name" className="block">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="price" className="block">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="categoryId" className="block">Category</label>
        <select
          id="categoryId"
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="stock" className="block">Stock</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          required
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="imageUrl" className="block">Image URL</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <Button type="submit" className="btn btn-primary">
        {editingId ? "Update" : "Create"} Product
      </Button>
    </form>
  );
};

export default ProductForm;

