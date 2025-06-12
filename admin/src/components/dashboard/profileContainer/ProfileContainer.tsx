import React, { useState } from "react";
import { FaUser, FaEdit, FaSave, FaTimes, FaCamera } from "react-icons/fa";
import AdminFooter from "../../footer/AdminFooter";
import "./ProfileContainer.scss";
import { SERVER_URL, useStore } from "../../../store/store";
import Loading from "../../loading/Loading";
import axios from "axios";
import toast from "react-hot-toast";

function capitalize(word: string) {
  if (!word) return "";
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

const ProfileContainer = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isEditName, setIsEditName] = useState("");
  const [isEditPhone, setIsEditPhone] = useState("");
  const { admin, setAdmin } = useStore();

  const handleEdit = () => {
    setIsEditing(true);
    setIsEditName(admin!.name);
    setIsEditPhone(admin!.phone);
  };

  const handleSave = async () => {
    setIsEditing(false);

    try {
      const response = await axios.post(
        `${SERVER_URL}/api/admin/edit-details`,
        {
          name: isEditName,
          phone: isEditPhone,
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.success === true) {
        toast(`${response.data.message}`, {
          // icon: "✔",
          style: {
            borderRadius: "13px",
            background: "#123623",
            color: "#16c864",
          },
        });

        setAdmin(response.data.admin);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          toast(`${error.response.data.error}`, {
            // icon: "✔",
            style: {
              borderRadius: "13px",
              background: "#3e1220",
              color: "#ca2d44",
            },
          });
        } else {
          toast(`Server Error!`, {
            // icon: "✔",
            style: {
              borderRadius: "13px",
              background: "#3e1220",
              color: "#ca2d44",
            },
          });
        }
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <>
      {admin ? (
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
                  <button
                    className="profile__cancel-btn"
                    onClick={handleCancel}
                  >
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
                  <h3>{capitalize(admin.name)}</h3>
                  <p className="profile__role">{capitalize(admin.role)}</p>
                  <p className="profile__department">Managemant</p>
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
                          value={isEditName}
                          onChange={(e) => setIsEditName(e.target.value)}
                        />
                      ) : (
                        <span>{capitalize(admin.name)}</span>
                      )}
                    </div>
                    <div className="profile__field">
                      <label>Email Address</label>
                      <span>{admin.email}</span>
                    </div>
                    <div className="profile__field">
                      <label>Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={isEditPhone}
                          onChange={(e) => setIsEditPhone(e.target.value)}
                        />
                      ) : (
                        <span>{`+91 ${admin.phone}`}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="profile__section">
                  <h4>Work Information</h4>
                  <div className="profile__fields">
                    <div className="profile__field">
                      <label>Role</label>
                      <span>{capitalize(admin.role)}</span>
                    </div>
                    {/* <div className="profile__field">
                      <label>Department</label>
                      <span>{profileData.department}</span>
                    </div> */}
                    <div className="profile__field">
                      <label>Join Date</label>
                      <span>{admin.createdAt.slice(0, 10)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <AdminFooter />
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ProfileContainer;
