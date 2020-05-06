import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Tooltip, Dropdown, Menu, Button } from 'antd'

import Column from 'antd/lib/table/Column'
import { ToolOutlined } from '@ant-design/icons'
import UserAvatar from './UserAvatar'
import UserStatusTag from './UserStatusTag'
import { formatPhoneNumber, formatDateTime } from '../util/stringUtil'

import EditUserButton from './EditUserButton'
import RemoveUserButton from './RemoveUserButton'
import RestoreUserButton from './RestoreUserButton'

const renderAvatar = (value, record) => (
  <Tooltip title="Ver detalhes">
    <Link to={`/app/user/${record.id}`}>
      <UserAvatar user={record} />
    </Link>
  </Tooltip>
)

const renderTag = (value, record) => <UserStatusTag user={record} />

function UsersTable({ loading, users, onUserChange }) {
  const dataSource = loading ? [] : users.map(u => ({ ...u, key: u.id }))

  return (
    <Table size="small" loading={loading} dataSource={dataSource}>
      <Column title="" dataIndex="avatar" render={renderAvatar} />

      <Column
        title="Apelido"
        dataIndex="nickname"
        render={(value, record) => <Link to={`/app/user/${record.id}`}>{record.nickname}</Link>}
      />

      <Column
        title="Time(s)"
        render={record => record.teams.map(team => <div key={team.id}>{team.name}</div>)}
      />

      <Column title="Nome" dataIndex="fullName" />
      <Column title="E-mail" dataIndex="email" />
      <Column title="Telefone" dataIndex="phone" render={formatPhoneNumber} />

      <Column title="Data Cadastro" dataIndex="created_at" render={formatDateTime} />
      <Column title="Status" dataIndex="active" render={renderTag} />
      <Column
        title="Opções"
        render={(value, record) => (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <EditUserButton id={record.id} />
                </Menu.Item>
                <Menu.Item>
                  {React.createElement(record.active ? RemoveUserButton : RestoreUserButton, {
                    user: record,
                    onUserChange,
                  })}
                </Menu.Item>
              </Menu>
            }
          >
            <Button type="link">
              <ToolOutlined />
            </Button>
          </Dropdown>
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
  onUserChange: PropTypes.func,
}

UsersTable.defaultProps = {
  onUserChange: null,
}

export default UsersTable
