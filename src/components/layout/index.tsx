import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import useLocation from react-router-dom
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TagsOutlined ,
  AppstoreAddOutlined,
  MailOutlined,
  BellOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Breadcrumb } from 'antd';
import AppRouter from '../router/index.tsx';
import "../../../src/assets/css/customStyles.css";
const { Header, Sider, Content } = Layout;

const LayoutComponent: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation(); // Get the current location object
  const currentPath = location.pathname;  // Extract the current pathname

  // Dynamically change breadcrumb text based on the current route
  const getBreadcrumbText = () => {
    if (currentPath === '/dashboard') {
      return 'Dashboard';
    } else if (currentPath === '/blogs') {
      return 'Blogs';
    } else if (currentPath.includes('/edit-blog')) {
      return 'Edit Blog';
    } else {
      return 'Home'; // Default breadcrumb item
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical centred">
          <h2>QDB</h2>
        </div>

        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ marginTop: '' }}
          items={[
            {
              key: '1',
              icon: <AppstoreAddOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,  // Link for navigation
            },
            {
              key: '2',
              icon: <TagsOutlined />,
              label: <Link to="/blogs">Blogs</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
            <div style={{ flex: 1, paddingLeft: 24 }}>
              <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">Home</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={currentPath}>{getBreadcrumbText()}</Link> {/* Dynamically change breadcrumb text */}
              </Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', paddingRight: 24 }}>
              <Button type="text" icon={<BellOutlined />} style={{ fontSize: '16px', position: 'relative' }} title="Notifications">
              <span className="count-icon">3</span>
              </Button>
              <Button type="text" icon={<MailOutlined />} style={{ fontSize: '16px', position: 'relative' }} title="Messages">
              <span className='count-icon'>5</span>
              </Button>
              <Button type="text" icon={<UserOutlined />} style={{ fontSize: '16px' }} title="Profile" />
            </div>
        </Header>
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <AppRouter />
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
