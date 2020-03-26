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
      loading: false,
    }
  }

  componentDidMount = async () => {
    const { fetchUsers } = this.props
    this.setState({ loading: true })

    try {
      await fetchUsers()
    } catch (error) {
      message.error('Ocorreu um erro de conexão ao tentar buscar a lista de usuários.')
    }

    this.setState({ loading: false })
  }

  render() {
    const { users, updateUser } = this.props
    const { loading } = this.state
    return (
      <Card>
        <div className="mb-sm">
          <Link to="/app/user/create">Cadastrar usuário</Link>
        </div>
        <UsersTable users={users} loading={loading} onUserChange={updateUser} />
      </Card>
    )
  }
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  fetchUsers: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  users: state.userList,
})

const mapDispatchToProps = {
  fetchUsers: userListStore.fetchUsers,
  updateUser: userListStore.userUpdated,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
