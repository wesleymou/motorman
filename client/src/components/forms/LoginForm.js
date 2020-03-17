import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Form, Row, Col, Typography } from 'antd'

const { Title, Text } = Typography

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
      <Row
        justify="center"
        align="top"
        style={{ height: '100%', marginTop: 100, padding: '0 20px' }}
      >
        <Title>Área Restrita</Title>
        <Col span={24}>
          <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={this.handleSubmit}
          >
            <Form.Item
              label="E-mail"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'É necessário preencher esse campo',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Senha"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'É necessário preencher esse campo',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Row>
              <Col xs={24} sm={{ offset: 8, span: 8 }}>
                <Button block type="primary" htmlType="submit" loading={loading}>
                  Login
                </Button>
                {error && <Text type="danger">Login ou senha incorretos. Tente novamente.</Text>}
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    )
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default LoginForm
