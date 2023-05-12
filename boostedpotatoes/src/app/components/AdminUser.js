"use client";
import React, { useState, useEffect } from "react";
import CreateUser from "./admin_create";
import EditProfile from "./admin_edit";
import DeleteUserModal from "./admin_delete";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [editModalUserId, setEditModalUserId] = useState(null);
  const [deleteModalUserId, setDeleteModalUserId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editModalUserIndex, setEditModalUserIndex] = useState(null);
  async function getAllusers() {
    const res = await fetch(`http://localhost:3001/users`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }
    const data = await res.json();
    console.log("MA USER DATA", data);
    setUsers(data);
  }

  useEffect(() => {
    getAllusers();
  }, []);

  return (
    <>
      <div className="flex justify-center m-5">
        <button
          htmlFor="my-modal-signup"
          className="btn btn-success text-white"
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add User
        </button>
        <CreateUser
          isModalOpen={isCreateModalOpen}
          setIsModalOpen={setIsCreateModalOpen}
          fetchData={getAllusers}
        />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              {user.isAdmin ? (
                <td>
                  <b> Admin</b>
                </td>
              ) : (
                <td>User</td>
              )}
              <td>
                <button
                  className="btn"
                  onClick={() => {
                    setIsEditModalOpen(true);
                    setEditModalUserIndex(index);
                  }}
                >
                  Edit
                </button>

                {editModalUserIndex === index && (
                  <EditProfile
                    user={user}
                    fetchData={getAllusers}
                    isModalOpen={isEditModalOpen}
                    setIsModalOpen={setIsEditModalOpen}
                  />
                )}
              </td>

              <td>
                <button
                  className="btn btn-error text-3xl font-bold text-white"
                  onClick={() => setDeleteModalUserId(user._id)}
                >
                  X
                </button>
                {deleteModalUserId === user._id && (
                  <DeleteUserModal
                    userId={user._id}
                    fetchData={getAllusers}
                    setIsModalOpen={setDeleteModalUserId}
                    isModalOpen={deleteModalUserId !== null} // Pass true if deleteModalUserId is not null
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
