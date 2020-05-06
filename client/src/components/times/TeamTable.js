import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Tooltip, Dropdown, Menu, Button } from 'antd'

import Column from 'antd/lib/table/Column'
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

function TeamTable({ loading, teams, onTimesChange }) {
  return (
    <Table size="small" loading={loading} dataSource={teams.map(u => ({ ...u, key: u.id }))}>
      <Column title="" dataIndex="avatar" render={renderAvatar} />
      <Column
        title="Nome"
        dataIndex="name"
        render={(value, record) => <Link to={`/app/team/${record.id}`}>{record.name}</Link>}
      />
      <Column title="Membros ativos" render={record => record.members.length} />
      <Column
        title="Jogadores"
        render={record => record.members.filter(m => m.role.name === 'player').length}
      />
      <Column
        title="Data cadastro"
        dataIndex="created_at"
        render={value => <DateTimeMask value={value} />}
      />
      <Column title="Status" dataIndex="active" render={renderTag} />
      <Column
        title=""
        render={(value, record) => (
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
        )}
      />
    </Table>
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
}

TeamTable.defaultProps = {
  onTimesChange: null,
}

export default TeamTable
