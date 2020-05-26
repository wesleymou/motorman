import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Card, Col, message, Typography } from 'antd'

import { useHistory } from 'react-router-dom'
import * as userStore from '~/store/ducks/user'
import * as planListStore from '~/store/ducks/planList'
import EditUserForm from '~/components/forms/EditUserForm'

const { Paragraph, Title } = Typography

function UserCreate({ createUser, fetchPlans }) {
  const history = useHistory()
  const [plans, setPlans] = useState([])

  useEffect(() => {
    document.title = 'Usuários - Motorman'
    ;(async () => {
      const result = await fetchPlans()
      setPlans(result.plans)
    })()
  }, [fetchPlans])

  const handleSubmit = async data => {
    const key = 'loadingMessage'

    try {
      message.loading({ content: 'Aguarde...', key, duration: 0 })
      const { payload: user } = await createUser(data)

      message.success({ content: 'Usuário cadastrado com sucesso.', key })
      history.push(`/app/user/${user.id}`)
    } catch (error) {
      message.error({
        content:
          'Ocorreu um erro ao tentar cadastrar o usuário. Revise os dados e tente novamente.',
        key,
      })
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
            <EditUserForm onSubmit={handleSubmit} plans={plans} />
          </Col>
        </Row>
      </Card>
    </div>
  )
}

UserCreate.propTypes = {
  createUser: PropTypes.func.isRequired,
  fetchPlans: PropTypes.func.isRequired,
}

export default connect(
  state => ({
    plans: state.planList,
  }),
  {
    createUser: userStore.createUser,
    fetchPlans: planListStore.fetchPlans,
  }
)(UserCreate)
