import React, { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaFolder,
  FaTags,
  FaCertificate,
} from "react-icons/fa";
import AdminFooter from "../../footer/AdminFooter";
import CategoryModal from "../../categoryModal/CategoryModal";
import DeleteCategoryModal from "../../deleteCategoryModal/DeleteCategoryModal";
import "./CategoryContainer.scss";

interface Category {
  id: string;
  name: string;
  description: string;
  type: "category" | "subcategory" | "brand";
  parentId?: string;
  parentName?: string;
  status: "active" | "inactive";
  createdDate: string;
  productCount: number;
}

const CategoryContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Modal states
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const [categories, setCategories] = useState<Category[]>([
    {
      id: "CAT-001",
      name: "Electronics",
      description: "Electronic devices and accessories",
      type: "category",
      status: "active",
      createdDate: "2025-01-01",
      productCount: 125,
    },
    {
      id: "SUB-001",
      name: "Smartphones",
      description: "Mobile phones and accessories",
      type: "subcategory",
      parentId: "CAT-001",
      parentName: "Electronics",
      status: "active",
      createdDate: "2025-01-02",
      productCount: 45,
    },
    {
      id: "BRD-001",
      name: "Apple",
      description: "Apple brand products",
      type: "brand",
      status: "active",
      createdDate: "2025-01-03",
      productCount: 89,
    },
    {
      id: "CAT-002",
      name: "Clothing",
      description: "Fashion and apparel",
      type: "category",
      status: "active",
      createdDate: "2025-01-04",
      productCount: 78,
    },
    {
      id: "SUB-002",
      name: "Men's Wear",
      description: "Clothing for men",
      type: "subcategory",
      parentId: "CAT-002",
      parentName: "Clothing",
      status: "active",
      createdDate: "2025-01-05",
      productCount: 34,
    },
    {
      id: "BRD-002",
      name: "Nike",
      description: "Nike sportswear brand",
      type: "brand",
      status: "inactive",
      createdDate: "2025-01-06",
      productCount: 23,
    },
  ]);

  const handleOpenModal = (
    mode: "add" | "edit" | "view",
    category?: Category
  ) => {
    setModalMode(mode);
    setSelectedCategory(category || null);
    setCategoryModalOpen(true);
  };

  const handleOpenDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setDeleteModalOpen(true);
  };

  const handleSaveCategory = (categoryData: Category) => {
    if (modalMode === "add") {
      setCategories((prev) => [...prev, categoryData]);
    } else if (modalMode === "edit") {
      setCategories((prev) =>
        prev.map((c) => (c.id === categoryData.id ? categoryData : c))
      );
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== categoryId));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "category":
        return <FaFolder className="type-icon category" />;
      case "subcategory":
        return <FaTags className="type-icon subcategory" />;
      case "brand":
        return <FaCertificate className="type-icon brand" />;
      default:
        return null;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "status-active";
      case "inactive":
        return "status-inactive";
      default:
        return "";
    }
  };

  const getParentCategories = () => {
    return categories.filter((cat) => cat.type === "category");
  };

  const filteredCategories = categories.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || category.type === typeFilter;
    const matchesStatus =
      statusFilter === "all" || category.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentCategories = filteredCategories.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <main className="categories__main">
      <header className="categories__navbar">
        <div className="categories__navbar_left">
          <h2>Categories Management</h2>
          <p>
            Organize your products with categories, subcategories, and brands
          </p>
        </div>
        <div className="categories__actions">
          <button
            className="categories__add-btn"
            onClick={() => handleOpenModal("add")}
          >
            <FaPlus size={16} />
            <span>Add Category</span>
          </button>
        </div>
      </header>

      <section className="categories__filters">
        <div className="categories__search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search categories, subcategories, or brands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="categories__filter">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="category">Categories</option>
            <option value="subcategory">Subcategories</option>
            <option value="brand">Brands</option>
          </select>
        </div>
        <div className="categories__filter">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </section>

      <section className="categories__content">
        <div className="categories__table-container">
          <table className="categories__table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Name</th>
                <th>Description</th>
                <th>Parent</th>
                <th>Products</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category) => (
                <tr key={category.id}>
                  <td>
                    <div className="category-type">
                      {getTypeIcon(category.type)}
                      <span>{category.type}</span>
                    </div>
                  </td>
                  <td className="category-name">{category.name}</td>
                  <td className="category-description">
                    {category.description}
                  </td>
                  <td>{category.parentName || "-"}</td>
                  <td className="product-count">{category.productCount}</td>
                  <td>
                    <span
                      className={`status ${getStatusClass(category.status)}`}
                    >
                      {category.status}
                    </span>
                  </td>
                  <td>{category.createdDate}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="action-btn view-btn"
                        title="View Details"
                        onClick={() => handleOpenModal("view", category)}
                      >
                        <FaEye size={14} />
                      </button>
                      <button
                        className="action-btn edit-btn"
                        title="Edit Category"
                        onClick={() => handleOpenModal("edit", category)}
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        title="Delete Category"
                        onClick={() => handleOpenDeleteModal(category)}
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="categories__pagination">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <div className="pagination-info">
              Page {currentPage} of {totalPages}
            </div>
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

      <CategoryModal
        isOpen={categoryModalOpen}
        mode={modalMode}
        category={selectedCategory}
        parentCategories={getParentCategories()}
        onClose={() => setCategoryModalOpen(false)}
        onSave={handleSaveCategory}
      />

      <DeleteCategoryModal
        isOpen={deleteModalOpen}
        category={selectedCategory}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteCategory}
      />

      <AdminFooter />
    </main>
  );
};

export default CategoryContainer;
