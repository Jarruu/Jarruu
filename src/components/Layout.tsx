import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ConstellationField from "./ui/constellation-field";

export default function Layout() {
  return (
    <div className="text-on-background font-body-md min-h-screen flex flex-col relative overflow-x-hidden selection:bg-secondary-container selection:text-on-secondary-container">
      <ConstellationField opacity={0.35} />
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
