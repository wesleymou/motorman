import React from 'react'
import PropTypes from 'prop-types'
import { Layout } from 'antd'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'

const { Header } = Layout

function AppHeader({ collapsed, onCollapseClick }) {
  return (
    <Header style={{ padding: '0 20px', backgroundColor: 'white' }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: onCollapseClick,
      })}
    </Header>
  )
}

AppHeader.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onCollapseClick: PropTypes.func.isRequired,
}

export default AppHeader
