import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { signInStart, signInSuccess, signInError} from "../redux/user/userSlice"

const SyncUsers = () => {
    const dispatch = useDispatch();
    const { getToken, isLoaded:authLoaded } = useAuth();
    const { user, isSignedIn, isLoaded: userLoaded } = useUser();
    const [hasSynced, setHasSynced] = useState(false)

    useEffect(() => {
        const syncUser = async () => {
            if (!authLoaded || !userLoaded || !isSignedIn || !user || hasSynced) return

            try {
                const token = await getToken();
                
                // Validate token
                if (!token) {
                    console.error("No token available");
                    dispatch(signInError("Authentication token not available"));
                    return;
                }

                console.log("Token received:", token.substring(0, 20) + "...");
                
                const userId = user.id;
                const fullName = user.fullName;
                const email = user.primaryEmailAddress?.emailAddress;
                const imageUrl = user.imageUrl;
                
                console.log("User ID:", userId);
                dispatch(signInStart());
                
                const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user/sync`, {
                    userId,
                    email,
                    fullName,
                    imageUrl
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                });
                
                dispatch(signInSuccess(response.data.user));
                console.log("User synced:", response.data.user);
                setHasSynced(true);
            } catch (err) {
                console.error("User sync failed:", err);
                const errorMessage = err.response?.data?.message || err.message || "Failed to sync user";
                dispatch(signInError(errorMessage));
            }
        }
        syncUser();
    }, [authLoaded, userLoaded, user, isSignedIn, hasSynced, getToken, dispatch]);

    return null;
}

export default SyncUsers