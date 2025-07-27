import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInError} from "../redux/user/userSlice"

const SyncUsers = () => {
    const dispatch = useDispatch();
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
                dispatch(signInStart())
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
                    dispatch(signInSuccess(response.data))
                    console.log(response.data)
                    setHasSynced(true);
                } catch (err) {
                    console.error("User sync failed:", err);
                    dispatch(signInError(err.message))

                }
            }
        }
        syncUser()
    }, [user, isSignedIn, hasSynced]
    )
    return null
}

export default SyncUsers