import React from 'react'
//import { Link} from 'react-router-dom';
import footer from '../../componentes/footer/Footer.jsx';
import menu from '../../componentes/menu/Navbar.jsx';
import './Home.css'

const HomeScreen = () => {
  return (
    
    <div>
      <h1 className='title'>Trabajo practico para la UTN</h1>
      <menu/>
      <footer/>
    </div> 

  )
}

export default HomeScreen
