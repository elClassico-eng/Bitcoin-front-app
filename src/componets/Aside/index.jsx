import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectCrypto, fetchCrypto } from "../../redux/slice/sliceCrypto";
import { selectAssets, fetchAssets } from "../../redux/slice/sliceAssets";

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
    const { crypto, isLoading } = useSelector(selectCrypto);
    const { assetsData, isLoadingAssets } = useSelector(selectAssets);
    const dispatch = useDispatch();

    const assets = assetsData.map((asset) => {
        const coin = crypto.find((coin) => coin.id === asset.id);
        return {
            grow: asset.price - coin.price,
            growPercent: percentDiff(asset.price, coin.price),
            totalAmount: asset.amount * coin.price,
            totalProfit: asset.amount * coin.price - asset.amount * asset.price,
            ...asset,
        };
    });

    useEffect(() => {
        dispatch(fetchCrypto());
        dispatch(fetchAssets());
    }, [dispatch]);

    if (isLoading && isLoadingAssets) {
        return (
            <Spin tip="Loading" size="large">
                <div className="content" />
            </Spin>
        );
    }

    return (
        <Layout.Sider width="25%" style={siderStyle}>
            <Flex gap="large" justify="space-between" vertical="true">
                {assets.map((asset) => (
                    <Card key={asset.id} style={{ marginBottom: "1rem" }}>
                        <Statistic
                            title={asset.id.toUpperCase()}
                            value={asset.totalAmount}
                            precision={2}
                            valueStyle={{
                                color: asset.totalProfit
                                    ? "#3f8600"
                                    : "#cf1322",
                            }}
                            prefix={
                                asset.totalProfit ? (
                                    <ArrowUpOutlined />
                                ) : (
                                    <ArrowDownOutlined />
                                )
                            }
                            suffix="$"
                        />
                        <List
                            key={assets.id}
                            size="small"
                            dataSource={[
                                {
                                    title: "Total Profit:",
                                    value: asset.totalProfit,
                                    withTag: true,
                                },
                                {
                                    title: "Assets Amount:",
                                    value: asset.totalAmount,
                                    isPlain: true,
                                },
                            ]}
                            renderItem={(item) => (
                                <List.Item>
                                    <span>{item.title}</span>
                                    <span>
                                        {item.withTag && (
                                            <Tag
                                                color={
                                                    asset.grow ? "green" : "red"
                                                }
                                            >
                                                {asset.growPercent}%
                                            </Tag>
                                        )}
                                        {item.isPlain && item.value.toFixed(1)}
                                        {!item.isPlain && (
                                            <Typography.Text
                                                type={
                                                    asset.grow
                                                        ? "success"
                                                        : "danger"
                                                }
                                            >
                                                {item.value.toFixed(2)}$
                                            </Typography.Text>
                                        )}
                                    </span>
                                </List.Item>
                            )}
                        />
                    </Card>
                ))}
            </Flex>
        </Layout.Sider>
    );
};
