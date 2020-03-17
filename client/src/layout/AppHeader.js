import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import { logout } from "../middlewares/auth";
import { useHistory } from "react-router-dom";

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined
} from "@ant-design/icons";

const { Header } = Layout;

const rightAlign = {
    style: {
        float: "right"
    }
};
const leftAlign = {
    style: {
        float: "left"
    }
};

function AppHeader({ collapsed, onCollapseClick }) {
    let history = useHistory();
    return (
        <Header style={{ padding: "20px 20px", backgroundColor: "white" }}>
            {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                    ...leftAlign,
                    className: "trigger",
                    onClick: onCollapseClick
                }
            )}
            <LogoutOutlined
                {...rightAlign}
                className="trigger"
                onClick={() => {
                    logout();
                    history.push("/login/");
                }}
            />
        </Header>
    );
}

AppHeader.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    onCollapseClick: PropTypes.func.isRequired
};

export default AppHeader;
