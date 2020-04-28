import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton, Typography, Row, Col } from 'antd'

import { formatUserAddress } from '~/util/stringUtil'

import RemoveUserButton from './RemoveUserButton'
import EditUserButton from './EditUserButton'
import UserStatusTag from './UserStatusTag'
import UserAvatar from './UserAvatar'
import PhoneMask from './masked/PhoneMask'
import CPFMask from './masked/CPFMask'
import DecimalMask from './masked/DecimalMask'
import IntegerMask from './masked/IntegerMask'
import RestoreUserButton from './RestoreUserButton'
import AccessControl from './AccessControl'

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
  value: PropTypes.node,
}

UserField.defaultProps = {
  value: null,
}

function UserDetailCard({ user }) {
  return user ? (
    <Row>
      <Col xs={24} xl={4} className="mr-lg">
        <Row justify="center" className="mb-sm">
          <Col>
            <UserAvatar user={user} size={120} />
          </Col>
        </Row>
        <AccessControl permission="application/users/manage">
          <Row justify="center" className="mb-md">
            <Col>
              <UserStatusTag user={user} />
            </Col>
          </Row>
          <Row justify="center" className="mb-lg">
            <Col>
              {user.active && <RemoveUserButton user={user} />}
              {!user.active && <RestoreUserButton user={user} />}
            </Col>
            <Col>
              <EditUserButton id={user.id} />
            </Col>
          </Row>
        </AccessControl>
      </Col>

      <Col xs={24} xl={18}>
        <Row className="mb-lg">
          <Col>
            <Title level={2}>{user.fullName}</Title>
          </Col>
        </Row>

        <Row className="mb-lg">
          <Col xs={24}>
            <Title level={4}>Contato</Title>
          </Col>

          <UserField label="E-mail:" value={user.email} />
          <UserField label="Telefone:" value={<PhoneMask value={user.phone} />} />
          <UserField label="Endereço:" value={formatUserAddress(user)} />

          {// Dados do responsável
          user.emergencyName && (
            <>
              <UserField
                label="Nome do responsável:"
                value={
                  <>
                    {user.emergencyName}
                    <Text style={{ fontSize: '80%' }} type="secondary">
                      {` (${user.emergencyConsanguinity})`}
                    </Text>
                  </>
                }
              />

              <UserField
                label="Telefone do responsável:"
                value={<PhoneMask value={user.emergencyPhone} />}
              />
              <UserField label="E-mail do responsável:" value={user.emergencyEmail} />
            </>
          )}
        </Row>

        <Row className="mb-lg">
          <Col xs={24}>
            <Title level={4}>Informações pessoais</Title>
          </Col>

          <UserField label="Apelido:" value={user.nickname} />
          <UserField label="RG:" value={user.rg} />
          <UserField label="CPF:" value={<CPFMask value={user.cpf} />} />
          <UserField
            label="Data de Nascimento:"
            value={user.dob && new Date(user.dob).toLocaleDateString('pt-br')}
          />
          <UserField label="Sexo:" value={user.sex} />

          <UserField
            label="Peso:"
            value={
              <DecimalMask value={user.weight} renderText={value => (value ? `${value} kg` : '')} />
            }
          />

          <UserField
            label="Altura:"
            value={
              <IntegerMask value={user.height} renderText={value => (value ? `${value} cm` : '')} />
            }
          />

          <UserField label="Plano de saúde:" value={user.healthInsurance} />
        </Row>
      </Col>
    </Row>
  ) : (
    <Skeleton avatar paragraph={{ rows: 2 }} active />
  )
}

UserDetailCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string,
    fullName: PropTypes.string,
    nickname: PropTypes.string,
    phone: PropTypes.string,
    rg: PropTypes.string,
    cpf: PropTypes.string,
    cep: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    neighborhood: PropTypes.string,
    street: PropTypes.string,
    buildingNumber: PropTypes.number,
    complement: PropTypes.string,
    weight: PropTypes.number,
    height: PropTypes.number,
    dob: PropTypes.string,
    emergencyName: PropTypes.string,
    emergencyEmail: PropTypes.string,
    emergencyPhone: PropTypes.string,
    emergencyConsanguinity: PropTypes.string,
    healthInsurance: PropTypes.string,
    sex: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
}

export default UserDetailCard
