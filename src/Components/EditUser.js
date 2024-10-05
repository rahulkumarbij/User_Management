import React, { useState, useEffect } from "react";
import axios from "axios";

const EditUser = ({ user, updateUser, closeEditModal }) => {
  const [formData, setFormData] = useState(user);
  const [error, setError] = useState("");

  useEffect(() => {
    setFormData(user); // Pre-fill the form when the modal opens
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform PUT request to update the user
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${user.id}`, formData)
      .then((response) => {
        updateUser(response.data); // Update the user in the UI
        closeEditModal(); // Close the modal after successful update
        setError("");
      })
      .catch(() => {
        setError("Error updating user");
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              minLength={3}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Street:
            <input
              type="text"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            City:
            <input
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Company Name:
            <input
              type="text"
              name="company.name"
              value={formData.company.name || ""}
              onChange={handleChange}
              minLength={3}
            />
          </label>
          <label>
            Website:
            <input
              type="url"
              name="website"
              value={formData.website || ""}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save Changes</button>
          {error && <p className="error">{error}</p>}
        </form>
        <button onClick={closeEditModal}>Close</button>
      </div>
    </div>
  );
};

export default EditUser;
