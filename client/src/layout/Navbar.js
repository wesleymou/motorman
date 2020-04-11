import React from 'react'
import PropTypes from 'prop-types'

import { Layout, Button } from 'antd'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import UserDropdown from './UserDropdown'

const { Header } = Layout

function Navbar({ collapsed, onCollapseClick }) {
  return (
    <Header
      style={{
        display: 'flex',
        backgroundColor: 'white',
        padding: 0,
        position: 'relative',
        zIndex: 1,
        width: '100%',
      }}
    >
      <div>
        <Button
          type="link"
          icon={React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          onClick={onCollapseClick}
        />
      </div>
      <div className="ml-auto">
        <UserDropdown />
      </div>
    </Header>
  )
}

Navbar.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onCollapseClick: PropTypes.func.isRequired,
}

export default Navbar
