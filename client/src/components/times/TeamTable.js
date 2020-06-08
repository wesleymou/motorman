import React from 'react'
import PropTypes, { arrayOf } from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Tooltip, Dropdown, Menu, Button } from 'antd'

import { ToolOutlined } from '@ant-design/icons'
import TeamAvatar from './TeamAvatar'

import EditTeamButton from './EditTeamButton'
import RemoveTeamButton from './RemoveTeamButton'
import RestoreTeamButton from './RestoreTeamButton'
import StatusTag from '~/components/StatusTag'
import DateTimeMask from '../masked/DateTimeMask'

const renderAvatar = (value, record) => (
  <Tooltip title="Ver detalhes">
    <Link to={`/app/team/${record.id}`}>
      <TeamAvatar team={record} />
    </Link>
  </Tooltip>
)

const renderTag = (value, record) => <StatusTag entity={record} />

const filterColumns = (columns, filteredColumns) => {
  return columns.filter(column => !filteredColumns.includes(column.key))
}

function TeamTable({
  loading,
  teams,
  onTimesChange,
  filteredColumns,
  additionalColumns,
  tableProperties,
}) {
  const columns = [
    {
      key: 'avatar',
      title: '',
      dataIndex: 'avatar',
      fixed: 'left',
      width: 50,
      render: renderAvatar,
    },
    {
      key: 'name',
      title: 'Nome',
      dataIndex: 'name',
      fixed: 'left',
      render: (value, record) => <Link to={`/app/team/${record.id}`}>{record.name}</Link>,
      sorter: (a, b) => {
        return a.name.localeCompare(b.name)
      },
    },
    {
      key: 'members',
      title: 'Membros ativos',
      render: record => record.members.length,
      sorter: (a, b) => {
        return a.members.length - b.members.length
      },
    },
    {
      key: 'players',
      title: 'Jogadores',
      render: record => record.members.filter(m => m.role.name === 'player').length,
      sorter: (a, b) => {
        return (
          a.members.filter(m => m.role.name === 'player').length -
          b.members.filter(m => m.role.name === 'player').length
        )
      },
    },
    {
      key: 'created_at',
      title: 'Data cadastro',
      dataIndex: 'created_at',
      render: value => <DateTimeMask value={value} />,
    },
    {
      key: 'active',
      title: 'Status',
      dataIndex: 'active',
      render: renderTag,
      sorter: a => {
        return a.active ? 1 : -1
      },
    },
    {
      key: 'options',
      title: '',
      render: (value, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item>
                <EditTeamButton id={record.id} />
              </Menu.Item>
              <Menu.Item>
                {React.createElement(record.active ? RemoveTeamButton : RestoreTeamButton, {
                  team: record,
                  onTimesChange,
                })}
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link">
            <ToolOutlined />
          </Button>
        </Dropdown>
      ),
    },
    ...additionalColumns,
  ]

  return (
    <Table
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...tableProperties}
      size="small"
      loading={loading}
      columns={filterColumns(columns, filteredColumns)}
      dataSource={teams.map(u => ({ ...u, key: u.id }))}
    />
  )
}

TeamTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  teams: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    })
  ).isRequired,
  onTimesChange: PropTypes.func,
  filteredColumns: arrayOf(PropTypes.string),
  additionalColumns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.any,
    })
  ),
  tableProperties: PropTypes.shape(),
}

TeamTable.defaultProps = {
  onTimesChange: null,
  filteredColumns: [],
  additionalColumns: [],
  tableProperties: null,
}

export default TeamTable
