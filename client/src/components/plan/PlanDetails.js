import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row, Typography, List } from 'antd'
import MoneyMask from '../masked/MoneyMask'
import DateTimeMask from '../masked/DateTimeMask'
import StatusTag from '../StatusTag'

const { Paragraph, Text, Title } = Typography

function PlanDetails({ plan }) {
  return (
    <Row>
      <Col span={24}>
        <div className="mb-lg">
          <Title>{plan.name}</Title>
          <Text type="secondary">Plano de pagamento</Text>
        </div>

        <div className="mb-lg">
          <Title level={4}>Detalhes do plano:</Title>
          <Text type="secondary">Valor mensal: </Text>
          <Text>
            <MoneyMask value={plan.monthlyPrice} />
          </Text>
          <br />

          <Text type="secondary">Data de cadastro: </Text>
          <Text>
            <DateTimeMask value={plan.created_at} />
          </Text>
          <br />

          <Text type="secondary">Status: </Text>
          <Text>
            <StatusTag entity={plan} />
          </Text>
        </div>

        <div className="mb-lg">
          <Title level={4}>Usuários:</Title>
          {plan.users && plan.users.length ? (
            <List
              dataSource={plan.users}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta avatar={item.avatar} title={item.fullName} />
                </List.Item>
              )}
            />
          ) : (
            <Paragraph>Nenhum usuário vinculado a este plano de pagamento.</Paragraph>
          )}
        </div>
      </Col>
    </Row>
  )
}

PlanDetails.propTypes = {
  plan: PropTypes.shape({
    name: PropTypes.string,
    monthlyPrice: PropTypes.number,
    created_at: PropTypes.string,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        fullName: PropTypes.string,
        avatar: PropTypes.string,
      })
    ),
  }).isRequired,
}

export default PlanDetails
