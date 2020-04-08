import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Row, Col, Typography, Button, Radio, Tooltip } from 'antd'
import { SaveOutlined } from '@ant-design/icons'
import UserAvatar from '../UserAvatar'
import PhoneInput from '../masked-inputs/PhoneInput'
import CPFInput from '../masked-inputs/CPFInput'
import DecimalInput from '../masked-inputs/DecimalInput'
import DateInput from '../masked-inputs/DateInput'
import IntegerInput from '../masked-inputs/IntegerInput'
import CepSearchInput from '../CepSearchInput'
import { parseNumber } from '../../util/numberUtil'
import rules from './rules'

const { Title } = Typography

function EditUserForm({ user, onSubmit }) {
  const [form] = Form.useForm()

  const initialValues = user
    ? {
        ...user,
        dob: user.dataNasc ? new Date(user.dataNasc).toLocaleDateString('pt-br') : '',
        pesoNumberFormat: parseNumber(user.peso) || null,
        numero: parseNumber(user.numero) || null,
      }
    : null

  const handleFinish = values => {
    const { dob, cpf, cep, pesoNumberFormat, numero, altura } = values
    const date = dob ? dob.split('/') : []
    const [day, month, year] = date
    const dataNasc = date.length === 3 ? [year, month, day].join('-') : null

    const payload = {
      ...values,
      dataNasc,
      cpf: cpf ? cpf.replace(/\D/g, '') : null,
      cep: cep ? cep.replace(/\D/g, '') : null,
      peso: parseNumber(pesoNumberFormat) || null,
      numero: parseNumber(numero) || null,
      altura: parseNumber(altura) || null,
    }
    onSubmit(payload)
  }

  const handleCepResult = data => {
    form.setFieldsValue({
      estado: data.uf,
      cidade: data.cidade,
      endereco: data.logradouro,
      bairro: data.bairro,
    })
  }

  return (
    <Row>
      <Col xs={24}>
        <Row justify="center" className="mb-md">
          <Col flex>
            <UserAvatar user={user} size={120} />
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
          name="user"
          form={form}
          onFinish={handleFinish}
          initialValues={initialValues}
          scrollToFirstError
        >
          <Row className="pt-lg">
            <Col>
              <Title level={4}>Contato</Title>
            </Col>
          </Row>

          <Form.Item required name="nomeCompleto" label="Nome completo:" rules={[rules.required]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item required name="email" label="E-mail:" rules={[rules.email, rules.required]}>
            <Input placeholder="email@exemplo.com" />
          </Form.Item>
          <Form.Item required name="telefone" label="Telefone:" rules={[rules.required]}>
            <PhoneInput />
          </Form.Item>

          <Row className="pt-lg">
            <Col>
              <Title level={4}>Informações pessoais</Title>
            </Col>
          </Row>

          <Form.Item required name="sexo" label="Sexo:" rules={[rules.required]}>
            <Radio.Group>
              <Radio value="Masculino">Masculino</Radio>
              <Radio value="Feminino">Feminino</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item name="apelido" label="Apelido:">
            <Input />
          </Form.Item>
          <Form.Item name="rg" label="RG:">
            <Input placeholder="Apenas números" />
          </Form.Item>
          <Form.Item name="cpf" label="CPF:">
            <CPFInput />
          </Form.Item>
          <Form.Item name="pesoNumberFormat" label="Peso (kg):">
            <DecimalInput />
          </Form.Item>
          <Form.Item name="altura" label="Altura (cm):">
            <IntegerInput />
          </Form.Item>
          <Form.Item name="dob" label="Data de nascimento:">
            <DateInput />
          </Form.Item>
          <Form.Item name="planoSaude" label="Plano de saúde (se houver):">
            <Input />
          </Form.Item>

          <Row className="pt-lg">
            <Col>
              <Title level={4}>Endereço</Title>
            </Col>
          </Row>

          <Form.Item name="cep" label="CEP:">
            <CepSearchInput onSearchResult={handleCepResult} />
          </Form.Item>
          <Form.Item name="estado" label="Estado:">
            <Input />
          </Form.Item>
          <Form.Item name="cidade" label="Cidade:">
            <Input />
          </Form.Item>
          <Form.Item name="bairro" label="Bairro:">
            <Input />
          </Form.Item>
          <Form.Item name="endereco" label="Endereço:">
            <Input />
          </Form.Item>
          <Form.Item name="numero" label="Número:">
            <IntegerInput />
          </Form.Item>
          <Form.Item name="complemento" label="Complemento:">
            <Input />
          </Form.Item>

          <Row className="pt-lg">
            <Col>
              <Title level={4}>Responsável/Contato de emergência</Title>
            </Col>
          </Row>

          <Form.Item name="nomeResponsavel" label="Nome do responsável:">
            <Input />
          </Form.Item>
          <Form.Item name="emailResponsavel" label="E-mail do responsável:" rules={[rules.email]}>
            <Input />
          </Form.Item>
          <Form.Item name="telefoneResponsavel" label="Telefone do responsável:">
            <PhoneInput />
          </Form.Item>
          <Form.Item name="grauParentescoResponsavel" label="Grau de parentesco:">
            <Input />
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

EditUserForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
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
  }),
}

EditUserForm.defaultProps = {
  user: null,
}

export default EditUserForm
