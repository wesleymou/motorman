import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, message, Typography } from 'antd'

import { PlusOutlined } from '@ant-design/icons'
import qs from 'query-string'
import { useLocation, useHistory } from 'react-router-dom'
import UsersTable from '~/components/user/UsersTable'
import RedirectButton from '~/components/RedirectButton'
import UserFilterForm from '~/components/forms/UserFilterForm'
import * as userListStore from '~/store/ducks/userList'
import * as planListStore from '~/store/ducks/planList'

const { Paragraph, Title } = Typography

function UserList({ users, fetchUsers, updateUser, plans, fetchPlans }) {
  const location = useLocation()
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [queryString, setQueryString] = useState(location.search)
  const [initialValues] = useState(qs.parse(queryString))

  useEffect(() => {
    fetchPlans()
  }, [fetchPlans])

  useEffect(() => {
    const query = qs.parse(queryString)
    fetchUsers(query)
      .then(history.push(`${history.location.pathname}?${queryString.replace(/\?/, '')}`))
      .catch(() => {
        message.error('Ocorreu um erro de conexão ao tentar buscar a lista de usuários.')
      })
      .finally(() => setLoading(false))
  }, [fetchUsers, queryString, history])

  const handleFilterSubmit = params => setQueryString(qs.stringify(params))

  return (
    <Card>
      <Title>Usuários</Title>
      <Paragraph>Todos os usuários cadastrados no sistema</Paragraph>

      <div className="mb-lg">
        <RedirectButton path="/app/user/create" icon={<PlusOutlined />}>
          Cadastrar usuário
        </RedirectButton>
      </div>

      <div className="mb-lg">
        <UserFilterForm initialValues={initialValues} onSubmit={handleFilterSubmit} plans={plans} />
      </div>

      <UsersTable users={users} loading={loading} onUserChange={updateUser} />
    </Card>
  )
}

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })
  ).isRequired,
  fetchUsers: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  fetchPlans: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  users: state.userList,
  plans: state.planList,
})

const mapDispatchToProps = {
  fetchUsers: userListStore.fetchUsers,
  updateUser: userListStore.userUpdated,
  fetchPlans: planListStore.fetchPlans,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
