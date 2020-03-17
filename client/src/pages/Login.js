import React, { Component } from "react";
import { Button, Input, Form, Row, Col, Typography } from "antd";
import { withRouter } from "react-router-dom";
import { authenticate } from "../middlewares/auth";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 8 }
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 8 }
};

const { Title } = Typography;

class Login extends Component {
    onFinish = () => {
        if (authenticate()) this.props.history.push("/");
        else alert("Login ou senha incorretos. Tente novamente.");
    };

    render() {
        return (
            <>
                <Row justify="center" align="top" style={{ height: "100%" }}>
                <Title>Área Restrita</Title>
                    <Col span={24}>
                        <Form
                            {...layout}
                            name="loginForm"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "É necessário preencher esse campo"
                                    }
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
                                        message:
                                            "É necessário preencher esse campo"
                                    }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button block type="primary" htmlType="submit">
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </>
        );
    }
}

export default withRouter(Login);
