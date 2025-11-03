import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isSearch: false,
    query: ""
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearch: (state, action) => {
            state.isSearch = action.payload;
        },
        setQuery: (state, action) =>{
            state.query = action.payload
        }
    }
});

export const { setSearch, setQuery } = searchSlice.actions;
export default searchSlice.reducer