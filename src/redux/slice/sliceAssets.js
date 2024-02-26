import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAssets = createAsyncThunk("assets/fetchAssets", async () => {
    const { data } = await axios.get(
        "https://65d2fe7c522627d50107c477.mockapi.io/Assets"
    );
    return data;
});

const initialState = {
    assetsData: [],
    isLoadingAssets: "",
    error: null,
};

const sliceAssets = createSlice({
    name: "assets",
    initialState,
    reducers: {
        setSelectedCoin: (state, action) => {
            state.assetsData.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssets.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAssets.fulfilled, (state, action) => {
                state.assetsData.push(action.payload);
                state.isLoading = false;
            })
            .addCase(fetchAssets.rejected, (state) => {
                state.isLoading = true;
                state.error = action.error.message;
            });
    },
});

export const { setSelectedCoin } = sliceAssets.actions;

export const selectAssets = (state) => state.assets;

export default sliceAssets.reducer;
