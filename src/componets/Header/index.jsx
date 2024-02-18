import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { selectCrypto } from "../../redux/slice/sliceCrypto";

import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { headerStyle } from "./style";
import { CoinInfoModal } from "../CoinInfoModal";
import { AssetForm } from "../addAssetForm";

export const Header = () => {
    const [select, setSelect] = useState(false);
    const [modal, setModal] = useState(false);
    const [coin, setCoin] = useState(null);
    const [drawer, setDrawer] = useState(false);
    const { crypto } = useSelector(selectCrypto);

    const handleSelect = (value) => {
        setCoin(crypto.find((c) => c.id === value));
        setSelect((prev) => !prev);
        setModal((prev) => !prev);
    };

    useEffect(() => {
        const keypress = (e) => {
            if (e.key === "/") setSelect((prev) => !prev);
        };
        document.addEventListener("keypress", keypress);
        return () => {
            document.removeEventListener("keypress", keypress);
        };
    }, []);

    return (
        <Layout.Header style={headerStyle}>
            <Button type="primary" onClick={() => setDrawer((prev) => !prev)}>
                Add Assets
            </Button>
            <Drawer
                title="Add Assets"
                style={{ width: "600px" }}
                placement="left"
                destroyOnClose
                onClose={() => setDrawer(false)}
                open={drawer}
            >
                <AssetForm onClose={() => setDrawer(false)} />
            </Drawer>
            <Select
                style={{
                    width: "250px",
                }}
                open={select}
                onSelect={(event) => handleSelect(event)}
                onClick={() => setSelect((prev) => !prev)}
                value="press / to open"
                options={crypto.map((coin) => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img
                            style={{ width: 20 }}
                            src={option.data.icon}
                            alt={option.data.value}
                        />{" "}
                        {option.data.label}
                    </Space>
                )}
            />
            <Modal
                title="All info"
                footer={null}
                open={modal}
                onCancel={() => setModal((prev) => !prev)}
            >
                <CoinInfoModal coin={coin} />
            </Modal>
        </Layout.Header>
    );
};
