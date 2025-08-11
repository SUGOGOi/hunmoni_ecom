import React, { useEffect, useState } from "react";
import { FaSearch, FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import AdminFooter from "../../footer/AdminFooter";
import BrandModal from "../../brandModal/BrandModal";
import "./BrandContainer.scss";
import type { Brand, BrandInput } from "../../../types/types";
import { useStore } from "../../../store/store";
import axios from "axios";
import Loading from "../../loading/Loading";

const BrandContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "add">("view");
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const { brands, setBrands } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  const handleOpenModal = (mode: "view" | "edit" | "add", brand?: Brand) => {
    setModalMode(mode);
    setSelectedBrand(brand || null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBrand(null);
  };

  const handleSaveBrand = async (formData: BrandInput) => {
    try {
      if (modalMode === "add") {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/admin/brand/add`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
      } else if (modalMode === "edit") {
        console.log("edit mode");
      }
    } catch (error) {
      console.log(`error : ${error}`);
    }
  };

  //   const handleDeleteBrand = (brandId: string) => {
  //     setBrands((prev) => prev.filter((b) => b.id !== brandId));
  //   };

  const filteredBrands = brands
    ? brands.filter(
        (brand) =>
          brand.name!.toLowerCase() ||
          brand.description!.toLowerCase() ||
          brand.id!.toLowerCase()
      )
    : [];
  //   console.log(filteredBrands[0].isActive);

  useEffect(() => {
    if (brands === null) {
      setIsLoading(true);
      const getBrands = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/admin/brand/get-all`,
            {
              withCredentials: true,
            }
          );

          if (response.data.success === true) {
            setBrands(response.data.brands);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error);
          setIsLoading(false);
        }
      };
      getBrands();
    } else {
      return;
    }
  }, [setBrands, brands]);

  return (
    <>
      {brands ? (
        <main className="brands__main">
          <header className="brands__navbar">
            <div className="brands__navbar_left">
              <h2>Brands</h2>
              <p>Manage your store's brands and partners</p>
            </div>
            <div className="brands__actions">
              <button
                className="brands__add-btn"
                onClick={() => handleOpenModal("add")}
              >
                <FaPlus size={16} />
                <span>Add Brand</span>
              </button>
            </div>
          </header>

          <section className="brands__filters">
            <div className="brands__search">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search brands by name, description, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </section>

          <section className="brands__content">
            <div className="brands__table-container">
              {filteredBrands.length > 0 ? (
                <table className="brands__table">
                  <thead>
                    <tr>
                      <th>Logo</th>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Created</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBrands.map((brand) => (
                      <tr key={brand.id}>
                        <td>
                          {brand.logoUrl ? (
                            <img
                              src={brand.logoUrl}
                              alt={brand.name}
                              className="brand-logo"
                            />
                          ) : (
                            <div className="brand-logo-placeholder">
                              No Logo
                            </div>
                          )}
                        </td>
                        <td>{brand.name}</td>
                        <td className="brand-description">
                          {brand.description}
                        </td>
                        <td>
                          <span className={`status status-${brand.status}`}>
                            {brand.status!.toLowerCase()}
                          </span>
                        </td>
                        <td>{brand.createdAt!.toString().split("T")[0]}</td>
                        <td>
                          <div className="actions">
                            <button
                              className="action-btn view-btn"
                              title="View Brand"
                              onClick={() => handleOpenModal("view", brand)}
                            >
                              <FaEye size={14} />
                            </button>
                            <button
                              className="action-btn edit-btn"
                              title="Edit Brand"
                              onClick={() => handleOpenModal("edit", brand)}
                            >
                              <FaEdit size={14} />
                            </button>
                            <button
                              className="action-btn delete-btn"
                              title="Delete Brand"
                              // onClick={() => handleDeleteBrand(brand.id)}
                            >
                              <FaTrash size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>
                  No brands available. Click 'Add Brand' to create your first
                  one!
                </p>
              )}
            </div>
          </section>

          <BrandModal
            isOpen={modalOpen}
            mode={modalMode}
            brand={selectedBrand}
            onClose={handleCloseModal}
            onSave={handleSaveBrand}
          />

          <AdminFooter />
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default BrandContainer;
