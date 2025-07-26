import React, { useEffect } from 'react'
import { useAuth, useUser  } from '@clerk/clerk-react'
import axios from 'axios';


const SyncUsers = () => {
    const { getToken }= useAuth(); 
    const { user, isSignedIn } = useUser();

    useEffect(()=>{
        const syncUser = async()=>{
            const token = await getToken();

            await axios.post(`${import.meta.env.VITE_API_URL}/api/user/sync`,{
                userId: user.id,
            },{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials:true,
                body: JSON.stringify({
                    email: user.primaryEmailAddress.emailAddress,
                    fullName: `${user.firstName} ${user.lastName}`
                  })
            })
        }
        syncUser()
    },[user]
)
  return (
    <div></div>
  )
}

export default SyncUsers