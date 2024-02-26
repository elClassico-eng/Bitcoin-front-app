import React, { useEffect } from "react";

import { useDispatch } from "react-redux";

import { fetchAssets } from "./redux/slice/sliceAssets";
import { fetchCrypto } from "./redux/slice/sliceCrypto";

import { Layout } from "antd";

import { Header } from "./componets/Header";
import { Content } from "./componets/Content";
import { Aside } from "./componets/Aside";

export const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAssets());
        dispatch(fetchCrypto());
    }, [dispatch]);
    return (
        <Layout>
            <Header />
            <Layout>
                <Content />
                <Aside />
            </Layout>
        </Layout>
    );
};
