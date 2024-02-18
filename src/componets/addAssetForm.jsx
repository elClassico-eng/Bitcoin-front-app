import React, { useState } from "react";
import {
    Form,
    Typography,
    Button,
    Flex,
    Select,
    Space,
    Divider,
    InputNumber,
    DatePicker,
    Result,
} from "antd";

import { useSelector } from "react-redux";
import { selectCrypto } from "../redux/slice/sliceCrypto";
import { useForm } from "antd/es/form/Form";

import { CoinInfo } from "./CoinInfo/CoinInfo";

export const AssetForm = ({ onClose }) => {
    const { crypto } = useSelector(selectCrypto);
    const [coin, setCoin] = useState(null);
    const [form] = useForm();
    const [select, setSelect] = useState(false);
    const [submit, setSubmit] = useState(false);

    const getSelectedCoin = (value) => {
        setCoin(crypto.find((item) => item.id === value));
    };

    const onFinish = (value) => {
        console.log(value);
    };

    const validateMessage = {
        required: "${label} is required!",
        types: {
            number: "${label} is not valid number",
        },
        number: {
            range: "${label} must be between ${min} and ${max}",
        },
    };

    const handleAmountChange = (value) => {
        const price = form.getFieldValue("price");
        form.setFieldsValue({
            totalPrice: +(value * price).toFixed(2),
        });
    };
    const handlePriceChange = (value) => {
        const amount = form.getFieldValue("amount");
        form.setFieldsValue({
            totalPrice: +(value * amount).toFixed(2),
        });
    };
    if (!coin) {
        return (
            <Select
                style={{
                    width: "100%",
                }}
                open={select}
                onSelect={(value) => getSelectedCoin(value)}
                onClick={() => setSelect((prev) => !prev)}
                value="Add asset"
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
        );
    }

    if (submit) {
        return (
            <Result
                status="success"
                title="The purchase was completed successfully!"
                subTitle={`Added ${42} of ${coin.id} to price ${3}`}
                extra={[
                    <Button onClick={onClose} type="primary" key="home">
                        Home
                    </Button>,
                ]}
            />
        );
    }

    return (
        <>
            <CoinInfo coin={coin} />
            <Divider />
            <Form
                form={form}
                name="basic"
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 10,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    price: +coin.price.toFixed(2),
                }}
                validateMessages={validateMessage}
                onFinish={(value) => onFinish(value)}
                onFinishFailed={() =>
                    alert("Не удалось добавить монету в портфель.")
                }
            >
                <Form.Item
                    label="Amount"
                    name="amount"
                    rules={[
                        {
                            required: true,
                            type: "number",
                        },
                    ]}
                >
                    <InputNumber
                        placeholder="Enter coin amount"
                        onChange={handleAmountChange}
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item label="Price ($)" name="price">
                    <InputNumber
                        disabled
                        onChange={handlePriceChange}
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item label="Date & Time" name="date">
                    <DatePicker
                        showTime
                        needConfirm={false}
                        style={{ width: "100%" }}
                    />
                </Form.Item>

                <Form.Item label="Total ($)" name="totalPrice">
                    <InputNumber disabled style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                ></Form.Item>
                <Button
                    type="primary"
                    onClick={() => setSubmit(true)}
                    htmlType="submit"
                >
                    Add Assets
                </Button>
            </Form>
        </>
    );
};
