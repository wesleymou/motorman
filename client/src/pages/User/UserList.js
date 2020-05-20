import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, message, Typography } from 'antd'

import { PlusOutlined } from '@ant-design/icons'
import UsersTable from '~/components/user/UsersTable'
import RedirectButton from '~/components/RedirectButton'
import * as userListStore from '~/store/ducks/userList'

const { Paragraph, Title } = Typography

class UserList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount = async () => {
    const { fetchUsers } = this.props
    document.title = 'Usuários - Motorman'

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
        <Title>Usuários</Title>
        <Paragraph>Todos os usuários cadastrados no sistema</Paragraph>

        <div className="mb-lg">
          <RedirectButton path="/app/user/create" icon={<PlusOutlined />}>
            Cadastrar usuário
          </RedirectButton>
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
