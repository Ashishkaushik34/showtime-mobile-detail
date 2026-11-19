import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import PressureWashing from '../components/PressureWashing';
import Gallery from '../components/Gallery';
import Reviews from '../components/Reviews';
import EstimateForm from '../components/EstimateForm';
import Footer from '../components/Footer';
import FloatingActions from '../components/FloatingActions';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ServicesGrid />
      <PressureWashing />
      <Reviews />
      <Gallery />
      <EstimateForm />
      <Footer />
      <FloatingActions />
    </>
  );
}
