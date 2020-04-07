import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Row, Col, Button, Tooltip } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import TimeAvatar from '../TimeAvatar'

import rules from './rules'

function EditTimeForm({ time, onSubmit }) {
  const [form] = Form.useForm()

  const initialValues = time ? { ...time } : null

  const handleFinish = values => {
    onSubmit(values)
  }

  return (
    <Row>
      <Col span={24}>
        <Row justify="center" className="mb-md">
          <Col flex>
            <TimeAvatar time={time} size={120} />
          </Col>
        </Row>
        <Row justify="center">
          <Col flex>
            <Tooltip title="Em breve..." placement="bottom">
              <Button type="dashed">Mudar foto</Button>
            </Tooltip>
          </Col>
        </Row>
      </Col>
      <Col span={12} offset={6}>
        <Form
          layout="vertical"
          name="time"
          form={form}
          onFinish={handleFinish}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Form.Item>
            <Form.Item required name="name" label="Nome:" rules={[rules.required]}>
              <Input type="text" />
            </Form.Item>
            <Form.Item required name="description" label="Descrição:" rules={[rules.required]}>
              <Input type="text" />
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

EditTimeForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  time: PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string,
    descricao: PropTypes.string,
  }),
}

EditTimeForm.defaultProps = {
  time: null,
}

export default EditTimeForm
