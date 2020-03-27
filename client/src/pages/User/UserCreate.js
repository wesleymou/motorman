import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Card, Col, message } from 'antd'

import { useHistory } from 'react-router-dom'
import * as userStore from '../../store/ducks/user'
import EditUserForm from '../../components/forms/EditUserForm'

function UserCreate({ createUser }) {
  const history = useHistory()

  const handleSubmit = async data => {
    try {
      const { payload: user } = await createUser(data)

      message.success('Usuário cadastrado com sucesso.')

      history.push(`/app/user/${user.id}`)
    } catch (error) {
      message.error(
        'Ocorreu um erro ao tentar cadastrar o usuário. Revise os dados e tente novamente.'
      )
    }
  }

  return (
    <Card>
      <Row>
        <Col xs={24} md={16} lg={12} xl={8}>
          <EditUserForm user={null} onSubmit={handleSubmit} />
        </Col>
      </Row>
    </Card>
  )
}

UserCreate.propTypes = {
  createUser: PropTypes.func.isRequired,
}

export default connect(null, {
  createUser: userStore.createUser,
})(UserCreate)
