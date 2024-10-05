import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditUser from "./EditUser";

const UserTable = ({ users, deleteUser, updateUser }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Link to={`/user/${user.id}`}>View</Link>
                <button onClick={() => handleEditClick(user)}>Edit</button>
                {/* <button onClick={() => updateUser(user)}>Edit</button> */}
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditModalOpen && (
        <EditUser
          user={selectedUser}
          updateUser={updateUser}
          closeEditModal={closeEditModal}
        />
      )}
    </div>
  );
};

export default UserTable;
