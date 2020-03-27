import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Row, Col, Typography, Button, Radio, Tooltip } from 'antd'
import TimeAvatar from '../TimeAvatar'
import { parseNumber } from '../../util/numberUtil'

const { Title } = Typography

const rules = {
  required: {
    required: true,
    message: 'Preenchimento obrigatório',
  },
}

function EditTimeForm({ time, onSubmit }) {
  const [form] = Form.useForm()

  const handleFinish = values => {
    onSubmit(...values)
  }

  return (
    <Row>
      <Col xs={24}>
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
      <Col xs={24}>
        <Form
          layout="vertical"
          name="time"
          form={form}
          onFinish={handleFinish}
          initialValues={time}
          scrollToFirstError
        >

          <Form.Item required name="nome" label="Nome:" rules={[rules.required]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item required name="descricao" label="Descrição:" rules={[rules.required]}>
            <Input type="text" />
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
