import React,{useState} from 'react';
import './Navbar.css';

const Navbar = () => {
    const [burger_class, setBurgerClass] = useState('burger-bar unclicked');
    const [menu_class, setMenuClass] = useState('menu hidden');
    const [isMenuClicked, setIsMenuClicked] = useState(false);

    //toggle burger menu change

    const updateMenu = () => {
        if(!isMenuClicked){
          setBurgerClass('burger-bar clicked');
          setMenuClass("menu visible")
           
        }
        else{
             setBurgerClass('burger-bar unclicked');
             setMenuClass("menu hidden")       
        }
        setIsMenuClicked(!isMenuClicked)
    }
      return (
    <div style={{width:'100%',height:'100vh'}}>
      <nav>
        <div className='burger-menu' onClick={updateMenu}>
            <div className={burger_class}></div>
            <div className={burger_class} ></div>
            <div className={burger_class} ></div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
