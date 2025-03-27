import React, { useEffect, useState, useCallback } from "react";
import productService from "../features/products/productService.js";
import categoryService from "../features/categories/categoryService";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "../features/products/components/ProductList";
import ProductForm from "../features/products/components/ProductForm";
import Button from '../components/common/Button.jsx';
import { useRef } from "react";
import { fetchProducts } from "../features/products/productSlice.js";
import { fetchCart } from "../features/cart/cartSlice.js";

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const { products, hasMore, loading } = useSelector(state => state.product);
  const [filters, setFilters] = useState({ search: "", categoryId: "", minPrice: "", maxPrice: "" });
  const [form, setForm] = useState({ name: "", description: "", price: "", categoryId: "", stock: "", imageUrl: "" });
  const [editingId, setEditingId] = useState(null);
  const [page, setPage] = useState(1);
  const observer = useRef(null);
  const [shouldFetch, setShouldFetch] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("should fetch", shouldFetch)
    if (shouldFetch) {
      dispatch(fetchProducts({
        pageNum: page, 
        reset: page === 1, 
        filters: filters
      }));
      setShouldFetch(false);
    }
    console.log(products)
  }, [shouldFetch, dispatch, page, filters]);

  useEffect(() => {
    fetchCategories();
    dispatch(fetchCart());
  }, []);

  const lastProductRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            setShouldFetch(true);
            setPage((prevPage) => prevPage + 1);
          }
        },
        { threshold: 1.0 }
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleEdit = (product) => {
    setForm(product);
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    try {
      await productService.removeProduct(id);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    console.log(hasMore)
    setPage(1); // Reset to page 1
    setShouldFetch(true);
  };

  const clearFilters = () => {
    setFilters({ search: "", categoryId: "", minPrice: "", maxPrice: "" });
    // Fetch products without filters
  };


  return (
    <div className="p-4">
      <h2 className="">Products</h2>
      <div className="">
        <h3 className="">Filter Products</h3>
        <form onSubmit={handleFilterSubmit} className="">
          <div className="">
            {/* Search by name */}
            <div>
              <label htmlFor="search" className="">
                Search by name
              </label>
              <input
                type="text"
                id="search"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                className=""
                placeholder="Product name..."
              />
            </div>

            {/* Category filter */}
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="categoryId"
                name="categoryId"
                value={filters.categoryId}
                onChange={handleFilterChange}
                className=""
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Min price */}
            <div>
              <label htmlFor="minPrice" className="">
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
                className=""
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>

            {/* Max price */}
            <div>
              <label htmlFor="maxPrice" className="">
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className=""
                placeholder="999.99"
                min="0"
                step="0.01"
              />
            </div>
          </div>

          <div className="">
            <Button
              type="button"
              onClick={clearFilters}
              className=""
            >
              Clear Filters
            </Button>
            <Button
              type="submit"
              className=""
            >
              Apply Filters
            </Button>
          </div>
        </form>
      </div>
      <ProductForm
        form={form}
        setForm={setForm}
        editingId={editingId}
        setEditingId={setEditingId}
        fetchProducts={fetchProducts}
        categories={categories}
      />
      <ProductList products={products} handleEdit={handleEdit} handleDelete={handleDelete} lastProductRef={lastProductRef} />
    </div>
  );
};

export default ProductsPage;

