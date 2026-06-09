import { useEffect } from "react"
import {Link} from 'react-router-dom'

const LoginForm = ({username, password, handleUsernameChange, handlePasswordChange, handleLogin}) => {

    useEffect(() => {
        document.title = "Login - What's for dinner?"
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-4">
            <div className="w-full max-w-md">            
            <h2 className="text-xl font-semibold mb-4 text-center">
                Login to your account
            </h2>

            <form onSubmit={handleLogin} autoComplete="off" className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col">
                    Username <input data-testid='username' value={username} onChange={handleUsernameChange} className="border rounded-md border-slate-200" />
                </div>

                <div className="flex flex-col">
                    Password <input data-testid='password' type="password" value={password} autoComplete="off" onChange={handlePasswordChange} className="border rounded-md border-slate-200"/>
                </div>

                <div className="text-center">
                    <button type="submit" className="px-4 py-1 border rounded-md border-slate-200 bg-amber-100 text-orange-950 hover:bg-amber-50 hover:text-orange-700 transition-discrete">
                        Login
                    </button>
                </div>
            </form>

            
            <p className="mt-4 text-center"> Don't have an account?</p>

            <div className="text-center mt-2">
            <Link to="/signup" className="px-4 py-1 border rounded-md border-slate-200 bg-amber-100 text-orange-950 hover:bg-amber-50 hover:text-orange-700 transition-discrete">
                Sign up
            </Link>
            </div>       
            </div>
        </div>
        
    )
}

export default LoginForm