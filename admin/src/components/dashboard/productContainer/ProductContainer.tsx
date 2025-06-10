import React, { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaImage,
} from "react-icons/fa";
import AdminFooter from "../../footer/AdminFooter";
import ProductModal from "../../productModal/ProductModal";
import "./ProductContainer.scss";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  stock: number;
  status: string;
  images: string[];
  description: string;
  sku: string;
  dateAdded: string;
}

const ProductsContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "add">("view");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [products, setProducts] = useState<Product[]>([
    {
      id: "PRD-001",
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$149.99",
      stock: 45,
      status: "active",
      images: [],
      description:
        "High-quality wireless headphones with noise cancellation technology",
      sku: "WH-001",
      dateAdded: "2025-06-01",
    },
    {
      id: "PRD-002",
      name: "Smartphone Case",
      category: "Accessories",
      price: "$24.99",
      stock: 120,
      status: "active",
      images: [],
      description: "Protective case for smartphones with premium materials",
      sku: "SC-002",
      dateAdded: "2025-06-02",
    },
    {
      id: "PRD-003",
      name: "Laptop Stand",
      category: "Office",
      price: "$89.99",
      stock: 0,
      status: "out_of_stock",
      images: [],
      description: "Adjustable laptop stand for better ergonomics",
      sku: "LS-003",
      dateAdded: "2025-06-03",
    },
    {
      id: "PRD-004",
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: "$149.99",
      stock: 25,
      status: "active",
      images: [],
      description: "Portable Bluetooth speaker with premium sound",
      sku: "BS-004",
      dateAdded: "2025-06-04",
    },
    {
      id: "PRD-005",
      name: "USB Cable",
      category: "Accessories",
      price: "$9.99",
      stock: 200,
      status: "active",
      images: [],
      description: "High-speed USB charging cable",
      sku: "UC-005",
      dateAdded: "2025-06-05",
    },
    {
      id: "PRD-006",
      name: "Gaming Mouse",
      category: "Electronics",
      price: "$79.99",
      stock: 15,
      status: "low_stock",
      images: [],
      description: "Professional gaming mouse with RGB lighting",
      sku: "GM-006",
      dateAdded: "2025-06-06",
    },
  ]);

  const handleOpenModal = (
    mode: "view" | "edit" | "add",
    product?: Product
  ) => {
    setModalMode(mode);
    setSelectedProduct(product || null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSaveProduct = (productData: Product) => {
    if (modalMode === "add") {
      setProducts((prev) => [...prev, productData]);
    } else if (modalMode === "edit") {
      setProducts((prev) =>
        prev.map((p) => (p.id === productData.id ? productData : p))
      );
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "status-active";
      case "inactive":
        return "status-inactive";
      case "out_of_stock":
        return "status-out-of-stock";
      case "low_stock":
        return "status-low-stock";
      default:
        return "";
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return "out_of_stock";
    if (stock < 20) return "low_stock";
    return "active";
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" ||
      product.category.toLowerCase() === categoryFilter.toLowerCase();
    const actualStatus =
      product.status === "active"
        ? getStockStatus(product.stock)
        : product.status;
    const matchesStatus =
      statusFilter === "all" || actualStatus === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

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
        <div className="products__filter">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="accessories">Accessories</option>
            <option value="office">Office</option>
          </select>
        </div>
        <div className="products__filter">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
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
                  <div className="product__price">{product.price}</div>
                  <div className="product__stock">Stock: {product.stock}</div>
                </div>
                <div className="product__meta">
                  <span className="product__sku">{product.sku}</span>
                  <span className="product__id">{product.id}</span>
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

export default ProductsContainer;
