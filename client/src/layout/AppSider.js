import React from 'react'
import PropTypes from 'prop-types'
import { Layout, Menu } from 'antd'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AuditOutlined, DashboardOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons'
import SubMenu from 'antd/lib/menu/SubMenu'

import logo from '../assets/images/logo.png'

const { Sider } = Layout

function AppSider({ theme, navigation }) {
  const { activeMenu, activeSubMenu } = navigation

  return (
    <Sider theme={theme} collapsible>
      <div className="logo" style={{ height: 60, padding: 8 }}>
        <img src={logo} alt="Logo" style={{ height: '100%' }} />
      </div>
      <Menu mode="inline" theme={theme} selectedKeys={[activeMenu, activeSubMenu]}>
        <Menu.Item key="/app">
          <DashboardOutlined />
          <Link to="/app">DashBoard</Link>
        </Menu.Item>
        <SubMenu
          key="admin"
          title={
            <span>
              <AuditOutlined />
              Administração
            </span>
          }
        >
          <Menu.Item key="/app/user">
            <UserOutlined />
            <Link to="/app/user">Usuários</Link>
          </Menu.Item>
          <Menu.Item key="/app/team">
            <TeamOutlined />
            <Link to="/app/team">Times</Link>
          </Menu.Item>
        </SubMenu>
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
}

const mapStateToProps = state => {
  return {
    theme: state.themes.theme,
    navigation: state.navigation,
  }
}

export default connect(mapStateToProps, null)(AppSider)
