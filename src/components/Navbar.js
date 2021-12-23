import { Link } from 'react-router-dom'
// import User from '../assets/user.svg'
import {useLogOut} from '../hooks/useLogOut'

// styles & images
import './Navbar.css'
import Temple from '../assets/temple.svg'
import { useAuthContext } from '../hooks/useAuthContext'
import OffCanvas from './OffCanvas'
import { projectFirestore } from '../config/config'
import Modal from './Modal'

export default function Navbar() {
  const {logout, isPending} = useLogOut()
  const {user} = useAuthContext()


  window.addEventListener('beforeunload', async (e) => {
    e.preventDefault();
    projectFirestore.collection('users').doc(user).update({online:false})
  });

  return (
    <nav className="bar">
      <ul style={{display:'flex',alignItems:'baseline'}}>
        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <Link to='/'>
            <span>The Management</span>
          </Link>
        </li>
        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
        {user && (
          <>
            <li className='d-lg-none d-block me-3'>
                <Modal/>
            </li>
            <li className='d-lg-none d-block'>
              <OffCanvas/>
            </li>
            <li className='d-lg-block d-none'>
              {!isPending && <button className="btn" onClick={logout}>Logout</button>}
              {isPending && <button className="btn" disabled><em>Logging out...</em></button>}
            </li>

          </>
        )}
      </ul>
    </nav>
  )
}