"use client";

import React, { useState, useEffect } from "react";

const Table = () => {
  const [users, setUsers] = useState([]);
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
              <button className="btn">Edit</button>
            </td>
            <td>
              <button className="btn btn-error text-3xl font-bold text-white">
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
