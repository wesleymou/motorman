import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Skeleton, Col, Row, message } from 'antd'
import { connect } from 'react-redux'
import * as teamStore from '../../store/ducks/team'

import EditTimeForm from '../../components/forms/EditTimeForm'

class TimeEdit extends Component {
  componentDidMount = () => {
    const { match, fetchTeam } = this.props
    const { params } = match
    const { id } = params
    fetchTeam(id)
  }

  handleSubmit = async data => {
    const { time, updateTeam } = this.props
    const payload = { id: time.id, ...data }
    try {
      await updateTeam(payload)
      message.success('Time atualizado com sucesso!')
      window.location.href = '/app/times'
    } catch (error) {
      message.error('Ocorreu um erro. Por favor, revise os dados e tente novamente.')
    }
  }

  render() {
    const { time } = this.props
    return (
      <Card>
        {time ? (
          <Row>
            <Col span={24}>
              <EditTimeForm time={time} onSubmit={this.handleSubmit} />
            </Col>
          </Row>
        ) : (
            <Skeleton avatar paragraph={3} />
          )}
      </Card>
    )
  }
}

TimeEdit.propTypes = {
  fetchTeam: PropTypes.func.isRequired,
  updateTeam: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  time: PropTypes.shape({
    id: PropTypes.number,
  }),
}

TimeEdit.defaultProps = {
  time: null,
}

const mapStateToProps = state => ({
  time: state.team,
})

const mapDispatchToProps = {
  updateTeam: teamStore.updateTeam,
  fetchTeam: teamStore.fetchTeam,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TimeEdit))
