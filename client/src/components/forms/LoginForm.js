import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Form, Row, Col, Typography } from 'antd'

import { Link } from 'react-router-dom'
import rules from './rules'
import logo from '../../assets/images/logo.png'

const { Title, Text, Paragraph } = Typography

class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      error: false,
    }
  }

  handleSubmit = values => {
    const { onSubmit } = this.props

    this.setState({ loading: true })

    onSubmit(values).catch(() =>
      this.setState({
        error: true,
        loading: false,
      })
    )
  }

  render() {
    const { error, loading } = this.state

    return (
      <Row className="text-center" justify="center">
        <Col>
          <img className="mb-lg" src={logo} height={50} alt="Logo" />
        </Col>
        <Col span={24}>
          <Title level={2}>Bem-vindo!</Title>
          <Paragraph>Insira seu e-mail e senha para autenticar.</Paragraph>
        </Col>
        <Col span={24}>
          <Form
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={this.handleSubmit}
          >
            <Form.Item label="E-mail" name="email" rules={[rules.required, rules.email]}>
              <Input />
            </Form.Item>

            <Form.Item label="Senha" name="password" rules={[rules.required]}>
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Row justify="center">
                <Col span={24}>
                  <Button block size="large" type="primary" htmlType="submit" loading={loading}>
                    Login
                  </Button>
                </Col>
                <Col span={24}>
                  {error && <Text type="danger">Login ou senha incorretos. Tente novamente.</Text>}
                </Col>
              </Row>
            </Form.Item>
          </Form>
          <Link to="/forgot-password">Esqueci minha senha.</Link>
        </Col>
      </Row>
    )
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default LoginForm
