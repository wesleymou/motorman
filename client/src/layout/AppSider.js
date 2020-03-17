import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { isValid } from "../middlewares/auth";

import routes from '../routes'

const { Sider } = Layout

function AppSider({ theme, collapsed }) {
  const history = useHistory()

  const { pathname } = history.location

  const rootPath =
    pathname.lastIndexOf('/') > 0
      ? pathname.substring(0, pathname.substring(1).indexOf('/') + 1)
      : pathname

  return (
    <Sider theme={theme} trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme={theme} selectedKeys={[rootPath]}>
        {routes
          .filter(route => route.menu)
          .map(route => (
            isValid(route.permission) ?
            <Menu.Item key={route.path}>
              {route.icon}
              <Link to={route.path}>{route.title}</Link>
            </Menu.Item>
            :
            null
          ))}
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
