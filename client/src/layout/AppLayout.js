import React from 'react'

import { Layout } from 'antd'
import AppSider from './AppSider'
import AppHeader from './AppHeader'

const { Content } = Layout

class AppLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggleCollapse = () => this.setState({ collapsed: !this.state.collapsed })

  render() {
    return (
      <Layout style={{ height: '100vh', width: '100vw' }}>
        <AppSider collapsed={this.state.collapsed} />
        <Layout>
          <AppHeader collapsed={this.state.collapsed} onCollapseClick={this.toggleCollapse} />
          <Content style={{ padding: 20, height: '100%' }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default AppLayout
