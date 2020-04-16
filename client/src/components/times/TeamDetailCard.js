import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Row, Col, Table, Dropdown, Menu, Button } from 'antd'
import Column from 'antd/lib/table/Column'
import { ToolOutlined } from '@ant-design/icons'
import RemoveTeamButton from './RemoveTeamButton'
import EditTimeButton from './EditTimeButton'
import RemoveUserTeamButton from './RemoveUserTeamButton'
import TeamAvatar from './TeamAvatar'
import ModalGroup from './ModalGroup'

const { Title, Text, Paragraph } = Typography

const UserField = ({ label, value }) => (
  <>
    <Col className="mr-sm">
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

function TeamDetailCard({ team }) {
  const treinadores = team.members
    .filter(member => member.role.name === 'Treinador')
    .map(member => member.user)

  const jogadores = team.members
    .filter(member => member.role.name === 'Jogador')
    .map(member => member.user)

  const auxiliares = team.members
    .filter(member => member.role.name === 'Auxiliar')
    .map(member => member.user)

  return (
    <Row>
      <Col span={6}>
        <Row justify="center" className="mb-sm">
          <Col>
            <TeamAvatar team={team} size={120} />
          </Col>
        </Row>
        <Row justify="center" className="mb-lg">
          <Col>
            <RemoveTeamButton team={team} />
          </Col>
          <Col>
            <EditTimeButton id={team.id} />
          </Col>
        </Row>
      </Col>

      <Col span={18} className="pl-lg">
        <Row>
          <Col>
            <Title level={2}>{team.name}</Title>
          </Col>
        </Row>
        <Row className="mb-sm">
          <UserField label="Descrição:" value={team.description} />
        </Row>
      </Col>

      <Col span={24} className="pt-lg mt-lg" style={{ border: '1px solid #f0f0f0' }}>
        <Row justify="center" className="mb-sm">
          <Col span={12} style={{ padding: ' 0 15px' }}>
            <ModalGroup team={team} roleId={1} title="Treinadores" />
            <Table bordered size="small" rowKey="id" dataSource={treinadores}>
              <Column title="Nome" dataIndex="fullName" />
              <Column title="Apelido" dataIndex="nickname" />
              <Column
                title=""
                render={(value, record) => (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <RemoveUserTeamButton user={record} />
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <Button type="link">
                      <ToolOutlined />
                    </Button>
                  </Dropdown>
                )}
              />
            </Table>
          </Col>
          <Col span={12} style={{ padding: '0 15px' }}>
            <ModalGroup team={team} roleId={3} title="Auxiliares" />
            <Table bordered size="small" rowKey="id" dataSource={auxiliares}>
              <Column title="Nome" dataIndex="fullName" />
              <Column title="Apelido" dataIndex="nickname" />
              <Column
                title=""
                render={(value, record) => (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <RemoveUserTeamButton user={record} />
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <Button type="link">
                      <ToolOutlined />
                    </Button>
                  </Dropdown>
                )}
              />
            </Table>
          </Col>
          <Col span={24} style={{ padding: '0 15px' }}>
            <ModalGroup team={team} roleId={2} title="Jogadores" />
            <Table bordered size="small" rowKey="id" dataSource={jogadores}>
              <Column title="Nome" dataIndex="fullName" />
              <Column title="Apelido" dataIndex="nickname" />
              <Column
                title=""
                render={(value, record) => (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <RemoveUserTeamButton user={record} />
                        </Menu.Item>
                      </Menu>
                    }
                  >
                    <Button type="link">
                      <ToolOutlined />
                    </Button>
                  </Dropdown>
                )}
              />
            </Table>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

TeamDetailCard.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    members: PropTypes.arrayOf(
      PropTypes.shape({
        user: PropTypes.shape({
          id: PropTypes.number,
        }),
      })
    ),
  }).isRequired,
}

export default TeamDetailCard
