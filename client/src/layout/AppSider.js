import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import routes from '../routes'

const { Sider } = Layout

function AppSider({ theme }) {
  const history = useHistory()
  const { pathname } = history.location

  const rootPath =
    pathname.lastIndexOf('/app') > 0
      ? pathname.substring(0, pathname.substring(1).indexOf('/') + 1)
      : pathname

  return (
    <Sider theme={theme} collapsible>
      <div className="logo" />
      <Menu theme={theme} selectedKeys={[rootPath]} style={{ height: '100%' }}>
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
}

const mapStateToProps = state => {
  return {
    theme: state.themes.theme,
  }
}

export default connect(mapStateToProps, null)(AppSider)
