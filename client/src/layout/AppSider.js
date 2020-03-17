import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import routes from '../routes'

const { Sider } = Layout

function AppSider({ theme, rootNavigationRoute }) {
  const selected = rootNavigationRoute

  return (
    <Sider theme={theme} collapsible>
      <div className="logo" />
      <Menu theme={theme} selectedKeys={[selected]} style={{ height: '100%' }}>
        {routes
          .filter(route => route.menu)
          .map(route => (
            <Menu.Item key={route.path}>
              {route.icon}
              <Link to={route.path}>{route.title}</Link>
            </Menu.Item>
          ))}
      </Menu>
    </Sider>
  )
}

AppSider.propTypes = {
  theme: PropTypes.string.isRequired,
  rootNavigationRoute: PropTypes.string.isRequired,
}

const mapStateToProps = state => {
  return {
    theme: state.themes.theme,
    rootNavigationRoute: state.navigation.rootNavigationRoute,
  }
}

export default connect(mapStateToProps, null)(AppSider)
