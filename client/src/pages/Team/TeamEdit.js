import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Skeleton, Col, Row, message } from 'antd'
import { connect } from 'react-redux'
import * as teamStore from '../../store/ducks/team'

import EditTeamForm from '../../components/forms/EditTeamForm'

class TeamEdit extends Component {
  componentDidMount = () => {
    const { match, fetchTeam } = this.props
    const { params } = match
    const { id } = params
    fetchTeam(id)
  }

  handleSubmit = async data => {
    const { team, updateTeam } = this.props
    const payload = { id: team.id, ...data }
    try {
      await updateTeam(payload)
      message.success('Time atualizado com sucesso!')
      window.location.href = '/app/team'
    } catch (error) {
      message.error('Ocorreu um erro. Por favor, revise os dados e tente novamente.')
    }
  }

  render() {
    const { team } = this.props
    return (
      <Card>
        {team ? (
          <Row>
            <Col span={24}>
              <EditTeamForm team={team} onSubmit={this.handleSubmit} />
            </Col>
          </Row>
        ) : (
          <Skeleton avatar paragraph={3} />
        )}
      </Card>
    )
  }
}

TeamEdit.propTypes = {
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
  team: PropTypes.shape({
    id: PropTypes.number,
  }),
}

TeamEdit.defaultProps = {
  team: null,
}

const mapStateToProps = state => ({
  team: state.team,
})

const mapDispatchToProps = {
  updateTeam: teamStore.updateTeam,
  fetchTeam: teamStore.fetchTeam,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TeamEdit))
