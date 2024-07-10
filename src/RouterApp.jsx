import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginScreen from './screens/login/LoginScreen'
import RegisterScreen from './screens/register/RegisterScreen'
import HomeScreen from './screens/home/HomeScreen.jsx'
import { verificarToken } from './fetching/auth.fetching.js'
import ProductsScreen from './screens/products/ProductsScreen.jsx'

const RouterApp = () => {
  const navigate = useNavigate()
  useEffect(() => {
    verificarToken()
      .then(resultado => {
        if (resultado.status === 200) {
          navigate('/login'); // Cambiar a '/home' con minúscula, ya que la ruta es case-sensitive
        } else {
          navigate('/login');//era login
        }
      })
      .catch(error => {
        console.error('Error al verificar token:', error);
        navigate('/login'); // En caso de error, redireccionar a la pantalla de login
      })
  }, []);
  
  

  return (
    <Routes>
     <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/' element={<LoginScreen />} />
      <Route path='/home' element={<HomeScreen />} />
      <Route path='/products' element={<ProductsScreen/>} />
    </Routes>
  )
}

export default RouterApp