import React, { useState } from 'react'
import { login } from '../../fetching/auth.fetching'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const LoginScreen = () => {
    const [errorText, setErrorText] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        try {
            event.preventDefault()
            const usuario = {
                email: event.target.email.value,
                password: event.target.password.value
            }
            console.log(usuario)
            await login(usuario)
            setErrorText('')
            navigate('/products')
        }
        catch (error) {
            console.error('Error en logueo', error)
            setErrorText(error.message)
            Swal.fire({
                icon: 'error',
                title: 'Error en logueo',
                text: error.message
            })
        }
    }
    return (
        < >
            <section className='login'>
                <h2>Iniciar sesión</h2>
                <form onSubmit={handleSubmit}>

                
                    <label htmlFor="email"><i className="fa-solid fa-envelope"></i></label>

                    <input placeholder='nicoAybar@gmail.com' id='email' name='email' required />


                    <label htmlFor="password"><i className="fa-solid fa-lock"></i></label>

                    <input type="password" placeholder='******' id='password' name='password' required />
                    
                    {
                        errorText
                        &&
                        <span style={{ color: 'red' }}>{errorText}</span>
                    }
                    <div className='linkContainer'>
                        <span>Si aun no estas registrado <Link to={'/register'}>registrate</Link></span>
                    </div>
                    <button className='btnLogin' type='submit'>Iniciar sesión</button>
                </form>
            </section>
        </>
    )
}

export default LoginScreen