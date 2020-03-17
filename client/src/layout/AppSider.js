import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'

import routes from '../routes'
import { logout, isValid } from '../services/auth'

const { Sider } = Layout

function AppSider({ theme, collapsed }) {
  const history = useHistory()

  const handleLogout = () => {
    logout()
    history.push('/')
  }

  const { pathname } = history.location

  const rootPath =
    pathname.lastIndexOf('/app') > 0
      ? pathname.substring(0, pathname.substring(1).indexOf('/') + 1)
      : pathname

  return (
    <Sider theme={theme} trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme={theme} selectedKeys={[rootPath]} style={{ height: '100%' }}>
        {routes
          .filter(route => route.menu)
          .map(route =>
            isValid(route.permission) ? (
              <Menu.Item key={route.path}>
                {route.icon}
                <Link to={route.path}>{route.title}</Link>
              </Menu.Item>
            ) : null
          )}

        <Menu.Item onClick={handleLogout} style={{ position: 'fixed', left: 0, bottom: 0 }}>
          <LogoutOutlined />
          Sair
        </Menu.Item>
      </Menu>
    </Sider>
  )
}

AppSider.propTypes = {
  theme: PropTypes.string.isRequired,
  collapsed: PropTypes.bool.isRequired,
}

const mapStateToProps = state => {
  return {
    theme: state.themes.theme,
  }
}

export default connect(mapStateToProps, null)(AppSider)
