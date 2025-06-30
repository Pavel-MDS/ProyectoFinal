// src/layouts/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Layout.css';

const Layout = () => (
  <div className="layout-container">
    <Navbar />
    <main className="layout-content">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
