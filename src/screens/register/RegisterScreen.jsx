import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registrar } from '../../fetching/auth.fetching'
import './Register.css'
import Swal from 'sweetalert2'

const RegisterScreen = () => {
    const [errorText, setErrorText] = useState('')
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        try {
            let clave1 = event.target.password.value
            let clave2 = event.target.confirmarPassword.value
            if (clave1 != clave2) {
                setErrorText('Las claves no coinciden')
                Swal.fire({
                    icon: 'error',
                    title: 'Las claves no coinciden',
                    text: error.message,
                    timer: 7000
                })
                return
            } else {
                setErrorText('')
                event.preventDefault()
                const usuario = {
                    email: event.target.email.value,
                    /*password: event.target.password.value,
                    confirmarPassword: event.target.confirmarPassword.value*/
                    password:clave1,
                    confirmarPassword:clave2
                }
            }

            console.log(usuario)
            await registrar(usuario)
            setErrorText('')
            navigate('/login')
        }
        catch (error) {
            setErrorText(error.message)
            Swal.fire({
                icon: 'error',
                title: 'Error en servidor/aplicacion',
                text: error.message
            })
        }
    }
    const LimpiarControles = () => {
        document.getElementById('email').value = ''
        document.getElementById('password').value = ''
        document.getElementById('confirmarPassword').value = ''
    }
    return (
        <section className='registro'>
            <h2 className='registroTitulo'>Registro</h2>
            <form onSubmit={handleSubmit}>

                <label htmlFor="email">Ingrese su email:</label>
                <input type="email" placeholder='naybar@gmail.com' id='email' name='email' />

                <label htmlFor="password">Ingrese su contraseña:</label>
                <input type="password" placeholder='******' id='password' name='password' />

                <label htmlFor="">Confirme su contraseña:</label>
                <input type="password" name="confirmarPassword" id="confirmarPassword" placeholder="******"/>


                {  /* si errorText existe  */
                    errorText
                    &&
                    <span style={{ color: 'red' }}>{errorText}</span>
                }
                <button type='submit'>Registrar</button>
            </form>
        </section>
    )
}

export default RegisterScreen