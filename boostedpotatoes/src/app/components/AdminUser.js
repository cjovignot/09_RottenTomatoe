"use client";
import React, { useState, useEffect } from "react";
import CreateUser from "./admin_create";
import EditProfile from "./admin_edit";
import DeleteUser from "./admin_delete";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [editModalUserId, setEditModalUserId] = useState(null);
  const [deleteModalUserId, setDeleteModalUserId] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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
          {users.map((user) => (
            <tr>
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
                  htmlFor={`my-modal-editprofile-${user.id}`}
                  className="btn"
                  onClick={() => {
                    setEditModalUserId(user.id);
                    setIsEditModalOpen(true);
                  }}
                >
                  Edit
                </button>
                {editModalUserId === user.id && (
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
                  htmlFor={`my-modal-deleteuser-${user.id}`}
                  className="btn btn-error text-3xl font-bold text-white"
                  onClick={() => setDeleteModalUserId(user.id)}
                >
                  X
                </button>
                {deleteModalUserId === user.id && (
                  <DeleteUser userId={user.id} fetchData={getAllusers} />
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
