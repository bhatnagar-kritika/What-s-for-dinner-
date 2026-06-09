import {Link} from 'react-router-dom'
import {useEffect} from 'react'

const SignupForm = ({username, name, password, handleUsernameChange, handleNameChange, handlePasswordChange, handleSignup}) => {

    useEffect(() => {
        document.title = "Sign up- What's for dinner?"
    }, [])

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] p-4"> 
            <div className="w-full max-w-md">

                <h2 className= 'text-xl font-semibold mb-6 text-center'>
                    Create an account
                </h2>

                <form onSubmit={handleSignup} className= "flex flex-col gap-4">

                    <div className= "flex flex-col">
                        Username <input data-testid='username' value={username} onChange={handleUsernameChange} className="border rounded-md border-slate-200 w-full p-2" />
                    </div>
                    <div className= "flex flex-col">
                        Name <input data-testid='name' value={name} onChange={handleNameChange} className="border rounded-md border-slate-200 w-full p-2" />
                    </div>
                    <div className= "flex flex-col">
                        Password <input data-testid='password' type="password" value={password} onChange={handlePasswordChange} className="border rounded-md border-slate-200 w-full p-2" />
                    </div>

                    <button type="submit" className="px-4 py-1 border rounded-md border-slate-200 bg-amber-100 text-orange-950 hover:bg-amber-50 hover:text-orange-700 transition-discrete">
                        Sign Up
                    </button>
                </form>

                <p className="mt-6 text-center">
                    Already have an account?
                </p>

                <div className="text-center mt-2">
                    <Link to="/login" className="px-4 py-1 border rounded-md border-slate-200 bg-amber-100 text-orange-950 hover:bg-amber-50 hover:text-orange-700 transition-discrete">
                        Login
                    </Link>
                </div>

            
            </div>
        </div>
    )
}

export default SignupForm