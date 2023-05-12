"use client";
import Navbar from "./navbar";
import Footer from "./footer";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Layout({ children }) {
  const router = useRouter()
  return (
    <><nav>
      <Navbar router={router}/>
      </nav>
      <main>{
      children}
      <ToastContainer />
      </main>
      <Footer />
    </>
  );
}
