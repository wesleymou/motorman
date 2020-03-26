import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, message } from 'antd'
import UsersTable from '../../components/UsersTable'

import * as userListStore from '../../store/ducks/userList'

class UserList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      loading: true,
    }
  }

  componentDidMount = () => {
    this.setState({ loading: true })

    const { fetchUsers } = this.props

    fetchUsers()
      .then(({ payload }) => this.setState({ users: payload, loading: false }))
      .catch(() => {
        this.setState({ loading: false })
        message.error('Ocorreu um erro de conexão ao tentar buscar a lista de usuários.')
      })
  }

  render() {
    const { users, loading } = this.state
    return (
      <Card>
        <div className="mb-sm">
          <Link to="/app/user/create">Cadastrar usuário</Link>
        </div>
        <UsersTable users={users} loading={loading} />
      </Card>
    )
  }
}

UserList.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
}

export default connect(null, { fetchUsers: userListStore.fetchUsers })(UserList)
