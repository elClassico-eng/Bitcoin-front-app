import React, { useState } from "react";

import { useSelector } from "react-redux";
import { selectCrypto } from "../../redux/slice/sliceCrypto";
import { selectAssets } from "../../redux/slice/sliceAssets";

import { percentDiff } from "../../utils/percentDiff";

import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import {
    Flex,
    Layout,
    Card,
    Statistic,
    List,
    Typography,
    Spin,
    Tag,
} from "antd";
import { siderStyle } from "./style";

export const Aside = () => {
    const data = [
        "Racing car sprays burning fuel into crowd.",
        "Japanese princess to wed commoner.",
        "Australian walks 100km after outback crash.",
        "Man charged over missing wedding girl.",
        "Los Angeles battles huge wildfires.",
    ];

    const cryptoData = useSelector((state) => state.cryptoCoin.crypto);

    const { isLoading } = useSelector(selectCrypto);
    const { assetsData, isLoadingAssets } = useSelector(selectAssets);

    const assets = assetsData.map((asset) => {
        const coin = cryptoData.find((coin) => coin.id === asset.id);
        return {
            grow: +asset.price > +coin.price, //boolean (true)
            growPercent: percentDiff(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            ...asset,
        };
    });
    console.log(assets);

    if ((isLoading, isLoadingAssets)) {
        return <Spin fullscreen />;
    }
    return (
        <Layout.Sider width="25%" style={siderStyle}>
            <Flex gap="large" justify="center" vertical="true">
                {assets.map((asset) => (
                    <Card title="Card title" bordered={false}>
                        <Statistic
                            title={asset.id}
                            value={asset.totalAmount}
                            precision={2}
                            valueStyle={{
                                color: asset.grow ? "#3f8600" : "#cf1322",
                            }}
                            prefix={
                                asset.grow ? (
                                    <ArrowUpOutlined />
                                ) : (
                                    <ArrowDownOutlined />
                                )
                            }
                            suffix="%"
                        />
                        <List
                            size="small"
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item>
                                    <Typography.Text mark>
                                        [ITEM]
                                    </Typography.Text>{" "}
                                    {item}
                                </List.Item>
                            )}
                        />
                    </Card>
                ))}
            </Flex>
        </Layout.Sider>
    );
};
