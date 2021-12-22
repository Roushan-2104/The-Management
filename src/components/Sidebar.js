import { NavLink } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import LogOut from '../assets/logout.svg'



// styles & images
import "./Sidebar.css"
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Avatar from "./Avatar"
import { useLogOut } from "../hooks/useLogOut"
// import Modal from "./Modal"

export default function Sidebar() {
  const {user} = useAuthContext()
  const {logout, isPending} = useLogOut()

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="user">
            {/* avatar & username here later */}
            {user && <Avatar src = {user.photoURL}/>}
            <p>Hey, {user ? user.displayName : 'user'}</p>  
          </div>  
          <nav className="links">
            <ul>
              <li>
                <NavLink to="/" className="anchor">
                  <img src={DashboardIcon} alt="dashboard icon" />
                  <span>Dashboard</span>
                </NavLink>
              </li> 
              <li>
                <NavLink to="/create" className="anchor">
                  <img src={AddIcon} alt="add project icon" />
                  <span>New Project</span>
                </NavLink>
              </li>
              <li className="d-lg-none d-block">
                <div className="anchor">
                  <img src ={LogOut} alt="logout"/>
                  {!isPending && <span onClick={logout} style={{cursor:'pointer'}}>Logout</span>}
                  {isPending && <span><em>Logging out...</em></span>}
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}