import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Skeleton, Typography, Row, Col, Table, Dropdown, Menu, Button } from 'antd'
import Column from 'antd/lib/table/Column'
import { ToolOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import RemoveTimeButton from './RemoveTimeButton'
import EditTimeButton from './EditTimeButton'
import RemoveUserTimeButton from './RemoveUserTimeButton'
import TimeAvatar from './TimeAvatar'
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

function TimeDetailCard({ time, users, treinadores, auxiliares, jogadores, fetchEnrolls }) {
  useEffect(() => fetchEnrolls(time.groups), [])

  return time ? (
    <Row>
      <Col span={6}>
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

      <Col span={18} className="pl-lg">
        <Row>
          <Col>
            <Title level={2}>{time.name}</Title>
          </Col>
        </Row>
        <Row className="mb-sm">
          <UserField label="Descrição:" value={time.description} />
        </Row>
      </Col>

      <Col span={24} className="pt-lg mt-lg" style={{ border: '1px solid #f0f0f0' }}>
        <Row justify="center" className="mb-sm">
          <Col span={12} style={{ padding: ' 0 15px' }}>
            <ModalGroup time={time} users={users} groupName="Treinador" userlist={treinadores} />
            <Table bordered size="small" dataSource={treinadores.map(u => ({ ...u, key: u.id }))}>
              <Column title="Nome" dataIndex="nomeCompleto" />
              <Column title="Apelido" dataIndex="apelido" />
              <Column
                title=""
                render={(value, record) => (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <RemoveUserTimeButton user={record} time={time} groupName="Treinador" />
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
            <ModalGroup time={time} users={users} groupName="Auxiliar" userlist={auxiliares} />
            <Table bordered size="small" dataSource={auxiliares.map(u => ({ ...u, key: u.id }))}>
              <Column title="Nome" dataIndex="nomeCompleto" />
              <Column title="Apelido" dataIndex="apelido" />
              <Column
                title=""
                render={(value, record) => (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <RemoveUserTimeButton user={record} time={time} groupName="Treinador" />
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
            <ModalGroup time={time} users={users} groupName="Jogador" userlist={jogadores} />
            <Table bordered size="small" dataSource={jogadores.map(u => ({ ...u, key: u.id }))}>
              <Column title="Nome" dataIndex="nomeCompleto" />
              <Column title="Apelido" dataIndex="apelido" />
              <Column
                title=""
                render={(value, record) => (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <RemoveUserTimeButton user={record} time={time} groupName="Treinador" />
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

TimeDetailCard.propTypes = {
  time: PropTypes.shape({
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

export default connect(mapStateToProps, mapDispatchToProps)(TimeDetailCard)
