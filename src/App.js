import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Signin from './pages/Auth/Signin/Signin';
import Signup from './pages/Auth/Signup/Signup';
import Products from './pages/Products/Products';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Products/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
