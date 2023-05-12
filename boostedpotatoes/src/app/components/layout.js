"use client";
import Navbar from "./navbar";
import Footer from "./footer";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <ToastContainer />
      <Footer />
    </>
  );
}
