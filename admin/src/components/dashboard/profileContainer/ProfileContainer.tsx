import React, { useState } from "react";
import { FaUser, FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import AdminFooter from "../../footer/AdminFooter";
import "./ProfileContainer.scss";

const ProfileContainer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    role: "Administrator",
    department: "Management",
    joinDate: "January 15, 2023",
  });

  const [editData, setEditData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <main className="profile__main">
      <header className="profile__navbar">
        <div className="profile__navbar_left">
          <h2>Profile</h2>
          <p>Manage your personal information and settings</p>
        </div>
        <div className="profile__actions">
          {!isEditing ? (
            <button className="profile__edit-btn" onClick={handleEdit}>
              <FaEdit size={16} />
              <span>Edit Profile</span>
            </button>
          ) : (
            <div className="profile__edit-actions">
              <button className="profile__save-btn" onClick={handleSave}>
                <FaSave size={16} />
                <span>Save</span>
              </button>
              <button className="profile__cancel-btn" onClick={handleCancel}>
                <FaTimes size={16} />
                <span>Cancel</span>
              </button>
            </div>
          )}
        </div>
      </header>

      <section className="profile__content">
        <div className="profile__card">
          <div className="profile__avatar-section">
            <div className="profile__avatar">
              <FaUser size={60} />
              <button className="profile__avatar-edit">
                <FaCamera size={14} />
              </button>
            </div>
            <div className="profile__basic-info">
              <h3>{profileData.name}</h3>
              <p className="profile__role">{profileData.role}</p>
              <p className="profile__department">{profileData.department}</p>
            </div>
          </div>

          <div className="profile__details">
            <div className="profile__section">
              <h4>Personal Information</h4>
              <div className="profile__fields">
                <div className="profile__field">
                  <label>Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                    />
                  ) : (
                    <span>{profileData.name}</span>
                  )}
                </div>
                <div className="profile__field">
                  <label>Email Address</label>
                  <span>{profileData.email}</span>
                </div>
                <div className="profile__field">
                  <label>Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                    />
                  ) : (
                    <span>{profileData.phone}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="profile__section">
              <h4>Work Information</h4>
              <div className="profile__fields">
                <div className="profile__field">
                  <label>Role</label>
                  <span>{profileData.role}</span>
                </div>
                <div className="profile__field">
                  <label>Department</label>
                  <span>{profileData.department}</span>
                </div>
                <div className="profile__field">
                  <label>Join Date</label>
                  <span>{profileData.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdminFooter />
    </main>
  );
};

export default ProfileContainer;
