import React, { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaPercent,
  FaDollarSign,
} from "react-icons/fa";
import AdminFooter from "../footer/AdminFooter";
import CouponModal from "../couponModal/CouponModal";
import DeleteCouponModal from "../deleteCouponModal/DeleteCouponModal";
import "./CouponContainer.scss";

interface Coupon {
  id: string;
  code: string;
  description: string;
  type: "percentage" | "fixed";
  value: number;
  minOrderAmount: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  status: "active" | "inactive" | "expired";
  startDate: string;
  endDate: string;
  createdDate: string;
}

const CouponContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const couponsPerPage = 10;

  // Modal states
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "CPN-001",
      code: "WELCOME20",
      description: "Welcome discount for new customers",
      type: "percentage",
      value: 20,
      minOrderAmount: 50,
      maxDiscount: 100,
      usageLimit: 1000,
      usedCount: 245,
      status: "active",
      startDate: "2025-01-01",
      endDate: "2025-12-31",
      createdDate: "2025-01-01",
    },
    {
      id: "CPN-002",
      code: "SAVE10",
      description: "Fixed $10 discount",
      type: "fixed",
      value: 10,
      minOrderAmount: 25,
      usageLimit: 500,
      usedCount: 89,
      status: "active",
      startDate: "2025-03-01",
      endDate: "2025-06-30",
      createdDate: "2025-02-28",
    },
    {
      id: "CPN-003",
      code: "SUMMER25",
      description: "Summer sale discount",
      type: "percentage",
      value: 25,
      minOrderAmount: 100,
      maxDiscount: 50,
      usageLimit: 200,
      usedCount: 156,
      status: "active",
      startDate: "2025-06-01",
      endDate: "2025-08-31",
      createdDate: "2025-05-15",
    },
    {
      id: "CPN-004",
      code: "EXPIRED15",
      description: "Expired promotional code",
      type: "percentage",
      value: 15,
      minOrderAmount: 30,
      usageLimit: 100,
      usedCount: 100,
      status: "expired",
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      createdDate: "2024-11-15",
    },
  ]);

  const handleOpenModal = (mode: "add" | "edit" | "view", coupon?: Coupon) => {
    setModalMode(mode);
    setSelectedCoupon(coupon || null);
    setCouponModalOpen(true);
  };

  const handleOpenDeleteModal = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
    setDeleteModalOpen(true);
  };

  const handleSaveCoupon = (couponData: Coupon) => {
    if (modalMode === "add") {
      setCoupons((prev) => [...prev, couponData]);
    } else if (modalMode === "edit") {
      setCoupons((prev) =>
        prev.map((c) => (c.id === couponData.id ? couponData : c))
      );
    }
  };

  const handleDeleteCoupon = (couponId: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== couponId));
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "active":
        return "status-active";
      case "inactive":
        return "status-inactive";
      case "expired":
        return "status-expired";
      default:
        return "";
    }
  };

  const formatValue = (coupon: Coupon) => {
    return coupon.type === "percentage"
      ? `${coupon.value}%`
      : `$${coupon.value}`;
  };

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || coupon.status === statusFilter;
    const matchesType = typeFilter === "all" || coupon.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalPages = Math.ceil(filteredCoupons.length / couponsPerPage);
  const startIndex = (currentPage - 1) * couponsPerPage;
  const currentCoupons = filteredCoupons.slice(
    startIndex,
    startIndex + couponsPerPage
  );

  return (
    <main className="coupons__main">
      <header className="coupons__navbar">
        <div className="coupons__navbar_left">
          <h2>Coupons</h2>
          <p>Create and manage discount coupons for your store</p>
        </div>
        <div className="coupons__actions">
          <button
            className="coupons__add-btn"
            onClick={() => handleOpenModal("add")}
          >
            <FaPlus size={16} />
            <span>Add Coupon</span>
          </button>
        </div>
      </header>

      <section className="coupons__filters">
        <div className="coupons__search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search coupons by code, description, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="coupons__filter">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>
        </div>
        <div className="coupons__filter">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
          </select>
        </div>
      </section>

      <section className="coupons__content">
        <div className="coupons__table-container">
          <table className="coupons__table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Description</th>
                <th>Type</th>
                <th>Value</th>
                <th>Min Order</th>
                <th>Usage</th>
                <th>Status</th>
                <th>Valid Until</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCoupons.map((coupon) => (
                <tr key={coupon.id}>
                  <td className="coupon-code">{coupon.code}</td>
                  <td className="coupon-description">{coupon.description}</td>
                  <td>
                    <div className="coupon-type">
                      {coupon.type === "percentage" ? (
                        <FaPercent className="type-icon percentage" />
                      ) : (
                        <FaDollarSign className="type-icon fixed" />
                      )}
                      <span>{coupon.type}</span>
                    </div>
                  </td>
                  <td className="coupon-value">{formatValue(coupon)}</td>
                  <td>${coupon.minOrderAmount}</td>
                  <td className="usage-info">
                    <span className="usage-count">
                      {coupon.usedCount}/{coupon.usageLimit}
                    </span>
                    <div className="usage-bar">
                      <div
                        className="usage-progress"
                        style={{
                          width: `${
                            (coupon.usedCount / coupon.usageLimit) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </td>
                  <td>
                    <span className={`status ${getStatusClass(coupon.status)}`}>
                      {coupon.status}
                    </span>
                  </td>
                  <td>{coupon.endDate}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="action-btn view-btn"
                        title="View Details"
                        onClick={() => handleOpenModal("view", coupon)}
                      >
                        <FaEye size={14} />
                      </button>
                      <button
                        className="action-btn edit-btn"
                        title="Edit Coupon"
                        onClick={() => handleOpenModal("edit", coupon)}
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        title="Delete Coupon"
                        onClick={() => handleOpenDeleteModal(coupon)}
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
          <div className="coupons__pagination">
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

      <CouponModal
        isOpen={couponModalOpen}
        mode={modalMode}
        coupon={selectedCoupon}
        onClose={() => setCouponModalOpen(false)}
        onSave={handleSaveCoupon}
      />

      <DeleteCouponModal
        isOpen={deleteModalOpen}
        coupon={selectedCoupon}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteCoupon}
      />

      <AdminFooter />
    </main>
  );
};

export default CouponContainer;
