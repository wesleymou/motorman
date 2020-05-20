import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Tooltip, Dropdown, Menu, Button } from 'antd'

import Column from 'antd/lib/table/Column'
import { ToolOutlined } from '@ant-design/icons'
import UserAvatar from './UserAvatar'
import StatusTag from '~/components/StatusTag'
import { formatPhoneNumber, formatDateTime } from '~/util/stringUtil'

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

const renderTag = (value, record) => <StatusTag entity={record} />

function UsersTable({ loading, pagination, users, onUserChange, onChange }) {
  const dataSource = loading ? [] : users.map(u => ({ ...u, key: u.id }))

  return (
    <Table
      pagination={pagination}
      size="small"
      loading={loading}
      dataSource={dataSource}
      onChange={onChange}
    >
      <Column title="" dataIndex="avatar" render={renderAvatar} />

      <Column
        sorter
        title="Apelido"
        dataIndex="nickname"
        render={(value, record) => <Link to={`/app/user/${record.id}`}>{record.nickname}</Link>}
      />

      <Column
        title="Time(s)"
        render={record => record.teams.map(team => <div key={team.id}>{team.name}</div>)}
      />

      <Column sorter title="Nome" dataIndex="fullName" />
      <Column sorter title="E-mail" dataIndex="email" />
      <Column sorter title="Telefone" dataIndex="phone" render={formatPhoneNumber} />

      <Column sorter title="Data Cadastro" dataIndex="created_at" render={formatDateTime} />
      <Column sorter title="Status" dataIndex="active" render={renderTag} />
      <Column
        sorter
        title="Plano"
        dataIndex="plan_id"
        render={(value, record) => <div>{record.plan && record.plan.name}</div>}
      />
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

UsersTable.propTypes = {
  pagination: PropTypes.shape({
    current: PropTypes.number,
    pageSize: PropTypes.number,
    total: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  onUserChange: PropTypes.func,
}

UsersTable.defaultProps = {
  onUserChange: null,
}

export default UsersTable
