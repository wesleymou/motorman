import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Skeleton, Card, message } from 'antd'
import TeamDetailCard from '~/components/times/TeamDetailCard'

import * as teamStore from '~/store/ducks/team'

import NotFound from '~/pages/NotFound'

class TeamDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount = async () => {
    const { match, fetchTeam } = this.props
    const { params } = match
    const { id } = params

    try {
      await fetchTeam(id)
    } catch (error) {
      message.error('Ocorreu um erro de conexão ao tentar buscar os dados do time.')
    }

    this.setState({ loading: false })
  }

  render() {
    const { team } = this.props
    const { loading } = this.state

    if (loading) {
      return (
        <Card>
          <Skeleton active avatar paragraph={3} />
        </Card>
      )
    }

    if (team) {
      return (
        <Card>
          <TeamDetailCard team={team} />
        </Card>
      )
    }

    return <NotFound />
  }
}

TeamDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchTeam: PropTypes.func.isRequired,
  team: PropTypes.shape({
    id: PropTypes.number,
  }),
}

TeamDetail.defaultProps = {
  team: null,
}

const mapDispatchToProps = {
  fetchTeam: teamStore.fetchTeam,
  addMember: teamStore.addMember,
  deleteMember: teamStore.deleteMember,
}

const mapStateToProps = state => ({
  team: state.team,
})

const TeamDetailContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(TeamDetail))

export default TeamDetailContainer
