import { Link, Outlet } from 'react-router-dom';
import Container from './components/layout/Container';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';

function App() {
  return (

    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>

    
  );
}

export default App;
