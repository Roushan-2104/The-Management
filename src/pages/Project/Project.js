import { useNavigate, useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import './Project.css'
import Avatar from '../../components/Avatar'
import ProjectComments from './ProjectComments'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function Project() {
    const {deleteDocument, response} = useFirestore('projects')
    const {id} = useParams()
    const {user} = useAuthContext()
    const history = useNavigate()
    const {document,error} = useDocument('projects', id)

    const handleClick = (e) => {
        deleteDocument(document.id)
        if(!response.error){
            history('/')
        }

    }

    if(error) {
        return <div className='error'>{error}</div>
    }
    if(!document){
        return <div className='loading'>Loading...</div>
    }
    

    return (
        <div className='project-details'>
            <div>
                <div className="project-summary">
                    <div className='title-avatar'>
                        <h2 className='page-title' style={{fontSize:'24px'}}>{document.name}</h2>
                        <Avatar src={document.createdBy.photoURL} />
                    </div>
                    <p style={{fontSize:'13px',textAlign:'right',color:'#333'}}>-By {document.createdBy.displayName}</p>
                    <p className='due-date'>
                        Project due by {document.dueDate.toDate().toDateString()}
                    </p>
                    <p className='details'>
                        {document.details}
                    </p>
                    <h4>Project assigned to:</h4>
                    <div className='assigned-users'>
                        {document.assignedUsersList.map(user => (
                            <div key={user.id}>
                                <Avatar src={user.photoURL}/>
                            </div>
                        ))}
                    </div>
                </div>
                {document.createdBy.id === user.uid && (
                     <button className='btn' style={{marginTop:'10px'}} onClick={handleClick}>Mark as Complete</button>
                )}
            </div>
            <ProjectComments project={document}/>
        </div>
    )
}
