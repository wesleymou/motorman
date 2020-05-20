import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Col, Row, Select } from 'antd'
import FilterForm from '~/components/FilterForm'

function UserFilterForm({ onSubmit, initialValues, plans }) {
  const [form] = Form.useForm()

  return (
    <FilterForm initialValues={initialValues} form={form} onSubmit={onSubmit}>
      <Row gutter={16}>
        <Col xs={24} md={12} lg={6}>
          <Form.Item name="nickname" label="Apelido">
            <Input allowClear placeholder="Apelido do usuário" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Form.Item name="fullName" label="Nome completo">
            <Input allowClear placeholder="Nome do usuário" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={4}>
          <Form.Item name="active" label="Status">
            <Select defaultValue={null}>
              <Select.Option value={null}>Todos</Select.Option>
              <Select.Option value="1">Ativo</Select.Option>
              <Select.Option value="0">Inativo</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12} lg={6}>
          <Form.Item name="plan_id" label="Plano">
            <Select defaultValue={null}>
              <Select.Option>Todos</Select.Option>
              {plans.map(plan => (
                <Select.Option key={plan.id} value={plan.id}>
                  {plan.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </FilterForm>
  )
}

UserFilterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  initialValues: PropTypes.shape({
    fullName: PropTypes.string,
    nickname: PropTypes.string,
    active: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    plan_id: PropTypes.number,
  }),
}

UserFilterForm.defaultProps = {
  initialValues: null,
}

export default UserFilterForm
