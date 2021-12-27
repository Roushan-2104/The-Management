import { useState,useEffect } from "react"
import { projectAuth,projectFirestore,projectStorage } from "../config/config"
import {useAuthContext} from './useAuthContext'

export const useSignUp = () => {
    const [error, setError] = useState(null)
    const [isCancel, setIsCancel] = useState(false)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const signup = async (email,password,displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try { 
            const res =  await projectAuth.createUserWithEmailAndPassword(email,password)

            
            if(!res){
                throw new Error('Could Not Complete Sign-Up')
            }

            const uploadPath =  `thumbnails/${res.user.uid}/${thumbnail.name}`
            const img = await projectStorage.ref(uploadPath).put(thumbnail)
            const imgUrl = await img.ref.getDownloadURL()

            //add display name
            await res.user.updateProfile({ displayName,photoURL:imgUrl })

            // create a user document
            await projectFirestore.collection('users').doc(res.user.uid).set({
                online:true,
                displayName,
                photoURL:imgUrl,
            })

            //dispatch Login
            dispatch({type:'LOGIN',payload: res.user})

            if(!isCancel){
                setIsPending(false)
                setError(null)
            }
        } 
        catch (err) {
            if(!isCancel){
                setError(err.message)
                setIsPending(false)
            }
        }
    }
    useEffect(() => {
        return () => setIsCancel(true)
    }, [])
    return {error, isPending,signup,isCancel}
}