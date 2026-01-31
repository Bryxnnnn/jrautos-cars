import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <LanguageProvider>
      <div className="App bg-[#050505] min-h-screen">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <Footer />
          <WhatsAppButton />
          <Toaster />
        </BrowserRouter>
      </div>
    </LanguageProvider>
  );
}

export default App;
