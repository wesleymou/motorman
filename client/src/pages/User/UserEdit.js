import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Card, Skeleton } from 'antd'
import { connect } from 'react-redux'
import * as usersStore from '../../store/ducks/users'

import EditUserForm from '../../components/forms/EditUserForm'

class UserEdit extends Component {
  componentDidMount = () => {
    const { match, selectUser } = this.props
    const { params } = match
    const { id } = params
    selectUser(id)
  }

  render() {
    const { user } = this.props
    return <Card>{user ? <EditUserForm user={user} /> : <Skeleton avatar paragraph={3} />}</Card>
  }
}

UserEdit.propTypes = {
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
const mapStateToProps = state => ({
  user: state.users.user,
})

const mapDispatchToProps = {
  editUser: usersStore.updateUser,
  removeUser: usersStore.removeUser,
  selectUser: usersStore.selectUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserEdit))
