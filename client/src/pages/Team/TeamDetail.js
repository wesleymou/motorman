import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Skeleton, Card, message } from 'antd'
import TeamDetailCard from '~/components/times/TeamDetailCard'

import * as userListStore from '~/store/ducks/userList'
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
    const { match, fetchTeam, fetchUsers } = this.props
    const { params } = match
    const { id } = params

    try {
      await fetchTeam(id)
    } catch (error) {
      message.error('Ocorreu um erro de conexão ao tentar buscar os dados do time.')
    }

    try {
      await fetchUsers()
    } catch (error) {
      message.error('Ocorreu um erro de conexão ao tentar buscar a lista de usuários.')
    }

    this.setState({ loading: false })
  }

  render() {
    const { team, users } = this.props
    const { loading } = this.state

    if (loading) {
      return (
        <Card>
          <Skeleton active avatar paragraph={3} />
        </Card>
      )
    }

    if (team && users) {
      return (
        <Card>
          <TeamDetailCard team={team} users={users} /> :
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
  }).isRequired,
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
}

const mapDispatchToProps = {
  fetchUsers: userListStore.fetchUsers,
  fetchTeam: teamStore.fetchTeam,
}

const mapStateToProps = state => ({
  team: state.team,
  users: state.userList,
})

const TeamDetailContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(TeamDetail))

export default TeamDetailContainer
