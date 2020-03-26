import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton, Typography, Row, Col } from 'antd'

import { formatUserAddress } from '../util/stringUtil'

import RemoveUserButton from './RemoveUserButton'
import EditUserButton from './EditUserButton'
import UserStatusTag from './UserStatusTag'
import UserAvatar from './UserAvatar'
import PhoneMask from './masked/PhoneMask'
import CPFMask from './masked/CPFMask'
import DecimalMask from './masked/DecimalMask'
import IntegerMask from './masked/IntegerMask'

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

function UserDetailCard({ user }) {
  return user ? (
    <Row>
      <Col xs={24} xl={4}>
        <Row justify="center" className="mb-sm">
          <Col>
            <UserAvatar user={user} size={120} />
          </Col>
        </Row>
        <Row justify="center" className="mb-md">
          <Col>
            <UserStatusTag user={user} />
          </Col>
        </Row>
        <Row justify="center" className="mb-lg">
          <Col>
            <RemoveUserButton user={user} />
          </Col>
          <Col>
            <EditUserButton id={user.id} />
          </Col>
        </Row>
      </Col>

      <Col xs={24} xl={18}>
        <Row className="mb-lg">
          <Col>
            <Title level={2}>{user.nomeCompleto}</Title>
          </Col>
        </Row>

        <Row className="mb-lg">
          <Col xs={24}>
            <Title level={4}>Contato</Title>
          </Col>

          <UserField label="E-mail:" value={user.email} />
          <UserField label="Telefone:" value={<PhoneMask value={user.telefone} />} />
          <UserField label="Endereço:" value={formatUserAddress(user)} />

          {// Dados do responsável
          user.nomeResponsavel && (
            <>
              <UserField
                label="Nome do responsável:"
                value={
                  <>
                    {user.nomeResponsavel}
                    <Text style={{ fontSize: '80%' }} type="secondary">
                      {` (${user.grauParentescoResponsavel})`}
                    </Text>
                  </>
                }
              />

              <UserField
                label="Telefone do responsável:"
                value={<PhoneMask value={user.telefoneResponsavel} />}
              />
              <UserField label="E-mail do responsável:" value={user.emailResponsavel} />
            </>
          )}
        </Row>

        <Row className="mb-lg">
          <Col xs={24}>
            <Title level={4}>Informações pessoais</Title>
          </Col>

          <UserField label="Apelido:" value={user.apelido} />
          <UserField label="RG:" value={user.rg} />
          <UserField label="CPF:" value={<CPFMask value={user.cpf} />} />
          <UserField
            label="Data de Nascimento:"
            value={user.dataNasc && new Date(user.dataNasc).toLocaleDateString('pt-br')}
          />
          <UserField label="Sexo:" value={user.sexo} />

          <UserField
            label="Peso:"
            value={
              <DecimalMask value={user.peso} renderText={value => (value ? `${value} kg` : '')} />
            }
          />

          <UserField
            label="Altura:"
            value={
              <IntegerMask value={user.altura} renderText={value => (value ? `${value} cm` : '')} />
            }
          />

          <UserField label="Plano de saúde:" value={user.planoSaude} />
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
    nomeCompleto: PropTypes.string,
    apelido: PropTypes.string,
    telefone: PropTypes.string,
    rg: PropTypes.string,
    cpf: PropTypes.string,
    cep: PropTypes.string,
    estado: PropTypes.string,
    cidade: PropTypes.string,
    bairro: PropTypes.string,
    endereco: PropTypes.string,
    numero: PropTypes.number,
    complemento: PropTypes.string,
    peso: PropTypes.number,
    altura: PropTypes.number,
    dataNasc: PropTypes.string,
    nomeResponsavel: PropTypes.string,
    emailResponsavel: PropTypes.string,
    telefoneResponsavel: PropTypes.string,
    grauParentescoResponsavel: PropTypes.string,
    planoSaude: PropTypes.string,
    sexo: PropTypes.string,
    active: PropTypes.bool,
  }).isRequired,
}

export default UserDetailCard
