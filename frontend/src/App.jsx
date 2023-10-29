import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="flex flex-col h-screen">
      <ToastContainer />
      <Header />
      <main className="py-8 w-11/12 mx-auto mb-auto ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
