import React, { Component } from 'react';
import { Layout, Menu, Icon  } from 'antd';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import './Home.css';
import SearchComponent from '../search/Search';
import SettingComponent from '../settings/Setting';
import NotFoundComponent from '../not-found/NotFound';

const { Header, Content, Footer } = Layout;

class HomeComponent extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <Layout className="layout" style={{ minHeight: '100vh' }}>
                <Header>
                    <div className="logo"><h1 style={{ fontWeight: 800 }}>LinkedIn</h1></div>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                        defaultSelectedKeys={['1']}
                    >   
                        <Menu.Item key="1">
                            <Link to="/home/search">
                                <Icon type="search" style={{ fontSize: 18 }} />
                            </Link> 
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/home/settings">
                                <Icon type="setting" style={{ fontSize: 18 }} />
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Header>

                <Content style={{ padding: '0 50px', height: '100%' }}>
                    <div style={{ background: '#fff', padding: 24, height: '100%' }}>
                        <Switch>
                            <Route exact path="/home" render={() => <Redirect to="/home/search" />}/>
                            <Route exact path="/home/search" component={SearchComponent} />
                            <Route exact path="/home/settings" component={SettingComponent} />
                            <Route component={NotFoundComponent} />
                        </Switch>
                    </div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>
                    LinkedIn ©2019 Created by zonetwyn
                </Footer>
            </Layout>
        )
    }
}

export default HomeComponent;