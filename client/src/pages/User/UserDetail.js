import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Skeleton, Card } from 'antd'

import UserDetailCard from '../../components/UserDetailCard'

import * as userStore from '../../store/ducks/user'

class UserDetail extends Component {
  componentDidMount = () => {
    const { match, fetchUser } = this.props
    const { params } = match
    const { id } = params
    fetchUser(id)
  }

  render() {
    const { user } = this.props
    return <Card>{user ? <UserDetailCard user={user} /> : <Skeleton avatar paragraph={3} />}</Card>
  }
}

UserDetail.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
}

const mapDispatchToProps = {
  fetchUser: userStore.fetchUser,
}

const mapStateToProps = state => ({
  user: state.user,
})

const UserDetailContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDetail))

export default UserDetailContainer
