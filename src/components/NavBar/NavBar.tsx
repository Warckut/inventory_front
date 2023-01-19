import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import useAuth from '../../useAuth'

const NavBar = () => {
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

    // useEffect(() => {
    //     const checkIfClickedOutside = (e: any) => {
    //     if (isDropdownOpen && ref.current && !ref.current.contains(e.target)) {
    //         setIsDropdownOpen(false)
    //     }
    //     }
    //     document.addEventListener("mousedown", checkIfClickedOutside)
    //     return () => {
    //     // Cleanup the event listener
    //     document.removeEventListener("mousedown", checkIfClickedOutside)
    //     }
    // }, [isDropdownOpen])

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light' style={{height: "10rem"}}>
            <div className="container-fluid">
                <a className="dropdown-toggle d-flex align-items-center hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false">
                    <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                        className="rounded-circle"
                        height="25"
                        alt="Black and White Portrait of a Man"
                        loading="lazy"
                    />
                </a>
                <ul className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink">
                    <li>
                    <a className="dropdown-item" href="#">My profile</a>
                    </li>
                    <li>
                    <a className="dropdown-item" href="#">Settings</a>
                    </li>
                    <li>
                    <a className="dropdown-item" href="#">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar