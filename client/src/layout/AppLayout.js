import React from 'react'
import PropTypes from 'prop-types'

import { Layout } from 'antd'
import AppSider from './AppSider'
import Navbar from './Navbar'

const { Content } = Layout

class AppLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  toggleCollapse = () => {
    this.setState(prevState => {
      return { collapsed: !prevState.collapsed }
    })
  }

  render() {
    const { collapsed } = this.state
    const { children } = this.props

    return (
      <Layout style={{ height: '100%' }}>
        <AppSider collapsed={collapsed} />
        <Layout>
          <Navbar collapsed={collapsed} onCollapseClick={this.toggleCollapse} />
          <Content style={{ padding: '0 20px', marginTop: 20, height: '100%', overflow: 'auto' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default AppLayout
