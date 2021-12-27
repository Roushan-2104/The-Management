import './Dashboard.css'
import {useCollection} from '../../hooks/useCollection'
import Project from '../../components/Project'
import ProjectFilter from './ProjectFilter'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'


export default function Dashboard() {
    const {documents,error,isPending} = useCollection('projects',['createdAt','desc'])
    const [currentFilter, setCurrentFilter] = useState('all')
    const {user} = useAuthContext()

    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }

    const projects = documents ? documents.filter((document) => {
        switch (currentFilter){
            case 'all':
                let all = false
                if (document.visibility === 'public') {
                    all = true
                }
                return all

            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach((u) => {
                    if(user.uid === u.id){
                        assignedToMe = true
                    }
                })
                return assignedToMe
            
            case 'private':
                console.log(document.visibility, currentFilter)
                let privateView = false
                if(document.visibility === currentFilter){
                    document.assignedUsersList.forEach((u) => { 
                        if(user.uid === u.id || document.createdBy.id === user.uid){
                            privateView = true
                        }
                    })
                }
                return privateView

            case 'development': 
            case 'design':
            case 'sales':
            case 'marketing':
                console.log(document.category, currentFilter)
                let category = false
                if (document.visibility === 'public') {
                    if(document.category === currentFilter){
                        category = true
                    }
                }
                return category
            
            default:
                return true

        }
    }): null

    return (
        <div className='dashboard'>
            <h2 className='page-title'>Dashboard</h2>
            {isPending && 
                <div className='text-center mt-5'>
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
                }
            {documents && 
                <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}
             />}

            {error && <p className='error'>{error}</p>}
            {projects && <Project projects={projects} />}
        </div>
    )
}
