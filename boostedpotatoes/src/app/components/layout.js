"use client";
import Navbar from "./navbar";
import Footer from "./footer";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export default function Layout({ children }) {
  const router = useRouter()
  return (
    <><nav>
      <Navbar router={router}/>
      </nav>
      <ToastContainer/>
      <main>{children}</main>
      <Footer />
    </>
  );
}
