import React, { useState } from "react";
import axios from "axios";

const UserForm = ({ addUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    username: `USER-${Date.now()}`,
    address: { street: "", city: "" },
    company: { name: "" },
    website: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.length < 3 || formData.email.length < 5) {
      setError("Please enter valid details");
      return;
    }

    axios
      .post("https://jsonplaceholder.typicode.com/users", formData)
      .then((response) => {
        addUser(response.data);
        setError("");
      })
      .catch(() => setError("Error adding user"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create User</h2>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        required
      />
      <input
        name="address.street"
        placeholder="Street"
        onChange={handleChange}
        required
      />
      <input
        name="address.city"
        placeholder="City"
        onChange={handleChange}
        required
      />
      <input
        name="company.name"
        placeholder="Company Name"
        onChange={handleChange}
      />
      <input name="website" placeholder="Website" onChange={handleChange} />
      <button type="submit">Create</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default UserForm;
