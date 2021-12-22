import { useCollection } from '../hooks/useCollection'

// components
import Avatar from './Avatar'

// styles
import './Online.css'

export default function Online() {
  const { isPending, error, documents } = useCollection('users')

  return (
    <div className="user-list">
      <h2>All Users</h2>
      {isPending && <div>Loading users...</div>}
      {error && <div>{error}</div>}
      {documents && documents.map(user => (
        <div key={user.id} className="user-list-item">
            {user.online && <span className="online-user"></span>}
            {!user.online && <span className="online-user" style={{background:'red'}}></span>}
          <span>{user.displayName}</span>
          <Avatar src={user.photoURL} />
        </div>
      ))}
    </div>
  )
}