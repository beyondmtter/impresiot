import { useToast } from "@/hooks/use-toast";

const useWorkshopTicketAPI = () => {
    const { toast } = useToast()

    const createWorkshopTicket = async (payload) => {
        try {
            const res = await fetch('/api/workshop-ticket/add-ticket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            toast({
                description: "Ticket sent to you email",
            })

            return data;
        } catch (error) {
            return { message: "An error occurred while adding ticket. Please try again." };
        }
    }

    const getCreatorTickets = async (creatorId) => {
        try {
            const res = await fetch(`/api/workshop-ticket/get-tickets?creatorId=${creatorId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();

            return data;
        } catch (error) {
            return { message: "An error occurred while getting creator tickets. Please try again." };
        }
    }

    const getWorkshopTickets = async (workshopId) => {
        try {
            const res = await fetch(`/api/workshop-ticket/get-tickets?workshopId=${workshopId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();

            return data;
        } catch (error) {
            return { message: "An error occurred while getting workshop tickets. Please try again." };
        }
    }

    const getBuyerTickets = async (buyerId, page, limit, library, bill) => {

        try {
            const res = await fetch(`/api/workshop-ticket/get-tickets?buyerId=${buyerId}&page=${page}&limit=${limit}&library=${library ? "1" :"0"}&bill=${bill? "1": "0"}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await res.json();

            return data;
        } catch (error) {
            return { message: "An error occurred while getting buyer tickets. Please try again." };
        }
    }

    const getIsTicketBought = async (userId, workshopId) => {
        console.log(userId, workshopId)
        try {
            const res = await fetch(`/api/workshop-ticket/ticket-bought?buyerId=${userId}&workshopId=${workshopId}`)
            const data = await res.json();

            if(!data.success){
                console.log(data.message)
                return
            }

            return data;
        } catch (error) {
            return { message: "An error occurred while getting buyer tickets. Please try again." };
        }
    }

    return {
        createWorkshopTicket,
        getCreatorTickets,
        getWorkshopTickets,
        getBuyerTickets,
        getIsTicketBought
    }

}

export default useWorkshopTicketAPI