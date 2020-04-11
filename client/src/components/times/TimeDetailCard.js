import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton, Typography, Row, Col, Table, Dropdown, Menu, Button } from 'antd'
import RemoveTimeButton from './RemoveTimeButton'
import EditTimeButton from './EditTimeButton'
import RemoveUserTimeButton from './RemoveUserTimeButton'
import TimeAvatar from './TimeAvatar'
import Column from 'antd/lib/table/Column'
import ModalJogador from './ModalJogador'
import ModalTreinador from './ModalTreinador'
import ModalAuxiliar from './ModalAuxiliar'
import { ToolOutlined } from '@ant-design/icons'

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

function TimeDetailCard({ time, users }) {

  // Todo: recuperar treinadores, jogadores e auxiliares do time (em time deveria ter uma entrada users)
  const treinadores = []
  const jogadores = []
  const auxiliares = []

  return time ? (
    <Row>

      <Col span={6} >
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
        <Row >
          <Col> 
            <Title level={2}>{time.name}</Title>
          </Col>
        </Row>
        <Row className="mb-sm">
          <UserField label="Descrição:" value={time.description} />
        </Row>
      </Col>

      <Col span={24}  className="pt-lg mt-lg" style={{ border: "1px solid #f0f0f0" }} >
        <Row justify="center" className="mb-sm">
          <Col span={12} style={{ padding: " 0 15px" }} >
            <ModalTreinador time={time} users={users}/>
            <Table bordered size="small" dataSource={treinadores.map(u => ({ ...u, key: u.id }))}>
              <Column title="Nome" dataIndex="nomeCompleto" />
              <Column title="Apelido" dataIndex="apelido" />
              <Column title=""
                render={(value, record) => (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <RemoveUserTimeButton id={record.id}/>
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
          <Col span={12} style={{ padding: "0 15px" }} > 
            <ModalAuxiliar time={time} users={users}/>
            <Table bordered size="small"  dataSource={auxiliares.map(u => ({ ...u, key: u.id }))}>
              <Column title="Nome" dataIndex="nomeCompleto" />
              <Column title="Apelido" dataIndex="apelido" />
              <Column title=""
                render={(value, record) => (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <RemoveUserTimeButton id={record.id}/>
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
          <Col span={24} style={{ padding: "0 15px" }} > 
            <ModalJogador time={time} users={users}/>
            <Table bordered size="small"  dataSource={jogadores.map(u => ({ ...u, key: u.id }))}>
              <Column title="Nome" dataIndex="nomeCompleto" />
              <Column title="Apelido" dataIndex="apelido" />
              <Column title=""
                render={(value, record) => (
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item>
                          <RemoveUserTimeButton id={record.id}/>
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
    nome: PropTypes.string,
    descricao: PropTypes.string,
  }).isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number
    })
  ).isRequired,
}

export default TimeDetailCard
