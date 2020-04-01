import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton, Typography, Row, Col } from 'antd'

//import { formatUserAddress } from '../util/stringUtil'

import RemoveTimeButton from './RemoveTimeButton'
import EditTimeButton from './EditTimeButton'
import TimeAvatar from './TimeAvatar'

const { Title, Text, Paragraph } = Typography

const UserField = ({ label, value }) => (
  <>
    <Col xs={12} md={4}>
      <Text type="secondary">{label}</Text>
    </Col>
    <Col xs={12} md={20}>
      <Paragraph>{value}</Paragraph>
    </Col>
  </>
)

UserField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node.isRequired,
}

function TimeDetailCard({ time: time }) {
  return time ? (
    <Row>
      <Col xs={24} xl={4}>
        <Row justify="center" className="mb-sm">
          <Col>
            <TimeAvatar time={time} size={120} />
          </Col>
        </Row>
        <Row justify="center" className="mb-lg">
          <Col>
            <RemoveTimeButton time={time} />
          </Col>
          <Col>
            <EditTimeButton id={time.id} />
          </Col>
        </Row>
      </Col>

      <Col xs={24} xl={18}>
        <Row className="mb-lg">
          <Col xs={24}> 
            <Title level={2}>{time.name}</Title>
          </Col>

          <UserField label="Descrição:" value={time.description} />
        </Row>
      </Col>
    </Row>
  ) : (
    <Skeleton avatar paragraph={{ rows: 2 }} active />
  )
}

TimeDetailCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string,
    descricao: PropTypes.string,
  }).isRequired,
}

export default TimeDetailCard
