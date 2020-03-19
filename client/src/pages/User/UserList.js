import React, { Component } from 'react'
import { Card, message } from 'antd'
import UsersTable from '../../components/UsersTable'
import api from '../../services/api'

class UserList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      users: [],
      loading: true,
    }
  }

  componentDidMount() {
    this.fetchUsers()
  }

  fetchUsers = async () => {
    try {
      this.setState({ loading: true })
      const { data } = await api.get('/user')
      this.setState({ users: data })
    } catch (error) {
      message.error('Ocorreu um erro de conexão ao tentar buscar a lista de usuários.')
    } finally {
      this.setState({ loading: false })
    }
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

export default UserList
