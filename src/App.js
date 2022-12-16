import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Signin from './pages/Auth/Signin/Signin';
import Signup from './pages/Auth/Signup/Signup';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Products from './pages/Products/Products';

function App() {
  return (
    <div className="App min-vh-100 d-flex flex-column">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Products/>}/>
        <Route path='/product/:product_id' element={<ProductDetail/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
