import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Skeleton, Card, message } from 'antd'
import TimeDetailCard from '../../components/times/TimeDetailCard'
import * as userListStore from '../../store/ducks/userList'

import * as timeStore from '../../store/ducks/times'

class TimeDetail extends Component {
  componentDidMount = async () => {
    const { match, fetchTime, fetchUsers } = this.props
    const { params } = match
    const { id } = params
    this.setState({ loading: true })

    try {
      fetchTime(id)
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
    return <Card>{time ? <TimeDetailCard time={time} users={users} /> : <Skeleton avatar paragraph={3} />}</Card>
  }
}

TimeDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchTime: PropTypes.func.isRequired,
  time: PropTypes.shape({
    id: PropTypes.number,
  }),
  fetchUsers: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number
    })
  ),
}

const mapDispatchToProps = {
  fetchUsers: userListStore.fetchUsers,
  fetchTime: timeStore.fetchTime,
}

const mapStateToProps = state => ({
  time: state.time,
  users: state.userList,
})

const TimeDetailContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(TimeDetail))

export default TimeDetailContainer
