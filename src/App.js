import React from "react";

import { Layout } from "antd";

import { Header } from "./componets/Header";
import { Content } from "./componets/Content";
import { Aside } from "./componets/Aside";

export const App = () => {
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
