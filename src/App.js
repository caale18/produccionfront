import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import React from 'react';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/Home';

import ProductDetails from './components/product/ProductDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          {/* Definición de rutas usando Routes y Route */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
