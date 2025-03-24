import React, { useEffect, useState, useCallback } from "react";
import productService from "../features/products/productService.js";
import categoryService from "../features/categories/categoryService";
import cartService from "../features/cart/cartService.js";
import ProductList from "../features/products/components/ProductList";
import ProductForm from "../features/products/components/ProductForm";
import Button from '../components/common/Button.jsx';
import { useRef } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ search: "", categoryId: "", minPrice: "", maxPrice: "" });
  const [form, setForm] = useState({ name: "", description: "", price: "", categoryId: "", stock: "", imageUrl: "" });
  const [editingId, setEditingId] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const observer = useRef(null);
  const [shouldFetch, setShouldFetch] = useState(true);

  useEffect(() => {
    console.log("should fetch", shouldFetch)
    if (shouldFetch) {
      fetchProducts(page, page === 1);
      setShouldFetch(false);
    }
  }, [shouldFetch]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchProducts = async (pageNum, reset = false, limit=10) => {
    console.log(hasMore, "hasMore")
    if (!hasMore) return;
    try {
      const response = await productService.getAllProducts({ ...filters, page: pageNum, limit: limit });
      console.log("response", response);
      
      // Check for and prevent duplicates when adding new products
      if (reset) {
        setProducts(response.products);
      } else {
        // Use a Set or other method to deduplicate based on product ID
        setProducts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNewProducts = response.products.filter(p => !existingIds.has(p.id));
          return [...prev, ...uniqueNewProducts];
        });
      }
      
      if (response.products.length > 0) {
        if (response.totalItems && (pageNum * limit) >= response.totalItems) {
          setHasMore(false);
          setShouldFetch(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

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

const handleAddToCart = async (productId) => {
  try {
    // Step 1: Add to cart
    const itemData = { productId, quantity: 1 };
    await cartService.addItem(itemData);
    
    console.log("Item added to cart, now updating products");
    console.log("Product ID to update:", productId);
    console.log("Current products:", products);
    
    // Step 2: Simple update to products
    setProducts(products.map(product => {
      if (product.id === productId) {
        console.log("Found product to update:", product);
        return { ...product, stock: product.stock - 1 };
      }
      return product;
    }));
    
    console.log("Products updated");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
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
    setHasMore(true); // Reset hasMore when applying new filters
    console.log(hasMore)
    setPage(1); // Reset to page 1
    setShouldFetch(true);
  };

  const clearFilters = () => {
    setFilters({ search: "", categoryId: "", minPrice: "", maxPrice: "" });
    // Fetch products without filters
    productService.getAllProducts({})
      .then(response => setProducts(response.products))
      .catch(error => console.error("Error fetching products:", error));
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
      <ProductList products={products} handleEdit={handleEdit} handleDelete={handleDelete} handleAddToCart={handleAddToCart} lastProductRef={lastProductRef} />
    </div>
  );
};

export default ProductsPage;

