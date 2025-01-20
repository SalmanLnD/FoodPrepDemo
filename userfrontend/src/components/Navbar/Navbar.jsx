import {useState,useContext} from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'
import {Link} from 'react-router-dom'
import {StoreContext} from '../../context/StoreContext'


const Navbar = ({showLogin,setShowLogin}) => {

    const [menu, setMenu] = useState('home')
    const {getTotalCartAmount} = useContext(StoreContext);

  return (
    <div className="navbar">
        <Link to='/'><img className='logo' src={assets.logo} alt="" /></Link>
        <ul className='navbar-menu'>
            <Link to='/' className = {menu ==='home' ? 'active' : ''}  onClick={()=>setMenu('home')} >Home</Link>
            <a href='#food-display' className = {menu ==='menu' ? 'active' : ''} onClick={()=>setMenu('menu')} >Menu</a>
            <a href='#footer' className = {menu ==='contact-us' ? 'active' : ''} onClick={()=>setMenu('contact-us')}>Contact us</a>
        </ul>
        <div className="navbar-right">
            <div className="dot-basket">
                <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()!==0?"dot":""}></div>
            </div>
            <button onClick={()=>setShowLogin(true)}>Sign in</button>
        </div>
    </div>
  )
}

export default Navbar