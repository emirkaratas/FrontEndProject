import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Admin from './pages/Admin/Admin';
import Home from './pages/Admin/Home/Home';
import AdminProducts from './pages/Admin/Products/AdminProducts';
import Orders from './pages/Admin/Orders/Orders';
import Signin from './pages/Auth/Signin/Signin';
import Signup from './pages/Auth/Signup/Signup';
import Basket from './pages/Basket/Basket';
import Error404 from './pages/Error404/Error404';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Products from './pages/Products/Products';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './pages/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <div className="App min-vh-100 d-flex flex-column">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Products />} />
        <Route path='/product/:product_id' element={<ProductDetail />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/profile' element={<ProtectedRoute />}>
          <Route exact path='/profile' element={<Profile />} />
        </Route>
        <Route path='/cart' element={<ProtectedRoute />}>
          <Route exact path='/cart' element={<Basket />} />
        </Route>
        <Route path='/admin/*' element={<ProtectedRoute admin={true} />}>
          <Route exact path='/admin/*' element={<Admin />}>
            <Route path='' element={<Home />} />
            <Route path='orders' element={<Orders />} />
            <Route path='products' element={<AdminProducts />} />
          </Route>
        </Route>
        <Route path='*' element={<Error404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
