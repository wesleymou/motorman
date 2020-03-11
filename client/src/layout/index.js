import React from 'react'

import { Layout } from 'antd';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import AppSider from './AppSider';

const { Header, Sider, Content } = Layout;

class AppLayout extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout>
        <AppSider collapsed={this.state.collapsed} />
        <Layout className="site-layout">
          <Header style={{ padding: '0 20px', backgroundColor: "white" }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              padding: 20,
              minHeight: 280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default AppLayout