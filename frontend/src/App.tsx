import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingButtons from './components/FloatingButtons';
import Home from './pages/Home';
import RFIDProducts from './pages/RFIDProducts';
import ProductDetail from './pages/ProductDetail';
import RFIDSolutions from './pages/RFIDSolutions';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rfid-products" element={<RFIDProducts />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/rfid-solutions" element={<RFIDSolutions />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </Router>
  );
}

export default App;
