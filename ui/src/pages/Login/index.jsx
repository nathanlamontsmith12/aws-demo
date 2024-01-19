import React from "react";
import { Card, Button, Result, Space, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { automaticLoginData } from "../../functions/formatSessionData.js";
import { useSession } from "../../hooks/useSession.jsx";
import { makeNoWhitespaceValidator } from "../../functions/formFieldValidators.js";

export const Login = () => {
    const navigate = useNavigate();
    const [ _, setSession ] = useSession();

    const submitLogin = (loginData) => {
        console.log("SUBMIT :: ", loginData);
        const sessionData = automaticLoginData();
        setSession(sessionData);
        navigate("/");
    };

    const noWhitespaceValidator = makeNoWhitespaceValidator();

    const RegistrationMessage = (
        <Result
            icon={null}
            title={<div><Link to="/register"> Sign Up </Link></div>}
            subTitle={"New user? Create an account"}
        />
    );

    const LoginForm = (
        <Form
            name="login"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            onFinish={submitLogin}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: "Please enter your username"
                    },
                    noWhitespaceValidator
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: "Please enter your password"
                    },
                    noWhitespaceValidator
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8 }}>
                <Button
                    htmlType="submit"
                    style={{ width: "100px" }}
                    type="primary"
                >
                    Login
                </Button>
            </Form.Item>
        </Form>
    );

    return <div className="container flex-center">
        <Card className="flex-center" style={{ height: "500px", width: "550px" }}>
            <Space>
                <div
                    className="container flex-column-center"
                    style={{ marginTop: "60px" }}
                >
                    { LoginForm }
                    { RegistrationMessage }
                </div>
            </Space>
        </Card>
    </div>;
};