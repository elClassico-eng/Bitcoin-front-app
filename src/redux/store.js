import { configureStore } from "@reduxjs/toolkit";
import crypto from "./slice/sliceCrypto";
import assets from "./slice/sliceAssets";

const store = configureStore({
    reducer: { crypto, assets },
});

export default store;
