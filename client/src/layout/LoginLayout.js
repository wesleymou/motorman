import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd'

function LoginLayout({ children }) {
  return (
    <Row className="h-100" justify="center" align="middle" style={{ backgroundColor: 'darkgreen' }}>
      <Col xs={22} md={12} lg={8} xxl={6}>
        <Card>{children}</Card>
      </Col>
    </Row>
  )
}

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LoginLayout
