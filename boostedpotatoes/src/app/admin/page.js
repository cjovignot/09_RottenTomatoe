import React from "react";
import TableDisplay from "../components/AdminMovie";
import UserDisplay from "../components/AdminUser";

export default function Admin() {
  return (
    <>
      <link href="/dist/output.css" rel="stylesheet" />
      <UserDisplay />
      <TableDisplay />
    </>
  );
}
