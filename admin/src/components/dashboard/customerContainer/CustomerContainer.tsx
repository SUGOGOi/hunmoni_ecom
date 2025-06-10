import React, { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import AdminFooter from "../../footer/AdminFooter";
import CustomerOrderHistoryModal from "../../customerOrderHistoryModal/CustomerOrderHistoryModal";
import DeleteCustomerModal from "../../deleteCustomerModal/DeleteCustomerModal";
import "./CustomerContainer.scss";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: string;
  lastOrderDate: string;
}

const CustomerContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 10;

  // Modal states
  const [orderHistoryModalOpen, setOrderHistoryModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: "CUS-001",
      name: "John Smith",
      email: "john@example.com",
      phone: "+1 234 567 8900",
      status: "active",
      joinDate: "2023-01-15",
      totalOrders: 12,
      totalSpent: "$1,245.99",
      lastOrderDate: "2025-06-08",
    },
    {
      id: "CUS-002",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1 987 654 3210",
      status: "inactive",
      joinDate: "2022-11-20",
      totalOrders: 3,
      totalSpent: "$89.97",
      lastOrderDate: "2024-12-15",
    },
    {
      id: "CUS-003",
      name: "Mike Wilson",
      email: "mike@example.com",
      phone: "+1 555 123 4567",
      status: "active",
      joinDate: "2024-03-05",
      totalOrders: 8,
      totalSpent: "$567.45",
      lastOrderDate: "2025-06-10",
    },
  ]);

  const handleOpenOrderHistory = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOrderHistoryModalOpen(true);
  };

  const handleOpenDeleteModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setDeleteModalOpen(true);
  };

  const handleDeleteCustomer = (customerId: string) => {
    setCustomers((prev) =>
      prev.filter((customer) => customer.id !== customerId)
    );
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

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
  const startIndex = (currentPage - 1) * customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + customersPerPage
  );

  return (
    <main className="customers__main">
      <header className="customers__navbar">
        <div className="customers__navbar_left">
          <h2>Customers</h2>
          <p>Manage your customer information and relationships</p>
        </div>
        <div className="customers__actions">
          <button className="customers__add-btn">
            <FaPlus size={16} />
            <span>Add Customer</span>
          </button>
        </div>
      </header>

      <section className="customers__filters">
        <div className="customers__search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search customers by name, email, phone, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="customers__filter">
          <FaFilter className="filter-icon" />
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

      <section className="customers__content">
        <div className="customers__table-container">
          <table className="customers__table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="customer-id">{customer.id}</td>
                  <td>
                    <div className="customer-info">
                      <span className="customer-name">{customer.name}</span>
                    </div>
                  </td>
                  <td className="customer-email">{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>
                    <span
                      className={`status ${getStatusClass(customer.status)}`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="orders-count">{customer.totalOrders}</td>
                  <td className="total-spent">{customer.totalSpent}</td>
                  <td>{customer.lastOrderDate}</td>
                  <td>{customer.joinDate}</td>
                  <td>
                    <div className="actions">
                      <button
                        className="action-btn view-btn"
                        title="View Order History"
                        onClick={() => handleOpenOrderHistory(customer)}
                      >
                        <FaEye size={14} />
                      </button>
                      <button
                        className="action-btn edit-btn"
                        title="Edit Customer"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        title="Delete Customer"
                        onClick={() => handleOpenDeleteModal(customer)}
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
          <div className="customers__pagination">
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

      <CustomerOrderHistoryModal
        isOpen={orderHistoryModalOpen}
        customer={selectedCustomer}
        onClose={() => setOrderHistoryModalOpen(false)}
      />

      <DeleteCustomerModal
        isOpen={deleteModalOpen}
        customer={selectedCustomer}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteCustomer}
      />

      <AdminFooter />
    </main>
  );
};

export default CustomerContainer;
