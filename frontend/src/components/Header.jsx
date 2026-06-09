import { Link } from "react-router-dom";
import {useLocation} from 'react-router-dom'

const Header = ({user}) => {

    const location = useLocation()
    const isLoginPage = location.pathname === '/login'

    const handleClick = () => {
        window.localStorage.removeItem('loggedRecipeUser')
        window.location.reload()
    }
    return(
            <header className="relative flex items-center justify-between px-6 py-4" >
                <h1 className="absolute left-1/2 -translate-x-1/2 md:text-4xl font-bold text-orange-900">
                    <Link to="/"> What's for dinner?</Link>
                </h1>

                <div className="ml-auto flex flex-col items-end gap-1">
                    {user ? (
                        <>
                        <span  className= "text-lg text-orange-900 ">
                            Welcome, {user.username}!
                        </span>

                        <Link
                            to="/favourites"
                            className="w-full text-center px-4 py-2 border rounded-md border-slate-200 bg-amber-100 text-orange-950 hover:bg-amber-50 hover:text-orange-700 transition-discrete">
                            Favourites
                        </Link>

                        <button onClick={handleClick} className="w-full px-4 py-2 border rounded-md border-slate-200 bg-amber-100 text-orange-950 hover:bg-amber-50 hover:text-orange-700 transition-discrete">
                            Logout
                        </button>
                        </>
                    ) : (
                        !isLoginPage && (
                            <Link to="/login" className="px-4 py-2 border rounded-md border-slate-200 bg-amber-100 text-orange-950 hover:bg-amber-50 hover:text-orange-700 transition-discrete"> 
                                Login 
                            </Link>
                        )

                    )
                    }
                </div>
            </header>
    )
}

export default Header;