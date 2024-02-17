import React from "react";
import { Tag, Typography, Flex } from "antd";

export const CoinInfoModal = ({ coin }) => {
    return (
        <>
            <Flex gap="small" justify="center" align="center">
                <img
                    style={{ width: "40px" }}
                    src={coin.icon}
                    alt={coin.name}
                />
                <Typography.Title level={2} style={{ margin: "0" }}>
                    ({coin.symbol}){coin.name}
                </Typography.Title>
            </Flex>

            <Typography.Paragraph>
                <Typography.Title level={4}>
                    Сhange in value by period:
                </Typography.Title>
                <Flex gap="middle">
                    <Typography.Text strong>
                        1 hour:
                        <Tag color={coin.priceChange1h > 0 ? "green" : "red"}>
                            {coin.priceChange1h}$
                        </Tag>
                    </Typography.Text>
                    <Typography.Text strong>
                        1 day:
                        <Tag color={coin.priceChange1d > 0 ? "green" : "red"}>
                            {" "}
                            {coin.priceChange1d}$
                        </Tag>
                    </Typography.Text>
                    <Typography.Text strong>
                        1 week:
                        <Tag color={coin.priceChange1w > 0 ? "green" : "red"}>
                            {" "}
                            {coin.priceChange1w}$
                        </Tag>
                    </Typography.Text>
                </Flex>
            </Typography.Paragraph>
            <Typography.Title level={4}>Price:</Typography.Title>
            <Flex gap="middle">
                <Typography.Text strong>
                    Total price:
                    <Tag>{coin.price.toFixed(2)}$</Tag>
                </Typography.Text>
                <Typography.Text strong>
                    {" "}
                    BTC:
                    <Tag>{coin.priceBtc}$</Tag>
                </Typography.Text>
            </Flex>
            <Typography.Title level={4}>URL:</Typography.Title>
            <Flex gap="small" vertical>
                <Typography.Text strong style={{ color: "orange" }}>
                    Reddit:
                    <Tag>{coin.redditUrl}</Tag>
                </Typography.Text>
                <Typography.Text strong style={{ color: "orange" }}>
                    WebSite:
                    <Tag>{coin.websiteUrl}</Tag>
                </Typography.Text>
            </Flex>
        </>
    );
};
