import React from "react";
import { Layout } from "antd";

import { Header } from "./componets/Header";
import { Content } from "./componets/Content";
import { Sider } from "./componets/Sider";

export const App = () => {
    return (
        <Layout>
            <Header />
            <Layout>
                <Content />
                <Sider />
            </Layout>
        </Layout>
    );
};
