import React from 'react';
import './App.css';
import CategoryList from './components/CategoryList';
import ProductLists from './components/ProductsList';
import { Layout } from 'antd';
import Title from 'antd/lib/typography/Title';
import { Avatar } from 'antd'
import { Menu } from 'antd';
import Icon from '@ant-design/icons';
import { Breadcrumb, Alert } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;


const { Header, Footer, Sider, Content } = Layout;



function App() {
  return (
    <div className="container" style={{maxWidth:'100%', padding:0}}>
        {/* <ProductLists /> */}
        {/* <CategoryList/> */}

      <Layout>
      <Header style={{padding:10}}>
        <Avatar style={{float:'right'}} src='./user.png' />
        <Title style={{color:'white'}} level={3}>IntelviaStore</Title>
      </Header>
      <Layout>
      <Sider style={{background:'balck'}}>
      <Menu
      defaultSelectedKeys={['Dashboard']}
      mode="inline"
      >
        <Menu.Item key='Dashboard'>  
        Dashboard
        </Menu.Item>
        <SubMenu
        title={
          <span>
              <icon type="mail" />
              <span>About US</span>
          </span>
        }
        >
            <Menu.ItemGroup key='AboutUS' title='Country 1'>
                <Menu.Item key='location1'>Location 1</Menu.Item>
                <Menu.Item key='location2'>Location 2</Menu.Item>
            </Menu.ItemGroup>
        </SubMenu>
      </Menu>
      </Sider>
      <Layout>
       <Content style={{ padding: '0 50px' }}>
       <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#fff', padding: 24, minHeight: 693 }}>Content</div>
       </Content>
        <Footer style={{ textAlign: 'center'}}>IntelviaStore ©2021 Created By YouCode Students</Footer>
        </Layout>
      </Layout>
    </Layout>
    </div>
  );
}

export default App;
