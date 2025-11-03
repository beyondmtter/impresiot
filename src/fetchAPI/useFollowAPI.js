import { setUser } from "@/redux/userSlice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useFollowAPI = () => {
    const dispatch = useDispatch();

    const handleFollow = useCallback(async (currentUser, userId) => {
        if (!currentUser || !userId) {
            console.error("User IDs are required for follow operation");
            return;
        }

        try {
            const response = await fetch(`/api/follow/follow-user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ userId: currentUser, followingId: userId }),
            });

            const data = await response.json();
            dispatch(setUser(data.user))
            
            if (!data.success) {
                console.error("Error:", data.message);
            }

            return data;

        } catch (error) {
            console.error("Follow API Error:", error.message);
        }
    }, []);

    const getUserFollowers = useCallback(async (userId) => {
        if (!userId) {
            console.error("User ID is required to fetch followers");
            return;
        }
        try {
            const response = await fetch(`/api/follow/get-user-follower/${userId}`);
            const data = await response.json();

            if (!data.success) {
                console.error("Error:", data.message);
                return null;
            }
            return data.data || [];

        } catch (error) {
            console.error("Fetch Followers Error:", error.message);
            return null;
        }
    }, []);

    const getUserFollowing = useCallback(async (userId) => {
        if (!userId) {
            console.error("User ID is required to fetch following");
            return;
        }

        try {
            const response = await fetch(`/api/follow/get-user-following/${userId}`);
            const data = await response.json();

            if (!data.success) {
                console.error("Error:", data.message);
                return null;
            }

            return data.data || [];

        } catch (error) {
            console.error("Fetch Following Error:", error.message);
            return null;
        }
    }, []);

    return {
        handleFollow,
        getUserFollowers,
        getUserFollowing,
    };
};

export default useFollowAPI;
