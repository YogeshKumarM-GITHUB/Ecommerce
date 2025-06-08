import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Collection from './Pages/Collection'
import Contact from './Pages/Contact'
import About from './Pages/About'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import ProductPage from './Pages/ProductPage'
function App() {


  return (
    <div className='-mt-9'>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/collection' element={<Collection />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/productpage/:_id' element={<ProductPage/>}></Route>
        </Routes>
        <Footer/>
    </div>
  )
}

export default App
