import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { assetsData } from "../../data";

export const fetchAssets = createAsyncThunk("assets/fetchCrypto", async () => {
    try {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(assetsData);
            }, 2000);
        });
    } catch (err) {
        console.log(err);
        throw err;
    }
});

const initialState = {
    assetsData: [],
    isLoadingAssets: "",
    error: null,
};

const sliceAssets = createSlice({
    name: "assets",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAssets.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAssets.fulfilled, (state, action) => {
                state.assetsData = Object.values(action.payload);
                state.isLoading = false;
            })
            .addCase(fetchAssets.rejected, (state) => {
                state.isLoading = true;
                state.error = action.error.message;
            });
    },
});

export const selectAssets = (state) => state.assets;

export default sliceAssets.reducer;
