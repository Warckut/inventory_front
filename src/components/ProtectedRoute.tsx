import React, { useEffect } from 'react'
import { Component } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import useAuth from '../useAuth'


const ProtectedRoute = ({ children, ...rest }: any) => {
    const {user} = useAuth() // получаем юзера из контекста
    return (
        <Route {...rest} render={(props) => {
            return (user && user.isActivated) // если пользователь зашел 
            ? children                        // и его аккаунт активирован
            : <Redirect to={{                 // то содержимое компонента отображается
                pathname: '/login',           // иначе переходим на страницу AuthPage
                state: {from: props.location} 
            }}/>
        }} />
    )
}

export default ProtectedRoute