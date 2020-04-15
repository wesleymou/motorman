import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Card, Col, message } from 'antd'

import { useHistory } from 'react-router-dom'
import * as teamStore from '../../store/ducks/team'
import EditTimeForm from '../../components/forms/EditTimeForm'

function TimesCreate({ createTeams }) {
  const history = useHistory()

  const handleSubmit = async data => {
    try {
      const { payload: time } = await createTeams(data)

      message.success('Time cadastrado com sucesso.')

      history.push(`/app/times/${time.id}`)
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
          <EditTimeForm time={null} onSubmit={handleSubmit} />
        </Col>
      </Row>
    </Card>
  )
}

TimesCreate.propTypes = {
  createTeams: PropTypes.func.isRequired,
}

export default connect(null, {
  createTeams: teamStore.createTeam,
})(TimesCreate)
