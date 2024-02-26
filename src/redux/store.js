import { configureStore } from "@reduxjs/toolkit";
import cryptoCoin from "./slice/sliceCrypto";
import assets from "./slice/sliceAssets";

const store = configureStore({
    reducer: { cryptoCoin, assets },
});

export default store;
