import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Card, Col, message } from 'antd'

import { useHistory } from 'react-router-dom'
import * as teamStore from '../../store/ducks/team'
import EditTeamForm from '../../components/forms/EditTeamForm'

function TeamCreate({ createTeam }) {
  const history = useHistory()

  const handleSubmit = async data => {
    try {
      const { payload: time } = await createTeam(data)

      message.success('Time cadastrado com sucesso.')

      history.push(`/app/team/${time.id}`)
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
