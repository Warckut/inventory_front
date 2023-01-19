import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from 'antd'
import useAuth from '../../useAuth'
import './Auth.css'

const AuthForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {login, user, error} = useAuth()

    const signin = () => {
        login(email, password)
    }

    if (user) {
        return <Redirect to={'/'} />
    }

    let errorElement = <div className="error">{error}</div>

    return (
        <>
            <div className="auth">
                <span className="auth__title">СКЛАД</span>
                <div className="auth__form">
                    <span className="auth__form-title">ВХОД</span>
                    {/* <div className="error">{error}</div> */}
                    {error? errorElement: null}
                    <input 
                        className="auth__input" 
                        name="email"
                        value={email}
                        type="text"
                        placeholder='E-mail'
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        className="auth__input" 
                        name="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        placeholder='Пароль'
                    />
                    <Button 
                        onClick={signin} 
                        type='primary'
                        style={{marginTop: '1.5rem', width: '100%'}}
                    >Войти</Button>
                    <Button
                        href='/registration'
                        type='primary'
                        style={{marginTop: '1.5rem', width: '100%'}}
                    >Регистрация</Button>
                </div>
            </div>
        </>
    )
}

export default AuthForm;
