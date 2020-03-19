import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, message } from 'antd'
import UsersTable from '../../components/UsersTable'

import { fetchUsers } from '../../store/ducks/users'

class UserList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      loading: true,
    }
  }

  componentDidMount = () => this.onInit()

  onInit = () => {
    this.setState({ loading: true })

    const { fetchFromStore } = this.props

    fetchFromStore()
      .then(({ payload }) => this.setState({ users: payload.users, loading: false }))
      .catch(() => {
        this.setState({ loading: false })
        message.error('Ocorreu um erro de conexão ao tentar buscar a lista de usuários.')
      })
  }

  render() {
    const { users, loading } = this.state
    return (
      <Card>
        <UsersTable users={users} loading={loading} />
      </Card>
    )
  }
}

UserList.propTypes = {
  fetchFromStore: PropTypes.func.isRequired,
}

export default connect(null, { fetchFromStore: fetchUsers })(UserList)
