import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Skeleton, Typography, Row, Col, Table, Dropdown, Menu, Button } from 'antd'
import Column from 'antd/lib/table/Column'
import { ToolOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import RemoveTeamButton from './RemoveTeamButton'
import EditTimeButton from './EditTimeButton'
import RemoveUserTeamButton from './RemoveUserTeamButton'
import TeamAvatar from './TeamAvatar'
import ModalGroup from './ModalGroup'
import * as enrollListStore from '../../store/ducks/enrollList'

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

function TeamDetailCard({ team, users, treinadores, auxiliares, jogadores, fetchEnrolls }) {
  useEffect(() => {
    fetchEnrolls(team.groups)
  })

  return team ? (
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
            <ModalGroup team={team} users={users} groupName="Treinador" userlist={treinadores} />
            <Table bordered size="small" dataSource={treinadores.map(u => ({ ...u, key: u.id }))}>
              <Column title="Nome" dataIndex="fullName" />
              <Column title="Apelido" dataIndex="nickname" />
              <Column
                title=""
                render={(value, record) => (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <RemoveUserTeamButton user={record} team={team} groupName="Treinador" />
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
            <ModalGroup team={team} users={users} groupName="Auxiliar" userlist={auxiliares} />
            <Table bordered size="small" dataSource={auxiliares.map(u => ({ ...u, key: u.id }))}>
              <Column title="Nome" dataIndex="fullName" />
              <Column title="Apelido" dataIndex="nickname" />
              <Column
                title=""
                render={(value, record) => (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <RemoveUserTeamButton user={record} team={team} groupName="Treinador" />
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
            <ModalGroup team={team} users={users} groupName="Jogador" userlist={jogadores} />
            <Table bordered size="small" dataSource={jogadores.map(u => ({ ...u, key: u.id }))}>
              <Column title="Nome" dataIndex="fullName" />
              <Column title="Apelido" dataIndex="nickname" />
              <Column
                title=""
                render={(value, record) => (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <RemoveUserTeamButton user={record} team={team} groupName="Treinador" />
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
  ) : (
      <Skeleton avatar paragraph={{ rows: 2 }} active />
    )
}

TeamDetailCard.propTypes = {
  team: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    description: PropTypes.string,
    groups: PropTypes.array.isRequired,
  }).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  treinadores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  auxiliares: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  jogadores: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  fetchEnrolls: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  treinadores: state.enrollList.treinadores,
  auxiliares: state.enrollList.auxiliares,
  jogadores: state.enrollList.jogadores,
})

const mapDispatchToProps = {
  fetchEnrolls: enrollListStore.fetchEnrolls,
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetailCard)
