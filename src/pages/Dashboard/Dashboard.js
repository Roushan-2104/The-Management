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
                return true

            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach((u) => {
                    if(user.uid === u.id){
                        assignedToMe = true
                    }
                })
                return assignedToMe

            case 'development': 
            case 'design':
            case 'sales':
            case 'marketing':
                console.log(document.category, currentFilter)
                return document.category === currentFilter
            
            default:
                return true

        }
    }): null

    return (
        <div className='dashboard'>
            <h2 className='page-title'>Dashboard</h2>
            {isPending && <p className='text-center fs-3 mt-5 text-warning'><em>Loading......</em></p>}
            {documents && 
                <ProjectFilter currentFilter={currentFilter} changeFilter={changeFilter}
             />}

            {error && <p className='error'>{error}</p>}
            {projects && <Project projects={projects} />}
        </div>
    )
}
