import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CompareProvider } from './contexts/CompareContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingButtons from './components/FloatingButtons';
import CompareFloatingButton from './components/CompareFloatingButton';
import AppPreloader from './components/AppPreloader';
import Home from './pages/Home';
import RFIDProducts from './pages/RFIDProducts';
import ProductDetail from './pages/ProductDetail';
import Compare from './pages/Compare';
import RFIDSolutions from './pages/RFIDSolutions';
import SolutionDetail from './pages/SolutionDetail';
import ThadoNews from './pages/ThadoNews';
import NewsDetail from './pages/NewsDetail';
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
        <CompareProvider>
          <AppPreloader showProgress={false}>
            <ScrollToTop />
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/rfid-products" element={<RFIDProducts />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/rfid-solutions" element={<RFIDSolutions />} />
                  <Route path="/solution/:id" element={<SolutionDetail />} />
                  <Route path="/thado-news" element={<ThadoNews />} />
                  <Route path="/thado-news/:id" element={<NewsDetail />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/about-us" element={<AboutUs />} />
                  <Route path="/contact-us" element={<ContactUs />} />
                </Routes>
              </main>
              <Footer />
              <FloatingButtons />
              <CompareFloatingButton />
            </div>
          </AppPreloader>
        </CompareProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
