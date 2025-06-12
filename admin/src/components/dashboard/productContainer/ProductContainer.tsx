import React, { useState, useEffect, useMemo } from "react";
import {
  FaPlus,
  FaSearch,
  FaEye,
  FaEdit,
  FaTrash,
  FaImage,
  FaUndo,
} from "react-icons/fa";
import ProductModal from "../../productModal/ProductModal";
import AdminFooter from "../../footer/AdminFooter";
import "./ProductContainer.scss";

interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  stock: number;
  sku: string;
  images: string[];
  status: "active" | "inactive" | "discontinued";
  createdAt: string;
  updatedAt: string;
}

type ModalMode = "add" | "edit" | "view";

const ProductContainer: React.FC = () => {
  // State for products data
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>("add");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subcategoryFilter, setSubcategoryFilter] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [stockFilter, setStockFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [dateFilter, setDateFilter] = useState("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "iPhone 15 Pro",
        category: "electronics",
        subcategory: "smartphones",
        brand: "apple",
        price: 999,
        stock: 25,
        sku: "IPH15PRO001",
        images: ["https://example.com/iphone15.jpg"],
        status: "active",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
      },
      {
        id: "2",
        name: "Samsung Galaxy S24",
        category: "electronics",
        subcategory: "smartphones",
        brand: "samsung",
        price: 799,
        stock: 15,
        sku: "SGS24001",
        images: ["https://example.com/galaxy-s24.jpg"],
        status: "active",
        createdAt: "2024-02-10T14:30:00Z",
        updatedAt: "2024-02-10T14:30:00Z",
      },
      {
        id: "3",
        name: 'MacBook Pro 16"',
        category: "electronics",
        subcategory: "laptops",
        brand: "apple",
        price: 2499,
        stock: 8,
        sku: "MBP16001",
        images: ["https://example.com/macbook-pro.jpg"],
        status: "active",
        createdAt: "2024-01-20T09:15:00Z",
        updatedAt: "2024-01-20T09:15:00Z",
      },
      {
        id: "4",
        name: "Nike Air Max 270",
        category: "clothing",
        subcategory: "shoes",
        brand: "nike",
        price: 150,
        stock: 0,
        sku: "NAM270001",
        images: ["https://example.com/nike-air-max.jpg"],
        status: "active",
        createdAt: "2024-03-05T16:45:00Z",
        updatedAt: "2024-03-05T16:45:00Z",
      },
      {
        id: "5",
        name: "Office Chair Pro",
        category: "office",
        subcategory: "furniture",
        brand: "generic",
        price: 299,
        stock: 35,
        sku: "OCP001",
        images: ["https://example.com/office-chair.jpg"],
        status: "active",
        createdAt: "2024-02-28T11:20:00Z",
        updatedAt: "2024-02-28T11:20:00Z",
      },
    ];

    setProducts(mockProducts);
    setLoading(false);
  }, []);

  // Helper function to get subcategories based on category
  const getSubcategories = (category: string) => {
    const subcategories: Record<
      string,
      Array<{ value: string; label: string }>
    > = {
      electronics: [
        { value: "smartphones", label: "Smartphones" },
        { value: "laptops", label: "Laptops" },
        { value: "tablets", label: "Tablets" },
        { value: "audio", label: "Audio" },
      ],
      accessories: [
        { value: "cases", label: "Cases" },
        { value: "chargers", label: "Chargers" },
        { value: "cables", label: "Cables" },
      ],
      office: [
        { value: "furniture", label: "Furniture" },
        { value: "supplies", label: "Supplies" },
        { value: "equipment", label: "Equipment" },
      ],
      clothing: [
        { value: "shirts", label: "Shirts" },
        { value: "pants", label: "Pants" },
        { value: "shoes", label: "Shoes" },
      ],
      home: [
        { value: "kitchen", label: "Kitchen" },
        { value: "bedroom", label: "Bedroom" },
        { value: "garden", label: "Garden" },
      ],
    };
    return subcategories[category] || [];
  };

  // Helper function to get stock status
  const getStockStatus = (stock: number): string => {
    if (stock === 0) return "out_of_stock";
    if (stock < 20) return "low_stock";
    return "active";
  };

  // Helper function to get status class
  const getStatusClass = (status: string): string => {
    switch (status) {
      case "active":
        return "status-active";
      case "low_stock":
        return "status-warning";
      case "out_of_stock":
        return "status-danger";
      default:
        return "status-default";
    }
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Search filter
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter;

      // Subcategory filter
      const matchesSubcategory =
        subcategoryFilter === "all" ||
        product.subcategory === subcategoryFilter;

      // Brand filter
      const matchesBrand =
        brandFilter === "all" || product.brand === brandFilter;

      // Status filter
      const productStatus = getStockStatus(product.stock);
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && product.stock > 20) ||
        (statusFilter === "low_stock" &&
          product.stock > 0 &&
          product.stock <= 20) ||
        (statusFilter === "out_of_stock" && product.stock === 0) ||
        (statusFilter === "discontinued" && product.status === "discontinued");

      // Price range filter
      const matchesPrice =
        (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
        (!priceRange.max || product.price <= parseFloat(priceRange.max));

      // Stock filter
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "high" && product.stock >= 50) ||
        (stockFilter === "medium" &&
          product.stock >= 20 &&
          product.stock < 50) ||
        (stockFilter === "low" && product.stock > 0 && product.stock < 20) ||
        (stockFilter === "zero" && product.stock === 0);

      // Date filter
      const productDate = new Date(product.createdAt);
      const now = new Date();
      const matchesDate =
        dateFilter === "all" ||
        (dateFilter === "today" &&
          productDate.toDateString() === now.toDateString()) ||
        (dateFilter === "week" &&
          now.getTime() - productDate.getTime() <= 7 * 24 * 60 * 60 * 1000) ||
        (dateFilter === "month" &&
          productDate.getMonth() === now.getMonth() &&
          productDate.getFullYear() === now.getFullYear()) ||
        (dateFilter === "quarter" &&
          Math.floor(productDate.getMonth() / 3) ===
            Math.floor(now.getMonth() / 3) &&
          productDate.getFullYear() === now.getFullYear()) ||
        (dateFilter === "year" &&
          productDate.getFullYear() === now.getFullYear());

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubcategory &&
        matchesBrand &&
        matchesStatus &&
        matchesPrice &&
        matchesStock &&
        matchesDate
      );
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "name_desc":
          return b.name.localeCompare(a.name);
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "stock_asc":
          return a.stock - b.stock;
        case "stock_desc":
          return b.stock - a.stock;
        case "created_desc":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "created_asc":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    products,
    searchTerm,
    categoryFilter,
    subcategoryFilter,
    brandFilter,
    statusFilter,
    priceRange,
    stockFilter,
    sortBy,
    dateFilter,
  ]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Modal handlers
  const handleOpenModal = (mode: ModalMode, product?: Product) => {
    setModalMode(mode);
    setSelectedProduct(product || null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = (productData: Partial<Product>) => {
    if (modalMode === "add") {
      const newProduct: Product = {
        id: Date.now().toString(),
        name: productData.name || "",
        category: productData.category || "",
        subcategory: productData.subcategory || "",
        brand: productData.brand || "",
        price: productData.price || 0,
        stock: productData.stock || 0,
        sku: productData.sku || "",
        images: productData.images || [],
        status: productData.status || "active",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts((prev) => [...prev, newProduct]);
    } else if (modalMode === "edit" && selectedProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id
            ? { ...p, ...productData, updatedAt: new Date().toISOString() }
            : p
        )
      );
    }
    handleCloseModal();
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    handleCloseModal();
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setSubcategoryFilter("all");
    setBrandFilter("all");
    setPriceRange({ min: "", max: "" });
    setStockFilter("all");
    setStatusFilter("all");
    setSortBy("name");
    setDateFilter("all");
    setCurrentPage(1);
  };

  // Reset subcategory when category changes
  useEffect(() => {
    setSubcategoryFilter("all");
  }, [categoryFilter]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    categoryFilter,
    subcategoryFilter,
    brandFilter,
    statusFilter,
    priceRange,
    stockFilter,
    dateFilter,
  ]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <main className="products__main">
      <header className="products__navbar">
        <div className="products__navbar_left">
          <h2>Products</h2>
          <p>Manage your product inventory</p>
        </div>
        <div className="products__actions">
          <button
            className="products__add-btn"
            onClick={() => handleOpenModal("add")}
          >
            <FaPlus size={14} />
            <span>Add Product</span>
          </button>
        </div>
      </header>

      <section className="products__filters">
        <div className="products__search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="products__filter-row">
          <div className="products__filter">
            <label>Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="accessories">Accessories</option>
              <option value="office">Office</option>
              <option value="clothing">Clothing</option>
              <option value="home">Home & Garden</option>
            </select>
          </div>

          <div className="products__filter">
            <label>Subcategory</label>
            <select
              value={subcategoryFilter}
              onChange={(e) => setSubcategoryFilter(e.target.value)}
              disabled={categoryFilter === "all"}
            >
              <option value="all">All Subcategories</option>
              {getSubcategories(categoryFilter).map((sub) => (
                <option key={sub.value} value={sub.value}>
                  {sub.label}
                </option>
              ))}
            </select>
          </div>

          <div className="products__filter">
            <label>Brand</label>
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
            >
              <option value="all">All Brands</option>
              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
              <option value="sony">Sony</option>
              <option value="nike">Nike</option>
              <option value="adidas">Adidas</option>
              <option value="generic">Generic</option>
            </select>
          </div>

          <div className="products__filter">
            <label>Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="discontinued">Discontinued</option>
            </select>
          </div>
        </div>

        <div className="products__filter-row">
          <div className="products__filter products__price-filter">
            <label>Price Range</label>
            <div className="price-inputs">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    min: e.target.value,
                  }))
                }
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({
                    ...prev,
                    max: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="products__filter">
            <label>Stock Level</label>
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
            >
              <option value="all">All Levels</option>
              <option value="high">High (50+)</option>
              <option value="medium">Medium (20-49)</option>
              <option value="low">Low (1-19)</option>
              <option value="zero">Out of Stock (0)</option>
            </select>
          </div>

          <div className="products__filter">
            <label>Sort By</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="name">Name (A-Z)</option>
              <option value="name_desc">Name (Z-A)</option>
              <option value="price_asc">Price (Low to High)</option>
              <option value="price_desc">Price (High to Low)</option>
              <option value="stock_asc">Stock (Low to High)</option>
              <option value="stock_desc">Stock (High to Low)</option>
              <option value="created_desc">Newest First</option>
              <option value="created_asc">Oldest First</option>
            </select>
          </div>

          <div className="products__filter">
            <label>Date Added</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        <div className="products__filter-actions">
          <button className="filter-clear-btn" onClick={handleClearFilters}>
            <FaUndo size={12} />
            Clear Filters
          </button>
          <div className="filter-results">
            {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </section>

      <section className="products__content">
        <div className="products__grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product__card">
              <div className="product__image">
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.name} />
                ) : (
                  <div className="product__image-placeholder">
                    <FaImage size={24} />
                  </div>
                )}
                <div className="product__actions">
                  <button
                    className="action-btn view-btn"
                    title="View"
                    onClick={() => handleOpenModal("view", product)}
                  >
                    <FaEye size={12} />
                  </button>
                  <button
                    className="action-btn edit-btn"
                    title="Edit"
                    onClick={() => handleOpenModal("edit", product)}
                  >
                    <FaEdit size={12} />
                  </button>
                  <button
                    className="action-btn delete-btn"
                    title="Delete"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this product?"
                        )
                      ) {
                        handleDeleteProduct(product.id);
                      }
                    }}
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
              <div className="product__info">
                <div className="product__header">
                  <h4 className="product__name">{product.name}</h4>
                  <span
                    className={`product__status ${getStatusClass(
                      getStockStatus(product.stock)
                    )}`}
                  >
                    {product.stock === 0
                      ? "Out"
                      : product.stock < 20
                      ? "Low"
                      : "✓"}
                  </span>
                </div>
                <p className="product__category">{product.category}</p>
                <div className="product__details">
                  <div className="product__price">${product.price}</div>
                  <div className="product__stock">Stock: {product.stock}</div>
                </div>
                <div className="product__meta">
                  <span className="product__sku">{product.sku}</span>
                  <span className="product__brand">{product.brand}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="products__pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="pagination-info">
              {currentPage} / {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </section>

      <ProductModal
        isOpen={modalOpen}
        mode={modalMode}
        product={selectedProduct}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        onDelete={handleDeleteProduct}
      />

      <AdminFooter />
    </main>
  );
};

export default ProductContainer;
