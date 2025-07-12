import { ToastContainer } from 'react-toastify';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from '../src/Components/Navbar';
import AddItems from '../src/Pages/AddItems';
import ListItems from '../src/Pages/ListItems';
import Orders from '../src/Pages/Orders';
import Sidebar from './Pages/Sidebar';
import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Login from './Pages/Login';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'

function App() {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  
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
   // debugger;
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
   // debugger;
    const token = localStorage.getItem('token');
    if (token) {
      return <Navigate to="/additems" replace />;
    }
    return children;
  }

  return (
    <div className="h-screen flex flex-col">
      <ToastContainer />
      <ProtectedRoute><Navbar /></ProtectedRoute>

      {/* Main content below navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <ProtectedRoute><Sidebar /></ProtectedRoute>
       
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Routes>
            <Route path="/additems" element={<ProtectedRoute><AddItems /></ProtectedRoute>} />
            <Route path="/listitems" element={<ProtectedRoute><ListItems /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
            <Route path="/login" element={<ProtectedLogin><Login/></ProtectedLogin>}/>
          </Routes>
        </div>
      </div>

 
    </div>
  );
}

export default App;
