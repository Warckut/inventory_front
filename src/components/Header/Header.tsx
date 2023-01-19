import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import useAuth from '../../useAuth'
import './Header.css'

const Header = () => {
    const {logout} = useAuth()
    const ref: any = useRef()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dispatch = useDispatch()
    
    const onClickUser = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }

    const signOut = () => {
        logout()
    }

    useEffect(() => {
        const checkIfClickedOutside = (e: any) => {
          if (isDropdownOpen && ref.current && !ref.current.contains(e.target)) {
            setIsDropdownOpen(false)
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [isDropdownOpen])
    
    return (
        <header className="header">
            <nav>
                <div ref={ref} className="user" onClick={onClickUser}>
                    <div className="user__info">
                        <a href="#" className="email">sasha_bobkov16@mail.ru</a>
                        <a href="#" className="role">Администратор</a>
                    </div>
                    <ul className={ isDropdownOpen ? "user__dropdown dropdown dropdown-active" : "user__dropdown dropdown"}>
                        <li className="dropdown__item">
                            <a href="#">Настройки</a>
                        </li>
                        <hr style={{border: "1px solid rgb(230, 230, 230)"}}/>
                        <li onClick={signOut} className="dropdown__item">
                            <a href="#">Выход</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header;