import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../src/Components/Navbar';
import Footer from '../src/Components/Footer';
import AddItems from '../src/Pages/AddItems';
import ListItems from '../src/Pages/ListItems';
import Orders from '../src/Pages/Orders';
import Sidebar from './Pages/Sidebar';
import './App.css';

function App() {
  return (
    <div className="h-screen flex flex-col">
      <ToastContainer />
      <Navbar />

      {/* Main content below navbar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />
       
        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Routes>
            <Route path="/additems" element={<AddItems />} />
            <Route path="/listitems" element={<ListItems />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>
      </div>

 
    </div>
  );
}

export default App;
