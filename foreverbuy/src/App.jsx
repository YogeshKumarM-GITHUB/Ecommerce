import './App.css'
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import ProductPage from './Pages/ProductPage'
import CartPage from './Pages/CartPage'
import PlaceOrder from './Pages/PlaceOrder'
import MyOrders from './Pages/MyOrders'
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { GetAllProducts } from './features/products/productsSlice'
import { GetUserDetails } from './features/User/UserSlice'
import Login from './Pages/Login'
import { jwtDecode } from 'jwt-decode'

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetAllProducts());
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // debugger;
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded, 'token')
        const Email = decoded.Email;
        if (Email) {
          dispatch(GetUserDetails({ Email }));
        } else {
          navigate('/login', { replace: true });
        }
      } catch (error) {
        console.error('Token invalid or expired');
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      }
    } else {
      navigate('/login', { replace: true });
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" replace />;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;
      if (decoded.exp && decoded.exp < now) {
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
      }
      return children;
    } catch (error) {
      localStorage.removeItem('token');
      return <Navigate to="/login" replace />;
    }
  };

  const ProtectedLogin = ({ children }) => {
    const token = localStorage.getItem('token');
    if (token) {
      return <Navigate to="/" replace />;
    }
    return children;
  }

  return (
    <div className='-mt-9'>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/collection' element={<ProtectedRoute><Collection /></ProtectedRoute>} />
        <Route path='/contact' element={<ProtectedRoute><Contact /></ProtectedRoute>} />
        <Route path='/about' element={<ProtectedRoute><About /></ProtectedRoute>} />
        <Route path='/productpage/:_id' element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
        <Route path='/cartpage' element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
        <Route path='/placeorder' element={<ProtectedRoute><PlaceOrder /></ProtectedRoute>} />
        <Route path='/myorder' element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />


        <Route path='/login' element={<ProtectedLogin><Login /></ProtectedLogin>} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
