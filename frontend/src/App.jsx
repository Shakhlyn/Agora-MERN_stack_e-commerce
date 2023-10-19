import { Outlet } from "react-router-dom";

import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <dv>
      <Header />
      <main className="py-8 w-11/12 m-auto ">
        <Outlet />
      </main>
      <Footer />
    </dv>
  );
}
