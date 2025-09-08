import {Routes, Route} from 'react-router-dom'
import Home from './Home.jsx'
import RecipeDetails from './components/RecipeDetails.jsx'
import Header from './components/Header.jsx'

const App= () => {

  return (
      <div>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/recipe/:id' element={<RecipeDetails />} />
        </Routes>
      </div>
  )

}

export default App