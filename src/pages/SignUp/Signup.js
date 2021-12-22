import { useState } from 'react'
import { useSignUp } from '../../hooks/useSignUp'
// styles
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const {error, isPending,signup} = useSignUp()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName,thumbnail)
  }
  const handleUpload = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    if(!selected){
      setThumbnailError('Please select a file')
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Seltected File must be an image')
      return
    }
    if(selected.size > 100000){
      setThumbnailError('Image File size must be less than 100kb')
      return
    }
    setThumbnailError(null)
    setThumbnail(selected)
    console.log('Thumbnail updated')
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign up</h2>
      <label>
        <span>Email:</span>
        <input
          required 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          required
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password}
        />
      </label>
      <label>
        <span>Display Name:</span>
        <input
          required
          type="text" 
          onChange={(e) => setDisplayName(e.target.value)} 
          value={displayName}
          maxLength={10}
        />
      </label>
      <label>
        <span>Profile thumbnail:</span>
        <input 
          required
          type="file" 
          onChange={handleUpload}
        />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {error && <div className='error'>{error}</div>}
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && <button className="btn" disabled><em>Signing up....</em></button> }
    </form>
  )
}