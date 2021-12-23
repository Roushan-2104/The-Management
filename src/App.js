import './App.css'
import {Route,Routes,Navigate} from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Login from './pages/Login/Login'
import Create from './pages/Create/Create'
import Signup from './pages/SignUp/Signup'
import Project from './pages/Project/Project'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Online from './components/Online'
import {useAuthContext} from './hooks/useAuthContext'


function App() {
  const {authIsReady, user} = useAuthContext()
  return (
    <div className="App">
      {authIsReady && (
        <>
        {user &&
          <div className='sidebar d-lg-block d-none'>
            <Sidebar/>
          </div>
        }
          <div className='container'>
            <Navbar/>
            <Routes>
              <Route path='/' element={user ? <Dashboard/> : <Navigate to='/login'/> } />
              <Route path='/login' element={user ? <Navigate to='/'/> : <Login/>} />
              <Route path='/signup'element={user ? <Navigate to='/'/> : <Signup/>} />
              <Route path='/create' element={user ? <Create/> : <Navigate to='/login'/>} />
              <Route path='/details/:id' element={user ? <Project/> : <Navigate to='/login'/>} />
            </Routes>
          </div>
          {user &&
            <div className='d-lg-block d-none user-list'>
                <Online/>
            </div>
           }
        </>
      )}

    </div>
  );
}
export default App
