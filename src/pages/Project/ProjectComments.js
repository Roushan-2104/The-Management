import { useState} from "react"
import Avatar from "../../components/Avatar"
import { timeStamp } from "../../config/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

export default function ProjectComments({project}) {
    const [newComment, setNewComment] = useState('')
    const {user} = useAuthContext()
    const {updateDocument, response} = useFirestore('projects')
    const handleSubmit = async (e) => {
        e.preventDefault()
 
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComment,
            createdAt: timeStamp.fromDate(new Date()),
            id: Math.random()
          }
          
          await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd],
          })
          if (!response.error) {
            setNewComment('')
          }
    }

    return (
        <div className="project-comments">
            <h4>Project Comments</h4>
            <ul className="comments">
                {project.comments.length > 0 && project.comments.map(comment => (
                    <div className="one-comment">
                        <li key={comment.id}>
                            <div className="comment-author">
                            <Avatar src={comment.photoURL} />
                            <p>{comment.displayName}</p>
                            </div>
                            <div className="comment-date">
                            <p>{formatDistanceToNow(comment.createdAt.toDate(), {addSuffix:true})}</p>
                            </div>
                            <div className="comment-content">
                            <p>{comment.content}</p>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>

            <form className="add-comment" onSubmit={handleSubmit}>
                <label>
                    <span>Add New Comment</span>
                    <textarea
                        required
                        onChange={(e) => setNewComment(e.target.value)}
                        value={newComment}
                    >
                    </textarea>
                </label>
                <button className="btn">
                    Add Comment
                </button>
            </form>
        </div>
    )
}
