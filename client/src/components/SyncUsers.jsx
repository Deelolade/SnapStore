import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios';


const SyncUsers = () => {
    const { getToken } = useAuth();
    const { user, isSignedIn } = useUser();
    const [hasSynced, setHasSynced] = useState(false)

    useEffect(() => {
        const syncUser = async () => {
            if (!isSignedIn || !user || hasSynced) return

            const token = await getToken();
            
            if (isSignedIn && user && !hasSynced) {
                const userId = user.id;
                const fullName = user.fullName;
                const email = user.primaryEmailAddress?.emailAddress;
                const imageUrl = user.imageUrl;
                
                console.log(userId)
                try {
                    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/user/sync`, {
                        userId,
                        email,
                        fullName,
                        imageUrl
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true,
                    })
                    console.log(response.data)
                    setHasSynced(true);
                } catch (err) {
                    console.error("User sync failed:", err);
                }
            }
        }
        syncUser()
    }, [user, isSignedIn, hasSynced]
    )
    return null
}

export default SyncUsers