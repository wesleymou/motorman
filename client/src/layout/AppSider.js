import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { DashboardOutlined } from '@ant-design/icons'

import logo from '~/assets/images/logo.png'
import AdminMenu from './AdminMenu'
import TeamsMenu from './TeamsMenu'

const { Sider } = Layout

function AppSider({ currentUser, theme, navigation }) {
  const { activeMenu, activeSubMenu } = navigation

  return (
    <Sider theme={theme} collapsible>
      <div className="logo" style={{ height: 64, padding: 8 }}>
        <img src={logo} alt="Logo" style={{ height: '100%' }} />
      </div>
      <Menu mode="inline" theme={theme} selectedKeys={[activeMenu, activeSubMenu]}>
        <Menu.Item key="/app">
          <DashboardOutlined />
          <Link to="/app">DashBoard</Link>
        </Menu.Item>
        <TeamsMenu currentUser={currentUser} />
        <AdminMenu currentUser={currentUser} />
      </Menu>
    </Sider>
  )
}

AppSider.propTypes = {
  theme: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    activeMenu: PropTypes.string,
    activeSubMenu: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
}

const mapStateToProps = state => {
  return {
    theme: state.themes.theme,
    navigation: state.navigation,
    currentUser: state.auth.currentUser,
  }
}

export default connect(mapStateToProps, null)(AppSider)
