import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCrypto = createAsyncThunk("crypto/fetchCrypto", async () => {
    try {
        const options = {
            method: "GET",
            url: "https://openapiv1.coinstats.app/coins",
            headers: {
                accept: "application/json",
                "X-API-KEY": "RRmMf/XvMQq7TB+bxvYCi9dbmGPYEqgrjFwDZHiRn5M=",
            },
        };
        const { data } = await axios.request(options);
        return data.result;
    } catch (err) {
        console.log(err);
        alert("Ошибка при загрузке данных");
    }
});

const initialState = {
    crypto: [],
    isLoading: "",
    error: null,
};

const sliceCrypto = createSlice({
    name: "crypto",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchCrypto.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCrypto.fulfilled, (state, action) => {
                state.crypto = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchCrypto.rejected, (state) => {
                state.isLoading = true;
                state.error = action.error.message;
            });
    },
});

export const selectCrypto = (state) => state.crypto;

export default sliceCrypto.reducer;
