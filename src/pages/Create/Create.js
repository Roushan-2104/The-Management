import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { useNavigate} from 'react-router-dom'
import Select from 'react-select'
import { timeStamp } from '../../config/config'

// styles
import './Create.css'


const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]
const visible = [
  {value: 'private' ,label:'Private'},
  {value: 'public' ,label:'Public'},

]

export default function Create() {
  const history = useNavigate()
  const { addDocument, response } = useFirestore('projects')
  const { user } = useAuthContext()
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null) 
  const [isPending, setIsPending] = useState(false)
  const [visibility, setVisibility] = useState('')

  // create user values for react-select
  useEffect(() => {
    if(documents) {
      setUsers(documents.map(user => {
        return { value: {...user, id: user.id}, label: user.displayName }
      }))
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    setIsPending(true)


    if (!category) {
      setFormError('Please select a project category.')
      return
    }
    if(!visibility){
      setFormError('Please select visibility.')
      return
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user')
      return
    }

    const assignedUsersList = assignedUsers.map(u => {
      return { 
        displayName: u.value.displayName, 
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })
    const createdBy = { 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      id: user.uid
    }
  
    const project = {
      name,
      details,
      assignedUsersList, 
      createdBy,
      category: category.value,
      dueDate: timeStamp.fromDate(new Date(dueDate)),
      comments: [],
      visibility: visibility.value
    }

    await addDocument(project)
    if (!response.error) {
      history('/')
      setIsPending(false)
    }
  }

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new Project</h2>
      <form onSubmit={handleSubmit} style={{marginBottom:'20px'}}>
        <label>
          <span>Project name:</span>
          <input
            required 
            type="text" 
            onChange={(e) => setName(e.target.value)}
            value={name}
            maxLength={20}
            placeholder='Name of the Project...'
          />
        </label>
        <label>
          <span>Project Details:</span>
          <textarea 
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details} 
            placeholder='Details of the Project...'
          ></textarea>
        </label>
        <label>
          <span>Set due date:</span>
          <input
            required 
            type="date" 
            onChange={(e) => setDueDate(e.target.value)} 
            value={dueDate}
          />
        </label>
        <label>
          <span>Project category:</span>
          <Select
            onChange={(option) => setCategory(option)}
            options={categories}
            menuPlacement='top'
          />
        </label> 
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
            menuPlacement='top'
          />
        </label>
        <label>
          <span>Visibility: </span>
          <Select
            onChange={(option) => setVisibility(option)}
            options={visible}
            menuPlacement='top'
            />
        </label>

        
        {formError && <p className="error">{formError}</p>}
        {!isPending && <button className="btn">Add Project</button> }
        {isPending && <button className="btn" disabled>Add Project</button> }

        
      </form>
    </div>
  )
}