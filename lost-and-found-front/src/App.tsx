import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Logo from './components/Logo'
import NewItem from './pages/NewItem'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import { useAuth } from './AuthContext'
import History from './pages/History'

function App() {

  const { user } = useAuth();

  return (
    <>
      <BrowserRouter>
        <Logo />
        <Routes>
          <Route path='/' element={<Home />} />
          {user && <Route path='/new-item' element={<NewItem />} />}
          {user && <Route path='/history' element={<History />} />}
          {!user && <Route path='/login' element={<Login />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
