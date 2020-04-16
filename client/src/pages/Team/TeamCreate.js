import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Card, Col, message, Typography } from 'antd'

import { useHistory } from 'react-router-dom'
import * as teamStore from '~/store/ducks/team'
import EditTeamForm from '~/components/forms/EditTeamForm'

const { Paragraph, Title } = Typography

function TeamCreate({ createTeam }) {
  const history = useHistory()

  const handleSubmit = async data => {
    try {
      const hideLoadingMessage = message.loading('Aguarde...')

      const { payload: team } = await createTeam(data)

      hideLoadingMessage()

      message.success('Time cadastrado com sucesso.')

      history.push(`/app/team/${team.id}`)
    } catch (error) {
      message.error(
        'Ocorreu um erro ao tentar cadastrar o time. Revise os dados e tente novamente.'
      )
    }
  }

  return (
    <Card>
      <Row>
        <Col span={24}>
          <div className="text-center mb-lg">
            <Title>Cadastrar time</Title>
            <Paragraph>Preencha o formulário abaixo para cadastrar um novo time</Paragraph>
          </div>
          <EditTeamForm onSubmit={handleSubmit} />
        </Col>
      </Row>
    </Card>
  )
}

TeamCreate.propTypes = {
  createTeam: PropTypes.func.isRequired,
}

export default connect(null, {
  createTeam: teamStore.createTeam,
})(TeamCreate)
