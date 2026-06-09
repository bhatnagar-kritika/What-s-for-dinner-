import {Routes, Route, useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './Home.jsx'
import RecipeDetails from './components/RecipeDetails.jsx'
import Header from './components/Header.jsx'
import LoginForm from './components/LoginForm.jsx'
import SignupForm from './components/SignupForm.jsx'
import FavouritesPage from './components/FavouritesPage.jsx'
import userService from './services/users'
import Notification from './components/Notification.jsx'

import loginService from './services/login'
import favouriteService from './services/favouriteRecipes'

const App= () => {

  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [notification, setNotification] = useState({message:'', type:''})

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedRecipeUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      favouriteService.setToken(user.token) 
    }
  }, [])

  const handleUsernameChange = (event ) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try{
      const loggedUser = await loginService.login({username, password})
      console.log('Login successful, user:', loggedUser)
      window.localStorage.setItem('loggedRecipeUser', JSON.stringify(loggedUser))

      favouriteService.setToken(loggedUser.token)

      setUser(loggedUser)
      setUsername('')
      setPassword('')

      navigate('/')
    }
    catch(exception){
      console.error('Login failed, full error:', exception)
      console.error('Error response:', exception?.response)
      setNotification({message:'Incorrect username or password', type:'error'})
      setTimeout(() => {
        setNotification({message:'', type:''})
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleSignup = async (event) => {
    event.preventDefault()

    try{
      await userService.createUser({username, name, password})

      setNotification({
        message:"Account created succesfully",
        type:"Success"
      })

      setUsername('')
      setName('')
      setPassword('')
      navigate('/')

    } catch (exception){

        console.log('Signup error full:', exception)
        console.log('Server response:', exception.response?.data)

        setNotification({
          message: exception.response?.data?.error || "Account creation failed",
          type: "error"
        })
    }
  }

  return (
      
      <div className = "flex flex-col min-h-screen "> 
        <Notification message={notification.message} type={notification.type} />
        <Header user={user} />

        <div className="flex-1 flex flex-col">
          
            <Routes>
            <Route path='/' element= {<Home user={user}/>} />

            <Route path='/recipe/:id' element={<RecipeDetails user={user}/>} />
            <Route path='/favourites' element={<FavouritesPage user={user}/>} />
            <Route path= '/login' element= {<LoginForm username={username} password={password} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} handleLogin={handleLogin}/>} />
            <Route path= '/signup' element= {<SignupForm username={username} name={name} password={password} handleUsernameChange={handleUsernameChange} handleNameChange={handleNameChange} handlePasswordChange={handlePasswordChange} handleSignup={handleSignup}/>} />
          </Routes>
         

        </div>

      </div>
  )

}

export default App