import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Skeleton, Card } from 'antd'

import TimeDetailCard from '../../components/TimeDetailCard'
import * as userListStore from '../../store/ducks/userList'

import * as timeStore from '../../store/ducks/times'

class TimeDetail extends Component {
  componentDidMount = () => {
    const { match, fetchTime } = this.props
    const { params } = match
    const { id } = params
    fetchTime(id)
  }

  render() {
    const { time } = this.props
    const { users } = [] //await userListStore.fetchUsers()
    return <Card>{time ? <TimeDetailCard time={time} users={users} /> : <Skeleton avatar paragraph={3} />}</Card>
  }
}

TimeDetail.propTypes = {
  fetchTime: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  time: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
}

const mapDispatchToProps = {
  fetchTime: timeStore.fetchTime,
}

const mapStateToProps = state => ({
  time: state.time,
})

const TimeDetailContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(TimeDetail))

export default TimeDetailContainer
