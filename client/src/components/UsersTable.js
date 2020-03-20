import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Tooltip } from 'antd'
import { EditOutlined, UserOutlined } from '@ant-design/icons'

import Column from 'antd/lib/table/Column'
import UserAvatar from './UserAvatar'
import UserStatusTag from './UserStatusTag'

const renderAvatar = (value, record) => (
  <Tooltip title="Ver detalhes">
    <Link to={`/app/user/${record.id}`}>
      <UserAvatar user={record} />
    </Link>
  </Tooltip>
)

const renderBadge = (value, record) => <UserStatusTag user={record} />

function UsersTable({ loading, users }) {
  return (
    <Table size="small" loading={loading} dataSource={users.map(u => ({ ...u, key: u.id }))}>
      <Column title="" dataIndex="avatar" render={renderAvatar} />
      <Column title="Apelido" dataIndex="apelido" />
      <Column title="Nome" dataIndex="nomeCompleto" />
      <Column title="E-mail" dataIndex="email" />
      <Column title="Telefone" dataIndex="telefone" />
      <Column
        title="Data Cadastro"
        dataIndex="created_at"
        render={value => new Date(value).toLocaleString()}
      />
      <Column title="Status" dataIndex="active" render={renderBadge} />
      <Column
        title="Opções"
        render={(value, record) => (
          <div>
            <Link to={`/app/user/${record.id}`}>
              <UserOutlined /> Ver detalhes
            </Link>
            &nbsp;&nbsp;&nbsp;
            <Link to={`/app/user/edit/${record.id}`}>
              <EditOutlined /> Editar
            </Link>
          </div>
        )}
      />
    </Table>
  )
}

const userProps = PropTypes.shape({
  id: PropTypes.number,
})

UsersTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(userProps).isRequired,
}

export default UsersTable
