
const useSearchAPI = () => {
    const searchWorkshops = async (query, page) => {
        try {
            const response = await fetch(`/api/search/workshop?query=${query}&page=${page}`);
    
            const data = await response.json();
            
            return data
        } catch (error) {
            return { message: "An error occurred while searching workshop. Please try again." };
        }
    }

    const searchUsers = async (query, page) => {
        try {
            const response = await fetch(`/api/search/user?query=${query}&page=${page}`);
    
            const data = await response.json();
            
            return data
        } catch (error) {
            return { message: "An error occurred while searching user. Please try again." };
        }
    }

    return {
        searchWorkshops,
        searchUsers
    }

}

export default useSearchAPI