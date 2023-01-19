import { Button } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { Redirect } from 'react-router-dom'
import { selectLoading } from '../../redux/productsReducer'
import useAuth from '../../useAuth'
import './Auth.css'

const RegistrationForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {user, error, registration} = useAuth()

    const signup = () => {
        registration(email, password)
    }

    if (user) {
        if (user.isActivated)
            // return (<div>Подтвердите учетную запись по ссылке, отправленной вам на почту.</div>)
            return (<div className="activation-page">Подтвердите ваш e-mail по ссылке, отправленной на вашу fucking почту!</div>)
        else
            return <Redirect to={'/'} />
    }


    return (
        <>
            <div className="auth">
            <span className="auth__title">СКЛАД</span>
            <div className="auth__form">
                <span className="auth__form-title">РЕГИСТРАЦИЯ</span>
                {/* <div className="error">{error}</div> */}
                {error}
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
                    onClick={signup} 
                    type="primary"
                    style={{marginTop: '1.5rem', width: '100%'}}
                >Зарегистрироваться</Button>
                <Button
                    href='/login'
                    type='primary'
                    style={{marginTop: '1.5rem', width: '100%'}}
                >Авторизация</Button>
            </div>
        </div>
        </>
    )
}

export default RegistrationForm;
