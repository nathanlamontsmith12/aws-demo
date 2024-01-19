import { Button, Card, Form, Input, Result, Space } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { automaticLoginData } from "../../functions/formatSessionData.js";
import { makeNoWhitespaceValidator } from "../../functions/formFieldValidators.js";
import { useSession } from "../../hooks/useSession.jsx";

export const Register = () => {
    const navigate = useNavigate();
    const [ _, setSession ] = useSession();

    const submitRegistration = ({ username, password }) => {
        const registrationDataToUse = { username, password };
        console.log("REGISTRATION :: ", registrationDataToUse);
        const sessionData = automaticLoginData();
        setSession(sessionData);
        navigate("/");
    };

    const noWhitespaceValidator = makeNoWhitespaceValidator();

    const RegistrationForm = (
        <Form
            name="registration"
            labelCol={{ span: 10 }}
            wrapperCol={{ span: 18 }}
            onFinish={submitRegistration}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        transform: (str) => str.trim(),
                        message: "Please enter your username"
                    },
                    noWhitespaceValidator()
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
                        transform: (str) => str.trim(),
                        message: "Please enter your password"
                    },
                    noWhitespaceValidator()
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                label="Confirm Password"
                name="confirm"
                required
                dependencies={["password"]}
                rules={[
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value.trim()) {
                                // required ::
                                return Promise.reject(new Error("Please confirm your password"));
                            } else if (getFieldValue("password") !== value) {
                                // passwords must match ::
                                return Promise.reject(new Error("The passwords do not match"));
                            } else {
                                return Promise.resolve();
                            }
                        },
                    })
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6 }}>
                <Button
                    htmlType="submit"
                    style={{ width: "200px" }}
                    type="primary"
                >
                    Create Account
                </Button>
            </Form.Item>
        </Form>
    );

    const LoginMessage = (
        <Result
            icon={null}
            title={<div><Link to="/login"> Login </Link></div>}
            subTitle={"Already have an account? Log in!"}
        />
    );

    return (
        <div className="container flex-center">
            <Card className="flex-center" style={{ height: "550px", width: "550px" }}>
                <Space>
                    <div
                        className="container flex-column-center"
                        style={{ marginTop: "60px" }}
                    >
                        { RegistrationForm }
                        { LoginMessage }
                    </div>
                </Space>
            </Card>
        </div>
    );
};