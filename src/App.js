import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
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
        <Route exact path="/" element={<Products/>}/>
        <Route path='/product/:product_id' element={<ProductDetail/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path='/profile' element={<ProtectedRoute/>}>
          <Route exact path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='/cart' element={<ProtectedRoute/>}>
          <Route exact path='/cart' element={<Basket/>}/>
        </Route>
        <Route path='*' element={<Error404/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
