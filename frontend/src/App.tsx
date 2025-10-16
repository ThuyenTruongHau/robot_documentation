import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingButtons from './components/FloatingButtons';
import Home from './pages/Home';
import RFIDProducts from './pages/RFIDProducts';
import ProductDetail from './pages/ProductDetail';
import RFIDSolutions from './pages/RFIDSolutions';
import ThadoNews from './pages/ThadoNews';
import SearchResults from './pages/SearchResults';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

// Component to scroll to top on route change
const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Only scroll to top when pathname changes (page navigation)
    // Don't scroll when only query params change (e.g., category selection)
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [location.pathname]);

  return null;
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rfid-products" element={<RFIDProducts />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/rfid-solutions" element={<RFIDSolutions />} />
              <Route path="/thado-news" element={<ThadoNews />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/contact-us" element={<ContactUs />} />
            </Routes>
          </main>
          <Footer />
          <FloatingButtons />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
