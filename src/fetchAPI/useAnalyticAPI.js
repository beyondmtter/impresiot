
const useAnalyticAPI = () => {

    const getAnalyticData = async (creatorId) => {
        try {
            const response = await fetch(`/api/analytic/${creatorId}`)

            const data = await response.json();
            
            return data;

        } catch (error) {
            return { message: "An error occurred while getting analytic data. Please try again." };
        }
    }

    const getRankBoard = async (creatorId) => {
        try {
            const response = await fetch(`/api/analytic/getRank/${creatorId}`)

            const data = await response.json();
            
            return data;

        } catch (error) {
            return { message: "An error occurred while getting analytic data. Please try again." };
        }
    }

    const getTicketSales = async (creatorId) => {
        try {
            const response = await fetch(`/api/analytic/getTicketSales/${creatorId}`)

            const data = await response.json();
            
            return data;

        } catch (error) {
            return { message: "An error occurred while getting ticket sales data. Please try again." };
        }
    }

    const getWorkshopTableData = async (creatorId) => {
        try {
            const response = await fetch(`/api/analytic/getWorkshopTableData/${creatorId}`)

            const data = await response.json();
            
            return data;

        } catch (error) {
            return { message: "An error occurred while getting analytic data. Please try again." };
        }
    }

    return {
        getAnalyticData,
        getRankBoard,
        getTicketSales,
        getWorkshopTableData
    }
}

export default useAnalyticAPI;