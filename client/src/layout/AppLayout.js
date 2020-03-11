import React from 'react'
import PropTypes from 'prop-types'

import { Layout } from 'antd'
import AppSider from './AppSider'
import AppHeader from './AppHeader'

const { Content } = Layout

class AppLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  toggleCollapse = () => this.setState(prevState => ({ collapsed: !prevState.collapsed }))

  render() {
    const { collapsed } = this.state
    const { children } = this.props

    return (
      <Layout style={{ height: '100vh', width: '100vw' }}>
        <AppSider collapsed={collapsed} />
        <Layout>
          <AppHeader collapsed={collapsed} onCollapseClick={this.toggleCollapse} />
          <Content style={{ padding: 20, height: '100%' }}>{children}</Content>
        </Layout>
      </Layout>
    )
  }
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout
