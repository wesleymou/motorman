import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Card, Col, message, Typography } from 'antd'

import { useHistory } from 'react-router-dom'
import * as userStore from '~/store/ducks/user'
import EditUserForm from '~/components/forms/EditUserForm'

const { Paragraph, Title } = Typography

function UserCreate({ createUser }) {
  const history = useHistory()

  const handleSubmit = async data => {
    const hideLoadingMessage = message.loading('Aguarde...')

    try {
      const { payload: user } = await createUser(data)
      hideLoadingMessage()
      message.success('Usuário cadastrado com sucesso.')
      history.push(`/app/user/${user.id}`)
    } catch (error) {
      message.error(
        'Ocorreu um erro ao tentar cadastrar o usuário. Revise os dados e tente novamente.'
      )
    }
  }

  return (
    <div>
      <Card>
        <div className="text-center mb-lg">
          <Title>Cadastrar usuário</Title>
          <Paragraph>Preencha o formulário abaixo para cadastrar um novo usuário</Paragraph>
        </div>
        <Row justify="center">
          <Col xs={24} md={16} lg={12} xl={8}>
            <EditUserForm onSubmit={handleSubmit} />
          </Col>
        </Row>
      </Card>
    </div>
  )
}

UserCreate.propTypes = {
  createUser: PropTypes.func.isRequired,
}

export default connect(null, {
  createUser: userStore.createUser,
})(UserCreate)
