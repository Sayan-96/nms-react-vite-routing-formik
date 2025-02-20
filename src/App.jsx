import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AddNewsForm from './components/AddNewsForm';
import 'bootstrap/dist/css/bootstrap.min.css';
  
  const App = () => {
    return (
      <Router>
        <Header />
        <div className="container py-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-news" element={<AddNewsForm />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    );
  };
  
export default App;
  