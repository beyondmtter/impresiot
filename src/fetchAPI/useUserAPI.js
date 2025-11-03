"use client";
import { useToast } from "@/hooks/use-toast";
import { setUser } from "@/redux/userSlice";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

const useUserAPI = () => {
  const dispatch = useDispatch();
  const { toast } = useToast()

  const updateSession = useCallback(async () => {
    try {
      const response = await fetch("/api/user/update-session");
      const data = await response.json();

      if (!response.ok) {
        return { message: data.message };
      }
      dispatch(setUser(data.user));
    } catch (error) {
      console.error("Error updating session:", error);
    }
  }, [dispatch]);

  const getUser = async (userId) => {
    try {
      const response = await fetch(`/api/user/get-user/${userId}`);
      const data = await response.json();

      if (!response.ok) {
        return { message: data.message };
      }

      return data.user;
    } catch (error) {
      return { message: "An error occurred while logging in. Please try again." };
    }
  };

  const getCreators = async (page, limit) => {
    try {
      const response = await fetch(`/api/user/creator?page=${page}&limit=${limit}`);
      const data = await response.json();
      
      if (!response.ok) {
        return { message: data.message };
      }

      return data.creators;
    } catch (error) {
      return { message: "An error occurred while fething creators. Please try again." };
    }
  };

  const login = async (email, password) => {
    
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, inputPassword: password }),
      });

      const data = await response.json();
      toast({
        description: data.message,
      })
      if (!response.ok) {
        return { message: data.message };
      }

      dispatch(setUser(data.user));
      return data;
    } catch (error) {
      return { message: "An error occurred while logging in. Please try again." };
    }
  };

  const signUp = async (signUpData) => {

    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      const data = await response.json();
      toast({
        description: data.message,
      })

      return data
    } catch (error) {
      return { message: "An error occurred while signing up. Please try again." };
    }
  };

  const logout = async () => {
    try {
        const response = await fetch("/api/user/logout", { cache: "no-store" });
        const data = await response.json();

        if (!response.ok) {
            return { message: data.message };
        }

        dispatch(setUser(null));
        return { message: data.message };
    } catch (error) {
        return { message: "An error occurred while logging out. Please try again." };
    }
};


  const updateUser = async (updateData, userId) => {
    try {
      const response = await fetch(`/api/user/update-user/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { message: data.message };
      }
      toast({
        description: data.message,
      })
      dispatch(setUser(data.user));

      return data;

    } catch (error) {
      return { message: "An error occurred while updating user. Please try again." };
    }
  };

  const verifyUser = async (email, otp) => {
    try {
      const response = await fetch("/api/user/verify-user", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp, email }),
      });

      const data = await response.json();

      toast({
        description: data.message,
      })
      if (!response.ok) {
        return { message: data.message };
      }

      return { message: data.message, user: data.user, success: data.success };
    } catch (error) {
      return { message: "An error occurred while verifying user. Please try again." };
    }
  };

  // Update user password
  const updatePassword = async (email, newPassword, confirmPassword, otpCode) => {
    try {
      const response = await fetch(`/api/user/update-pass`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, newPassword, confirmPassword, otpCode }),
      });

      const data = await response.json();
      toast({
        description: data.message,
      })
      return data;
    } catch (error) {
      return { message: "An error occurred while updating the password. Please try again." };
    }
  };

  const updateSetting = async (setting, userId) => {
    try {
      const response = await fetch(`/api/user/update-setting/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({setting}),
      });

      const data = await response.json();
      toast({
        description: "Setting updated",
      })
      return data;
    } catch (error) {
      return { message: "An error occurred while updating the password. Please try again." };
    }
  };

  const approveToCreator = async (userId) => {
    try {
      const response = await fetch(`/api/user/approve-to-creator/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      toast({
        description: data.message,
      })
      return data;
    } catch (error) {
      return { message: "An error occurred while approving to creator. Please try again." };
    }
  }

  const rejectedToCreator = async(userId) => {
    try {
      const response = await fetch(`/api/user/rejected-to-creator/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        });
  
      const data = await response.json();
      toast({
        description: data.message,
      })
      return data;
    } catch (error) {
      return { message: "An error occurred while rejecting to creator. Please try again." };
    }
  }

  // Return API functions
  return {
    updateSession,
    getUser,
    getCreators,
    login,
    signUp,
    updateUser,
    verifyUser,
    logout,
    updatePassword,
    updateSetting,
    approveToCreator,
    rejectedToCreator
  };
};

export default useUserAPI;
