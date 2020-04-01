import React from 'react'
import PropTypes from 'prop-types'
import { Skeleton, Typography, Row, Col, Table, Form, Select, Button } from 'antd'
import RemoveTimeButton from './RemoveTimeButton'
import EditTimeButton from './EditTimeButton'
import TimeAvatar from './TimeAvatar'
import Column from 'antd/lib/table/Column'
import { PlusOutlined } from '@ant-design/icons'

const { Title, Text, Paragraph } = Typography
const { Option } = Select;

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

function TimeDetailCard({ time }) {
  const [form] = Form.useForm()

  return time ? (
    <Row>
      <Col span={24}>
        <Row justify="center" className="mb-sm">
          <Col>
            <TimeAvatar time={time} size={120} />
          </Col>
        </Row>
        <Row justify="center" >
          <Col> 
            <Title level={2}>{time.name}</Title>
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

      <Col span={24}>
        <Row className="mb-sm">
          <UserField label="Descrição:" value={time.description} />
        </Row>
      </Col>

      <Col span={24}  className="pt-lg mt-lg" style={{ border: "1px solid #f0f0f0" }} >
        <Row justify="center" className="mb-sm">
          <Col span={12} style={{ padding: "0 15px" }} >
            <Title level={4}>Treinadores</Title>
            <Form form={form} layout="inline" >
              <Form.Item style={{width: "15pc", marginBottom: "5px"}}>
                <Select placeholder="Usuário">
                  <Option value="Zhejiang">Zhejiang</Option>
                  <Option value="Jiangsu">Jiangsu</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}></Button>
              </Form.Item>
            </Form>
            <Table bordered size="small" >
              <Column title="Nome" />
              <Column title="Apelido" />
              <Column title="Opções" />
            </Table>
          </Col>
          <Col span={12} style={{ padding: "0 15px" }} > 
            <Title level={4}>Auxiliares</Title>
            <Form form={form} layout="inline" >
              <Form.Item style={{width: "15pc", marginBottom: "5px"}}>
                <Select placeholder="Usuário">
                  <Option value="Zhejiang">Zhejiang</Option>
                  <Option value="Jiangsu">Jiangsu</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}></Button>
              </Form.Item>
            </Form>
            <Table bordered size="small" >
              <Column title="Nome" />
              <Column title="Apelido" />
              <Column title="Opções" />
            </Table>
          </Col>
        </Row>
        <Row justify="center" className="mb-lg">
          <Col span={24} style={{ padding: "0 15px" }} > 
            <Title level={4}>Jogadores</Title>
            <Form form={form} layout="inline" >
              <Form.Item style={{width: "15pc", marginBottom: "5px"}}>
                <Select placeholder="Usuário">
                  <Option value="Zhejiang">Zhejiang</Option>
                  <Option value="Jiangsu">Jiangsu</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<PlusOutlined />}></Button>
              </Form.Item>
            </Form>
            <Table bordered size="small" >
              <Column title="Nome" />
              <Column title="Apelido" />
              <Column title="Opções" />
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
}

export default TimeDetailCard
