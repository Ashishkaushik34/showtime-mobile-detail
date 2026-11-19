import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import Overview from './pages/admin/Overview';
import Leads from './pages/admin/Leads';
import ServicesManager from './pages/admin/ServicesManager';
import GalleryReviewsManager from './pages/admin/GalleryReviewsManager';
import { initData } from './data/store';

initData();

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminLayout />}>
        <Route index element={<Overview />} />
        <Route path="leads" element={<Leads />} />
        <Route path="services" element={<ServicesManager />} />
        <Route path="gallery-reviews" element={<GalleryReviewsManager />} />
      </Route>
    </Routes>
  );
}
