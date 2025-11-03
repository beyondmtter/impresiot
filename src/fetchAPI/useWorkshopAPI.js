import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";

const useWorkshopAPI = () => {
    const { toast } = useToast()
    // Create a workshop
    const createWorkshop = async (workshopData) => {
        try {
            const response = await fetch("/api/workshop/create-workshop", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(workshopData),
            });

            const data = await response.json();
            toast({
                description: data.message,
              })
            return { message: data.message };
        } catch (error) {
            return { message: "An error occurred while creating the workshop. Please try again." };
        }
    };

    const updateWorkshop = async (workshopData, workshopId) => {
        try {
            const response = await fetch(`/api/workshop/update-workshop/${workshopId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(workshopData),
            });

            const data = await response.json();
            toast({
                description: data.message,
              })
            return { message: data.message, workshop: data.workshop };
        } catch (error) {
            return { message: "An error occurred while updating the workshop. Please try again." };
        }
    };

    const getCreatorWorkshops = async (creatorId, profile) => {
        try {
            const response = await fetch(`/api/workshop/get-creator-workshop/${creatorId}?profile=${profile ? "1" : "0"}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
           
            if (!data.success) {
                return { message: data.message, workshops: [] };
            }

            return { message: data.message, workshops: data.workshops };
        } catch (error) {
            return { message: "An error occurred while fetching the workshops. Please try again.", workshops: [] };
        }
    };

    const deleteWorkshop = async (workshopId) => {
        try {
            const response = await fetch(`/api/workshop/delete-workshop/${workshopId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
           
            if (!data.success) {
                return { message: data.message, workshops: [] };
            }

            return { message: data.message, workshops: data.workshops };
        } catch (error) {
            return { message: "An error occurred while fetching the workshops. Please try again.", workshops: [] };
        }
    };

    const getWorkshopById = async (workshopId) => {
        try {
            const response = await fetch(`/api/workshop/get-workshop/${workshopId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            if (!data.success) {
                return { message: data.message, workshop: [] };
            }

            return { message: data.message, workshop: data.workshop };
        } catch (error) {
            return { message: "An error occurred while fetching the workshops. Please try again.", workshops: [] };
        }
    };

    const getWorkshops = async (limit, page, userId, upcoming) => {
        try {
            const queryParams = new URLSearchParams({
                page,
                limit,
                upcoming: upcoming ? "1" : "0"
            });
    
            if (userId) {
                queryParams.append('userId', userId);
            }
            const response = await fetch(`/api/workshop/get-workshop?${queryParams.toString()}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            const data = await response.json();
    
            if (!data.success) {
                return { message: data.message, workshops: [] };
            }
    
            return { message: data.message, workshops: data.workshops };
        } catch (error) {
            return { message: "An error occurred while fetching the workshops. Please try again.", workshops: [] };
        }
    };
    
    return {
        createWorkshop,
        deleteWorkshop,
        updateWorkshop,
        getCreatorWorkshops, 
        getWorkshopById,
        getWorkshops
    };

};

export default useWorkshopAPI;
