import React from "react";
import { Flex, Typography } from "antd";

export const CoinInfo = ({ coin }) => {
    return (
        <Flex gap="small" justify="center" align="center">
            <img style={{ width: "40px" }} src={coin.icon} alt={coin.name} />
            <Typography.Title level={2} style={{ margin: "0" }}>
                {coin.name}
            </Typography.Title>
        </Flex>
    );
};
