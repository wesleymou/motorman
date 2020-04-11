import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table, Tooltip, Dropdown, Menu, Button } from 'antd'

import Column from 'antd/lib/table/Column'
import { ToolOutlined } from '@ant-design/icons'
import TimeAvatar from './TimeAvatar'

import EditTimeButton from './EditTimeButton'
import RemoveTimeButton from './RemoveTimeButton'

const renderAvatar = (value, record) => (
  <Tooltip title="Ver detalhes">
    <Link to={`/app/times/${record.id}`}>
      <TimeAvatar time={record} />
    </Link>
  </Tooltip>
)

function TimesTable({ loading, times, onTimesChange }) {
  return (
    <Table size="small" loading={loading} dataSource={times.map(u => ({ ...u, key: u.id }))}>
      <Column title="" dataIndex="avatar" render={renderAvatar} />
      <Column title="Nome" dataIndex="name" render={(value, record) => <Link to={`/app/times/${record.id}`}>{record.name}</Link>}/>
      <Column title="Descrição" dataIndex="description" />
      <Column
        title=""
        render={(value, record) => (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item>
                  <EditTimeButton id={record.id} />
                </Menu.Item>
                <Menu.Item>
                  <RemoveTimeButton time={record} onTimesChange />
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

const timesProps = PropTypes.shape({
  id: PropTypes.number,
})

TimesTable.propTypes = {
  loading: PropTypes.bool.isRequired,
  times: PropTypes.arrayOf(timesProps).isRequired,
  onTimesChange: PropTypes.func,
}

TimesTable.defaultProps = {
  onTimesChange: null,
}

export default TimesTable
