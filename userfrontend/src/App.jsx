import {useState} from 'react'
import Navbar from './components/Navbar/Navbar'
import { Routes,Route } from'react-router-dom'
import Home from './screens/Home/Home'
import Cart from './screens/Cart/Cart'
import PlaceOrder from './screens/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import {ToastContainer} from 'react-toastify'

const App = () => {

  const [showLogin,setShowLogin] = useState(false)

  return (
    <>
      <ToastContainer />
      {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        <Navbar showLogin={showLogin} setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/order' element={<PlaceOrder/>}></Route>
        </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App