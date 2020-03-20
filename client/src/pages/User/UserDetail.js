import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Skeleton } from 'antd'

import UserDetailCard from '../../components/UserDetailCard'

import * as usersStore from '../../store/ducks/users'

class UserDetail extends Component {
  componentDidMount = () => {
    const { match, selectUser } = this.props
    const { params } = match
    const { id } = params
    selectUser(id)
  }

  render() {
    const { user } = this.props
    return user ? <UserDetailCard user={user} /> : <Skeleton avatar paragraph={3} />
  }
}

UserDetail.propTypes = {
  selectUser: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
}

const mapDispatchToProps = {
  selectUser: usersStore.selectUser,
}

const mapStateToProps = state => ({
  user: state.users.user,
})

const UserDetailContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDetail))

export default UserDetailContainer
