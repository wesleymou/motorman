import React from 'react'
import { Layout, Menu } from 'antd';
import { useHistory, Link } from 'react-router-dom'
import routes from '../routes';

const { Sider } = Layout;

function AppSider({ collapsed }) {

  const history = useHistory()

  const { pathname } = history.location

  const rootPath = pathname.lastIndexOf('/') > 0
    ? pathname.substring(0, pathname.substring(1).indexOf('/') + 1)
    : pathname

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark"
        selectedKeys={[rootPath]}>
        {routes.filter(route => route.menu).map((route) => (
          <Menu.Item
            key={route.path}>
            {route.icon}
            <Link to={route.path}>
              {route.title}
            </Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  )
}

export default AppSider
