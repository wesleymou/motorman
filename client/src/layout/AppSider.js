import React from "react";
import PropTypes from "prop-types";
import { Layout, Menu } from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  AuditOutlined,
  DashboardOutlined,
  UserOutlined
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";
import Routes from "../routes";

import { getPayload } from "../services/auth";

import logo from "../assets/images/logo.png";

const { Sider } = Layout;

const FunctionInTeam = getPayload().data.user.functionInTeam;

function AppSider({ theme, activeMenu, activeSubMenu }) {
  return (
    <Sider theme={theme} collapsible>
      <div className="logo" style={{ height: 60, padding: 8 }}>
        <img src={logo} alt="Logo" style={{ height: "100%" }} />
      </div>
      <Menu
        mode="inline"
        theme={theme}
        selectedKeys={[activeMenu, activeSubMenu]}
      >
        <Menu.Item key="/app">
          <DashboardOutlined />
          <Link to="/app">DashBoard</Link>
        </Menu.Item>

        {FunctionInTeam.map((functionInTeam, i) => {
          return (
            <SubMenu
              key='admin'
              title={
                <span>
                  <AuditOutlined />
                  {functionInTeam.name}
                </span>
              }
            >
              {console.log(functionInTeam)}
              {Routes.map(route => {
                return (
                  route.menu && route.permission.some(p => functionInTeam.permission.some(pp => pp.name === p)) ?
                    <Menu.Item key="/app/user">
                      <UserOutlined />
                      <Link to="/app/user">Usuários</Link>
                    </Menu.Item>
                    :
                    null
                )
              })}
            </SubMenu>
          )
        })}
      </Menu>
    </Sider>
  );
}

AppSider.propTypes = {
  theme: PropTypes.string.isRequired,
  activeMenu: PropTypes.string,
  activeSubMenu: PropTypes.string
};

AppSider.defaultProps = {
  activeMenu: "",
  activeSubMenu: ""
};

const mapStateToProps = state => {
  return {
    theme: state.themes.theme,
    activeMenu: state.navigation.activeMenu,
    activeSubMenu: state.navigation.activeSubMenu
  };
};

export default connect(mapStateToProps, null)(AppSider);
