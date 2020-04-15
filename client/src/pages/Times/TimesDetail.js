import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Skeleton, Card, message } from 'antd'
import TimeDetailCard from '../../components/times/TimeDetailCard'
import * as userListStore from '../../store/ducks/userList'

import * as teamStore from '../../store/ducks/team'

class TimeDetail extends Component {
  componentDidMount = async () => {
    const { match, fetchTeam, fetchUsers } = this.props
    const { params } = match
    const { id } = params
    this.setState({ loading: true })

    try {
      fetchTeam(id)
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
    const { time, users } = this.props
    return (
      <Card>
        {time ? <TimeDetailCard time={time} users={users} /> : <Skeleton avatar paragraph={3} />}
      </Card>
    )
  }
}

TimeDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchTeam: PropTypes.func.isRequired,
  time: PropTypes.shape({
    id: PropTypes.number,
  }),
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ),
}

const mapDispatchToProps = {
  fetchUsers: userListStore.fetchUsers,
  fetchTeam: teamStore.fetchTeam,
}

const mapStateToProps = state => ({
  time: state.team,
  users: state.userList,
})

const TimeDetailContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(TimeDetail))

export default TimeDetailContainer
